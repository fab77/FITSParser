// import { FITSHeader } from "./model/FITSHeader.js"
import * as fs from 'fs';
export class FITSWriter {
    static createFITS(fitsParsed) {
        const headerBytes = this.createHeader(fitsParsed.header);
        const dataBytes = this.createData(fitsParsed.data, fitsParsed.header);
        const fitsFile = new Uint8Array(headerBytes.length + dataBytes.length);
        fitsFile.set(headerBytes, 0);
        fitsFile.set(dataBytes, headerBytes.length);
        return fitsFile;
    }
    static createHeader(header) {
        const BLOCK = 2880;
        const CARD = 80;
        const MUST_INT = new Set(["BITPIX", "NAXIS", "PCOUNT", "GCOUNT"]);
        const IS_LOGICAL = new Set(["SIMPLE", "EXTEND"]);
        const items = header.getItems();
        function kw(s) {
            return (s ?? "").toUpperCase().padEnd(8, " ").slice(0, 8);
        }
        function card80(s) {
            return s.length >= CARD ? s.slice(0, CARD) : s.padEnd(CARD, " ");
        }
        // Emit COMMENT/HISTORY as multiple 72-char lines
        function makeCommentCards(kind, text) {
            const prefix = kw(kind); // "COMMENT " or "HISTORY "
            const width = CARD - prefix.length; // 72
            const t = (text ?? "").toString();
            if (!t.length)
                return [card80(prefix)]; // allow empty COMMENT/HISTORY line
            const out = [];
            for (let i = 0; i < t.length; i += width) {
                out.push(card80(prefix + t.slice(i, i + width)));
            }
            return out;
        }
        function quoteFitsString(s) {
            const unquoted = s.replace(/^'+|'+$/g, "");
            const escaped = unquoted.replace(/'/g, "''");
            return `'${escaped}'`;
        }
        // "= " + 20-char value field (or proper string)
        function valueField20(key, val) {
            let v = "";
            const K = key.toUpperCase();
            if (IS_LOGICAL.has(K)) {
                const tf = (val === true || val === "T" || val === "t") ? "T" : "F";
                return `= ${tf.padStart(20, " ")}`;
            }
            if (MUST_INT.has(K) || /^NAXIS\d+$/.test(K)) {
                const n = Number(val);
                if (!Number.isFinite(n) || !Number.isInteger(n)) {
                    throw new Error(`FITS header: ${K} must be an integer, got ${val}`);
                }
                return `= ${String(n).padStart(20, " ")}`;
            }
            if (typeof val === "number") {
                let s = Number.isInteger(val) ? String(val) : val.toExponential(10).replace("e", "E");
                if (s.length > 20)
                    s = val.toExponential(8).replace("e", "E");
                return `= ${s.padStart(20, " ")}`;
            }
            if (typeof val === "string") {
                return `= ${quoteFitsString(val)}`; // strings can exceed 20-char field
            }
            return "";
        }
        // Build one keyword card, and (if needed) emit overflow as COMMENT cards
        function makeKeywordWithComment(key, value, comment) {
            const K = key.toUpperCase();
            if (K === "END")
                return [card80("END")];
            if (K === "COMMENT" || K === "HISTORY") {
                const text = (value ?? comment ?? "").toString();
                return makeCommentCards(K, text);
            }
            // Normal keyword
            let base = kw(K) + valueField20(K, value);
            // Attach trailing comment inside the same card if it fits
            if (comment && comment.length > 0) {
                const add = ` / ${comment}`;
                const spaceLeft = CARD - base.length;
                if (spaceLeft > 0) {
                    const inCard = add.slice(0, spaceLeft);
                    base = (base + inCard);
                    // spill any overflow into COMMENT cards (strip a leading " / " if it didn't fit)
                    const overflow = add.slice(spaceLeft).replace(/^\s*\/\s*/, "");
                    if (overflow.length > 0) {
                        return [card80(base), ...makeCommentCards("COMMENT", overflow)];
                    }
                }
                else {
                    // no room at all; put the whole comment in COMMENT lines
                    return [card80(base), ...makeCommentCards("COMMENT", comment)];
                }
            }
            return [card80(base)];
        }
        // Build all cards with mandatory order first
        const map = new Map(items.map(it => [it.key.toUpperCase(), it]));
        const cards = [];
        const simple = map.get("SIMPLE");
        if (!simple)
            throw new Error("Missing mandatory SIMPLE card");
        cards.push(...makeKeywordWithComment("SIMPLE", simple.value, simple.comment));
        const bitpix = map.get("BITPIX");
        if (!bitpix)
            throw new Error("Missing mandatory BITPIX card");
        cards.push(...makeKeywordWithComment("BITPIX", bitpix.value, bitpix.comment));
        const naxis = map.get("NAXIS");
        if (!naxis)
            throw new Error("Missing mandatory NAXIS card");
        const nAxes = Number(naxis.value) || 0;
        cards.push(...makeKeywordWithComment("NAXIS", nAxes, naxis.comment));
        for (let i = 1; i <= nAxes; i++) {
            const ki = `NAXIS${i}`;
            const it = map.get(ki);
            if (!it)
                throw new Error(`Missing mandatory ${ki} card`);
            cards.push(...makeKeywordWithComment(ki, it.value, it.comment));
        }
        const extend = map.get("EXTEND");
        if (extend)
            cards.push(...makeKeywordWithComment("EXTEND", extend.value, extend.comment));
        for (const it of items) {
            const K = it.key.toUpperCase();
            if (K === "SIMPLE" || K === "BITPIX" || K === "NAXIS" || /^NAXIS\d+$/.test(K) || K === "EXTEND" || K === "END")
                continue;
            cards.push(...makeKeywordWithComment(it.key, it.value, it.comment));
        }
        // END + pad to 2880
        cards.push(card80("END"));
        let headerString = cards.join("");
        const pad = headerString.length % BLOCK ? BLOCK - (headerString.length % BLOCK) : 0;
        if (pad)
            headerString += " ".repeat(pad);
        return new TextEncoder().encode(headerString);
    }
    static createData(data, header) {
        // concat
        const totalLength = data.reduce((s, c) => s + c.length, 0);
        // OPTIONAL: verify size from BITPIX/NAXIS
        const bitpix = Math.abs(Number(header.findById("BITPIX")?.value ?? 0));
        const naxis = Number(header.findById("NAXIS")?.value ?? 0);
        let elems = 1;
        for (let k = 1; k <= naxis; k++) {
            elems *= Number(header.findById(`NAXIS${k}`)?.value ?? 0);
        }
        const bytesPerElem = bitpix / 8;
        const expectedUnpadded = naxis > 0 ? elems * bytesPerElem : 0;
        if (expectedUnpadded && expectedUnpadded !== totalLength) {
            throw new Error(`Data length ${totalLength} does not match header expectation ${expectedUnpadded} (BITPIX=${bitpix}, NAXIS=${naxis})`);
        }
        // build and pad
        let dataBytes = new Uint8Array(totalLength);
        let off = 0;
        for (const chunk of data) {
            dataBytes.set(chunk, off);
            off += chunk.length;
        }
        const BLOCK = 2880;
        const remainder = dataBytes.length % BLOCK;
        if (remainder) {
            const pad = BLOCK - remainder;
            const padded = new Uint8Array(dataBytes.length + pad);
            padded.set(dataBytes);
            dataBytes = padded; // zeros already in new space
        }
        return dataBytes;
    }
    static typedArrayToURL(fitsParsed) {
        const fitsFile = this.createFITS(fitsParsed);
        const blob = new Blob([fitsFile], { type: "application/fits" });
        // console.log(`<html><body><img src='${URL.createObjectURL(b)}'</body></html>`);
        const url = URL.createObjectURL(blob);
        console.log(`Generated FITS file URL: ${url}`);
        const revokeTimeout_sec = 10;
        setTimeout(() => url, revokeTimeout_sec * 1000);
        console.log(`Generated FITS will be available for ${revokeTimeout_sec} seconds: ${url}`);
        return url;
    }
    static writeFITSFile(fitsParsed, filePath) {
        const fitsFile = this.createFITS(fitsParsed);
        try {
            fs.writeFileSync(filePath, fitsFile);
            console.log(`FITS file written successfully to: ${filePath}`);
        }
        catch (error) {
            console.error(`Error writing FITS file: ${error}`);
        }
    }
}
// const fitsParsed: FITSParsed = {
//   header: new FITSHeader(),
//   data: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]
// };
// // Specify the file path
// const filePath = "/Users/fabriziogiordano/Desktop/PhD/code/new/FITSParser/output.fits";
// // Write the FITS file to the filesystem
// FITSWriter.writeFITSFile(fitsParsed, filePath);
//# sourceMappingURL=FITSWriter.js.map