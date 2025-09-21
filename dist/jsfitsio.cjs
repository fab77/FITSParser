/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 611:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 692:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 876:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 203:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 16:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 106:
/***/ ((module) => {

module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".jsfitsio.cjs";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			792: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  FITSHeaderItem: () => (/* reexport */ FITSHeaderItem),
  FITSHeaderManager: () => (/* reexport */ FITSHeaderManager),
  FITSParser: () => (/* reexport */ FITSParser),
  FITSWriter: () => (/* reexport */ FITSWriter),
  ParseHeader: () => (/* reexport */ ParseHeader),
  ParsePayload: () => (/* reexport */ ParsePayload),
  ParseUtils: () => (/* reexport */ ParseUtils)
});

;// CONCATENATED MODULE: ./src/model/FITSHeaderItem.ts
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
class FITSHeaderItem {
    _key = "";
    _value = "";
    _comment = "";
    constructor(key, value, comment) {
        this._key = key;
        this._value = value;
        this._comment = comment;
    }
    get key() {
        return this._key;
    }
    get comment() {
        return this._comment;
    }
    get value() {
        return this._value;
    }
}

;// CONCATENATED MODULE: ./src/model/FITSHeaderManager.ts

class FITSHeaderManager {
    static SIMPLE = "SIMPLE";
    static BITPIX = "BITPIX";
    static BZERO = "BZERO";
    static BSCALE = "BSCALE";
    static BLANK = "BLANK";
    static NAXIS = "NAXIS";
    static NAXIS1 = "NAXIS1";
    static NAXIS2 = "NAXIS2";
    static DATAMIN = "DATAMIN";
    static DATAMAX = "DATAMAX";
    static CRVAL1 = "CRVAL1";
    static CRVAL2 = "CRVAL2";
    static CTYPE1 = "CTYPE1";
    static CTYPE2 = "CTYPE2";
    static CRPIX1 = "CRPIX1";
    static CRPIX2 = "CRPIX2";
    static ORIGIN = "ORIGIN";
    static COMMENT = "COMMENT";
    items = [];
    constructor() {
        this.items[0] = new FITSHeaderItem(FITSHeaderManager.SIMPLE, 'T', '');
        this.items[1] = new FITSHeaderItem(FITSHeaderManager.BITPIX, '', '');
        this.items[2] = new FITSHeaderItem(FITSHeaderManager.NAXIS, 2, '');
        this.items[3] = new FITSHeaderItem(FITSHeaderManager.NAXIS1, '', '');
        this.items[4] = new FITSHeaderItem(FITSHeaderManager.NAXIS2, '', '');
    }
    // insert(item: FITSHeaderItem, position?: number): void {
    insert(item) {
        if (item.key === FITSHeaderManager.SIMPLE) {
            // this.items.splice(0, 0, item);
            this.items[0] = item;
        }
        else if (item.key === FITSHeaderManager.BITPIX) {
            // this.items.splice(1, 0, item);
            this.items[1] = item;
        }
        else if (item.key === FITSHeaderManager.NAXIS) {
            // this.items.splice(2, 0, item);
            this.items[2] = item;
        }
        else if (item.key === FITSHeaderManager.NAXIS1) {
            // this.items.splice(3, 0, item);
            this.items[3] = item;
        }
        else if (item.key === FITSHeaderManager.NAXIS2) {
            // this.items.splice(4, 0, item);
            this.items[4] = item;
        }
        else {
            this.items.push(item);
        }
        // if (position !== undefined && position >= 0 && position <= this.items.length) {
        //     this.items.splice(position, 0, item);
        // } else {
        //     this.items.push(item);
        // }
    }
    getItems() {
        return this.items;
    }
    remove(key) {
        this.items = this.items.filter(item => item.key !== key);
    }
    findById(key) {
        const item = this.items.find(item => item.key === key);
        if (!item) {
            return null;
        }
        return item;
    }
}

;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
;// CONCATENATED MODULE: ./src/FITSWriter.ts
// import { FITSHeader } from "./model/FITSHeader.js"

class FITSWriter {
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
            external_fs_namespaceObject.writeFileSync(filePath, fitsFile);
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

;// CONCATENATED MODULE: ./src/ParseHeader.ts
// import { FITSHeader } from "./model/FITSHeader.js";


/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
class ParseHeader {
    static getFITSItemValue(header, key) {
        const item = header.findById(key);
        let VALUE = null;
        if (item) {
            VALUE = Number(item.value);
        }
        return VALUE;
    }
    static parse(rawdata) {
        // only one header block (2880) allowed atm.
        // TODO handle multiple header blocks
        // let headerByteData = new Uint8Array(rawdata, 0, 2880);
        const textDecoder = new TextDecoder('ascii');
        const headerSize = 2880; // FITS headers are in 2880-byte blocks
        const headerText = textDecoder.decode(rawdata.slice(0, headerSize));
        const header = new FITSHeaderManager();
        const lines = headerText.match(/.{1,80}/g) || [];
        for (const line of lines) {
            const key = line.slice(0, 8).trim();
            let value;
            let comment = "";
            if (key && key !== 'END') {
                const rawValue = line.slice(10).trim().split('/')[0].trim();
                if (isNaN(Number(rawValue))) {
                    value = rawValue;
                }
                else {
                    value = Number(rawValue);
                }
                if (line.includes('/')) {
                    comment = line.slice(10).trim().split('/')[1].trim();
                }
                const item = new FITSHeaderItem(key, value, comment);
                header.insert(item);
            }
        }
        return header;
    }
}

;// CONCATENATED MODULE: ./src/ParseUtils.ts
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
class ParseUtils {
    static getStringAt(data, offset, length) {
        const chars = [];
        for (let i = offset, j = 0; i < offset + length; i++, j++) {
            chars[j] = String.fromCharCode(data.charCodeAt(i) & 0xff);
        }
        return chars.join("");
    }
    static byteString(n) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return ("000000000" + n.toString(2)).substr(-8);
    }
    static parse32bitSinglePrecisionFloatingPoint(byte1, byte2, byte3, byte4) {
        let long = (((((byte1 << 8) + byte2) << 8) + byte3) << 8) + byte4;
        if (long < 0)
            long += 4294967296;
        const float = (1.0 + (long & 0x007fffff) / 0x0800000) *
            Math.pow(2, ((long & 0x7f800000) >> 23) - 127);
        return float;
    }
    static convertBlankToBytes(blank, nbytes) {
        let str = Math.abs(blank).toString(2);
        while (str.length / 8 < nbytes) {
            str += "0";
        }
        const buffer = new ArrayBuffer(nbytes);
        const uint8 = new Uint8Array(buffer);
        for (let i = 0; i < nbytes; i++) {
            uint8[i] = parseInt(str.substr(8 * i, 8 * (i + 1)), 2);
        }
        return uint8;
    }
    /** https://gist.github.com/Manouchehri/f4b41c8272db2d6423fa987e844dd9ac */
    static parseFloatingPointFormat(bytes, ebits, fbits) {
        // Bytes to bits
        const bits = [];
        for (let i = bytes.length; i; i -= 1) {
            let byte = bytes[i - 1];
            for (let j = 8; j; j -= 1) {
                bits.push(byte % 2 ? 1 : 0);
                byte = byte >> 1;
            }
        }
        bits.reverse();
        const str = bits.join("");
        // Unpack sign, exponent, fraction
        const bias = (1 << (ebits - 1)) - 1;
        const s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
        const e = parseInt(str.substring(1, 1 + ebits), 2);
        const f = parseInt(str.substring(1 + ebits), 2);
        // Produce number
        if (e === (1 << ebits) - 1) {
            return f !== 0 ? null : s * Infinity;
        }
        else if (e > 0) {
            return s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
        }
        else if (f !== 0) {
            return s * Math.pow(2, -(bias - 1)) * (f / Math.pow(2, fbits));
        }
        else {
            return s * 0;
        }
    }
    static generate16bit2sComplement(val) {
        throw new TypeError("not implemented yet" + val);
    }
    static parse16bit2sComplement(byte1, byte2) {
        const unsigned = (byte1 << 8) | byte2;
        if (unsigned & 0x8000) {
            return unsigned | 0xffff0000;
        }
        else {
            return unsigned;
        }
    }
    static parse32bit2sComplement(byte1, byte2, byte3, byte4) {
        const unsigned = (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
        const s = (unsigned & 0x80000000) >> 31;
        let res = unsigned & 0xffffffff;
        if (s) {
            res = (~unsigned & 0xffffffff) + 1;
            return -1 * res;
        }
        return res;
    }
    /**
     *
     * @param {*} data string?
     * @param {*} offset offset in the data
     * @returns returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.
     */
    static getByteAt(data, offset) {
        const dataOffset = 0;
        return data.charCodeAt(offset + dataOffset) & 0xff;
    }
    static extractPixelValue(offset, bytes, bitpix) {
        let px_val = null; // pixel value
        // let px_val1, px_val2, px_val3, px_val4;
        if (bitpix == 8) {
            px_val = bytes[0];
        }
        else if (bitpix == 16) {
            // 16-bit 2's complement binary integer
            px_val = ParseUtils.parse16bit2sComplement(bytes[offset], bytes[offset + 1]);
        }
        else if (bitpix == 32) {
            // IEEE 754 half precision (float16) ??
            px_val = ParseUtils.parse32bit2sComplement(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
        }
        else if (bitpix == -32) {
            // 32-bit IEEE single-precision floating point
            // px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]);
            px_val = ParseUtils.parseFloatingPointFormat(bytes.slice(offset, offset + 8), 8, 23);
        }
        else if (bitpix == 64) {
            // 64-bit 2's complement binary integer
            throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
        }
        else if (bitpix == -64) {
            // 64-bit IEEE double-precision floating point
            //https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
            px_val = ParseUtils.parseFloatingPointFormat(bytes.slice(offset, offset + 8), 11, 52);
        }
        return px_val;
    }
}
// export default ParseUtils;

;// CONCATENATED MODULE: ./src/ParsePayload.ts
// "use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
// import { FITSHeader } from "./model/FITSHeader.js";




class ParsePayload {
    static computePhysicalMinAndMax(header, rawData) {
        const BITPIX = ParseHeader.getFITSItemValue(header, FITSHeaderManager.BITPIX);
        if (BITPIX === null) {
            return null;
        }
        const NAXIS1 = ParseHeader.getFITSItemValue(header, FITSHeaderManager.NAXIS1);
        if (NAXIS1 === null) {
            return null;
        }
        const NAXIS2 = ParseHeader.getFITSItemValue(header, FITSHeaderManager.NAXIS2);
        if (NAXIS2 === null) {
            return null;
        }
        const DATAMIN = ParseHeader.getFITSItemValue(header, FITSHeaderManager.DATAMIN);
        const DATAMAX = ParseHeader.getFITSItemValue(header, FITSHeaderManager.DATAMAX);
        if (!BITPIX || !NAXIS1 || !NAXIS2) {
            return null; // return early if invalid data.
        }
        if (!DATAMAX || !DATAMIN) {
            const [min, max] = ParsePayload.computePhysicalValues(rawData, header);
            if (min && max) {
                const maxitem = new FITSHeaderItem("DATAMAX", min, "computed by jsfitsio");
                const minitem = new FITSHeaderItem("DATAMIN", max, "computed by jsfitsio");
                header.insert(maxitem);
                header.insert(minitem);
            }
        }
        const endItem = new FITSHeaderItem('END', "", "");
        header.insert(endItem);
        return header;
        // TODO: END tag shall be added here
    }
    static computePhysicalValues(rawData, header) {
        const BITPIX = ParseHeader.getFITSItemValue(header, FITSHeaderManager.BITPIX);
        if (BITPIX === null || isNaN(BITPIX)) {
            return [null, null];
        }
        const BLANK = ParseHeader.getFITSItemValue(header, FITSHeaderManager.BLANK);
        if (BLANK === null || isNaN(BITPIX)) {
            return [null, null];
        }
        let BZERO = ParseHeader.getFITSItemValue(header, FITSHeaderManager.BZERO);
        if (BZERO === null) {
            BZERO = 0;
        }
        let BSCALE = ParseHeader.getFITSItemValue(header, FITSHeaderManager.BSCALE);
        if (BSCALE === null) {
            BSCALE = 1;
        }
        let i = 0;
        const bytesXelem = Math.abs(BITPIX / 8);
        const pxLength = rawData.byteLength / bytesXelem;
        let min = null;
        let max = null;
        let physicalblank = null;
        if (BLANK) {
            physicalblank = ParsePayload.pixel2physicalValue(BLANK, BSCALE, BZERO);
        }
        while (i < pxLength) {
            let px_val = ParsePayload.extractPixelValue(rawData, bytesXelem * i, BITPIX);
            if (px_val === null) {
                i++;
                continue;
            }
            let ph_val = ParsePayload.pixel2physicalValue(px_val, BSCALE, BZERO);
            if (!min) {
                min = ph_val;
            }
            if (!max) {
                max = ph_val;
            }
            // check this block if it is still applicable
            if (physicalblank === null || physicalblank !== ph_val) {
                if (ph_val !== null && (ph_val < min || min === null)) {
                    min = ph_val;
                }
                if (ph_val !== null && (ph_val > max || max === null)) {
                    max = ph_val;
                }
            }
            i++;
        }
        return [min, max];
    }
    static pixel2physicalValue(pxval, BSCALE, BZERO) {
        if (BZERO === null || BSCALE === null) {
            throw new Error("Either BZERO or BSCALE is null");
        }
        return BZERO + BSCALE * pxval;
    }
    static extractPixelValue(rawData, offset, BITPIX) {
        let px_val = null; // pixel value
        if (BITPIX == 16) {
            // 16-bit 2's complement binary integer
            px_val = ParseUtils.parse16bit2sComplement(rawData[offset], rawData[offset + 1]);
        }
        else if (BITPIX == 32) {
            // IEEE 754 half precision (float16) ??
            px_val = ParseUtils.parse32bit2sComplement(rawData[offset], rawData[offset + 1], rawData[offset + 2], rawData[offset + 3]);
        }
        else if (BITPIX == -32) {
            // 32-bit IEEE single-precision floating point
            // px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]);
            px_val = ParseUtils.parseFloatingPointFormat(rawData.slice(offset, offset + 4), 8, 23);
        }
        else if (BITPIX == 64) {
            // 64-bit 2's complement binary integer
            throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
        }
        else if (BITPIX == -64) {
            // 64-bit IEEE double-precision floating point
            //https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
            px_val = ParseUtils.parseFloatingPointFormat(rawData.slice(offset, offset + 8), 11, 52);
        }
        return px_val;
    }
}

;// CONCATENATED MODULE: ./src/FITSParser.ts




class FITSParser {
    static async loadFITS(url) {
        const uint8data = await FITSParser.getFile(url);
        if (uint8data?.byteLength) {
            const fits = FITSParser.processFits(uint8data);
            return fits;
        }
        return null;
    }
    static processFits(rawdata) {
        const header = ParseHeader.parse(rawdata);
        const headerFinalised = ParsePayload.computePhysicalMinAndMax(header, rawdata);
        if (headerFinalised == null) {
            return null;
        }
        const dataOffset = 2880; // Assuming no additional header blocks
        const payloadBuffer = new Uint8Array(rawdata.slice(dataOffset));
        const payloadMatrix = FITSParser.createMatrix(payloadBuffer, header);
        return {
            header: headerFinalised,
            data: payloadMatrix
        };
    }
    static createMatrix(payload, header) {
        const NAXIS1 = ParseHeader.getFITSItemValue(header, FITSHeaderManager.NAXIS1);
        if (NAXIS1 === null) {
            throw new Error("NAXIS1 not defined.");
        }
        const NAXIS2 = ParseHeader.getFITSItemValue(header, FITSHeaderManager.NAXIS2);
        if (NAXIS2 === null) {
            throw new Error("NAXIS2 not defined.");
        }
        const BITPIX = ParseHeader.getFITSItemValue(header, FITSHeaderManager.BITPIX);
        if (BITPIX === null) {
            throw new Error("BITPIX not defined.");
        }
        const bytesXelem = Math.abs(BITPIX / 8);
        if (payload.length !== NAXIS1 * NAXIS2 * bytesXelem) {
            throw new Error("Payload size does not match the expected matrix dimensions.");
        }
        // const matrix: Array<Uint8Array> = [];
        const matrix = [];
        for (let i = 0; i < NAXIS2; i++) {
            matrix.push(payload.slice(i * NAXIS1 * bytesXelem, (i + 1) * NAXIS1 * bytesXelem));
        }
        return matrix;
    }
    static generateFITSForWeb(fitsParsed) {
        return FITSWriter.typedArrayToURL(fitsParsed);
    }
    static saveFITSLocally(fitsParsed, path) {
        return FITSWriter.writeFITSFile(fitsParsed, path);
    }
    static async getFile(uri) {
        if (!uri.substring(0, 5).toLowerCase().includes("http")) {
            const p = await __webpack_require__.e(/* import() */ 483).then(__webpack_require__.bind(__webpack_require__, 483));
            const rawData = await p.getLocalFile(uri);
            if (rawData?.length) {
                const uint8 = new Uint8Array(rawData);
                return uint8;
            }
            return new Uint8Array(0);
        }
        else {
            const p = await __webpack_require__.e(/* import() */ 646).then(__webpack_require__.bind(__webpack_require__, 646));
            const rawData = await p.getFile(uri);
            if (rawData?.byteLength) {
                const uint8 = new Uint8Array(rawData);
                return uint8;
            }
            return new Uint8Array(0);
        }
    }
}
// const url = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits"
// FITSParser.loadFITS(url).then((fits) => {
//   if (fits == null) {
//     return null
//   }
//   const path = "./fitsTest1.fits"
//   console.log(fits.header)
//   FITSParser.saveFITSLocally(fits, path)
//   console.log("finished")
// })
// // const file = "/Users/fabriziogiordano/Desktop/PhD/code/new/FITSParser/tests/inputs/empty.fits"
// const file = "/Users/fabriziogiordano/Desktop/PhD/code/new/FITSParser/tests/inputs/Npix43348.fits"
// FITSParser.loadFITS(file).then((fits) => {
//   if (fits == null) {
//     return null
//   }
//   const path = "./fitsTest2.fits"
//   console.log(fits.header)
//   FITSParser.saveFITSLocally(fits, path)
//   console.log("finished")
// })

;// CONCATENATED MODULE: ./src/index.ts








})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=jsfitsio.cjs.map