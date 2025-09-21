import { FITSWriter } from "./FITSWriter.js";
import { ParsePayload } from "./ParsePayload.js";
import { ParseHeader } from "./ParseHeader.js";
import { FITSHeaderManager } from "./model/FITSHeaderManager.js";
export class FITSParser {
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
            const p = await import('./getLocalFile.js');
            const rawData = await p.getLocalFile(uri);
            if (rawData?.length) {
                const uint8 = new Uint8Array(rawData);
                return uint8;
            }
            return new Uint8Array(0);
        }
        else {
            const p = await import('./getFile.js');
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
//# sourceMappingURL=FITSParser.js.map