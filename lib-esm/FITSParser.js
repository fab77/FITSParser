var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FITSWriter } from "./FITSWriter.js";
import { ParsePayload } from "./ParsePayload.js";
import { ParseHeader } from "./ParseHeader.js";
import { FITSHeaderManager } from "./model/FITSHeaderManager.js";
export class FITSParser {
    static loadFITS(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const uint8data = yield FITSParser.getFile(url);
            if (uint8data === null || uint8data === void 0 ? void 0 : uint8data.byteLength) {
                const fits = FITSParser.processFits(uint8data);
                return fits;
            }
            return null;
        });
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
    static getFile(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri.substring(0, 5).toLowerCase().includes("http")) {
                const p = yield import('./getLocalFile.js');
                const rawData = yield p.getLocalFile(uri);
                if (rawData === null || rawData === void 0 ? void 0 : rawData.length) {
                    const uint8 = new Uint8Array(rawData);
                    return uint8;
                }
                return new Uint8Array(0);
            }
            else {
                const p = yield import('./getFile.js');
                const rawData = yield p.getFile(uri);
                if (rawData === null || rawData === void 0 ? void 0 : rawData.byteLength) {
                    const uint8 = new Uint8Array(rawData);
                    return uint8;
                }
                return new Uint8Array(0);
            }
        });
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