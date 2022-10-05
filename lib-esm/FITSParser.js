/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
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
import fetch from 'cross-fetch';
// import { readFile } from "node:fs/promises";
// import fetch from "node-fetch";
export class FITSParser {
    constructor(url) {
        this._url = url;
    }
    loadFITS() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getFile(this._url)
                .then((rawdata) => {
                if (rawdata !== null) {
                    const uint8 = new Uint8Array(rawdata);
                    const fits = this.processFits(uint8);
                    return fits;
                }
                return null;
            })
                .catch((error) => {
                var _a, _b;
                if ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
                    throw new Error("[FITSParser->loadFITS] " + error.response.data.message);
                }
                throw error;
            });
        });
    }
    processFits(rawdata) {
        const header = ParseHeader.parse(rawdata);
        const payloadParser = new ParsePayload(header, rawdata);
        const pixelvalues = payloadParser.parse();
        // if (rawdata.length > (header.getNumRows() + (pixelvalues.length * pixelvalues[0].length))) {
        // let leftover = rawdata.length - (header.getNumRows() + (pixelvalues.length * pixelvalues[0].length));
        // 	throw new Error("[FITSParser->processFits] It seems that there's at least one more HDU since there are " + leftover + " bytes not processed.");
        // 	console.warn("It seems that there's at least one more HDU since there are " + leftover + " bytes not processed.")
        // }
        return {
            header: header,
            data: pixelvalues,
        };
    }
    // static writeFITS(header: FITSHeader, rawdata: Uint8Array[], fileuri: string) {
    //   const writer = new FITSWriter();
    //   writer.run(header, rawdata);
    //   writer.writeFITS(fileuri);
    // }
    static generateFITS(header, rawdata) {
        const writer = new FITSWriter();
        writer.run(header, rawdata);
        return writer.typedArrayToURL();
    }
    getFile(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (!uri.substring(0, 5).toLowerCase().includes("http")) {
            //   const promise = await fs.readFile(uri);
            //   return promise;
            // } else {
            const response = yield fetch(uri);
            if (!response.ok) {
                return new ArrayBuffer(0);
            }
            else {
                return response.arrayBuffer();
            }
            // }
        });
    }
}
//# sourceMappingURL=FITSParser.js.map