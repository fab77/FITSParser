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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { FITSWriter } from "./FITSWriter.js";
import { ParsePayload } from "./ParsePayload.js";
import { ParseHeader } from "./ParseHeader.js";
// import fetch from 'cross-fetch';
// import { readFile } from "node:fs/promises";
var FITSParser = /** @class */ (function () {
    function FITSParser() {
    }
    FITSParser.loadFITS = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var uint8data, fits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FITSParser.getFile(url)];
                    case 1:
                        uint8data = _a.sent();
                        if (uint8data === null || uint8data === void 0 ? void 0 : uint8data.byteLength) {
                            fits = FITSParser.processFits(uint8data);
                            return [2 /*return*/, fits];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    FITSParser.processFits = function (rawdata) {
        var header = ParseHeader.parse(rawdata);
        var headerFinalised = ParsePayload.computePhysicalMinAndMax(header, rawdata);
        if (headerFinalised == null) {
            return null;
        }
        var dataOffset = 2880; // Assuming no additional header blocks
        var payloadBuffer = new Uint8Array(rawdata.slice(dataOffset));
        var payloadMatrix = FITSParser.createMatrix(payloadBuffer, header);
        return {
            header: headerFinalised,
            data: payloadMatrix
        };
    };
    FITSParser.createMatrix = function (payload, header) {
        var NAXIS1 = header.get("NAXIS1");
        var NAXIS2 = header.get("NAXIS2");
        var BITPIX = header.get("BITPIX");
        var bytesXelem = Math.abs(BITPIX / 8);
        if (payload.length !== NAXIS1 * NAXIS2 * bytesXelem) {
            throw new Error("Payload size does not match the expected matrix dimensions.");
        }
        var matrix = [];
        for (var i = 0; i < NAXIS2; i++) {
            matrix.push(payload.slice(i * NAXIS1 * bytesXelem, (i + 1) * NAXIS1 * bytesXelem));
        }
        return matrix;
    };
    FITSParser.generateFITSForWeb = function (fitsParsed) {
        return FITSWriter.typedArrayToURL(fitsParsed);
    };
    FITSParser.saveFITSLocally = function (fitsParsed, path) {
        return FITSWriter.writeFITSFile(fitsParsed, path);
    };
    FITSParser.getFile = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var p, rawData, uint8, p, rawData, uint8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!uri.substring(0, 5).toLowerCase().includes("http")) return [3 /*break*/, 3];
                        return [4 /*yield*/, import('./getLocalFile.js')];
                    case 1:
                        p = _a.sent();
                        return [4 /*yield*/, p.getLocalFile(uri)];
                    case 2:
                        rawData = _a.sent();
                        uint8 = new Uint8Array(rawData);
                        return [2 /*return*/, uint8];
                    case 3: return [4 /*yield*/, import('./getFile.js')];
                    case 4:
                        p = _a.sent();
                        return [4 /*yield*/, p.getFile(uri)];
                    case 5:
                        rawData = _a.sent();
                        uint8 = new Uint8Array(rawData);
                        return [2 /*return*/, uint8];
                }
            });
        });
    };
    return FITSParser;
}());
export { FITSParser };
var url = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
FITSParser.loadFITS(url).then(function (fits) {
    if (fits == null) {
        return null;
    }
    var path = "./fitsTest1.fits";
    console.log(fits.header);
    FITSParser.saveFITSLocally(fits, path);
    console.log("finished");
});
var file = "/Users/fabriziogiordano/Desktop/PhD/code/new/FITSParser/test/inputs/empty.fits";
FITSParser.loadFITS(file).then(function (fits) {
    if (fits == null) {
        return null;
    }
    var path = "./fitsTest2.fits";
    console.log(fits.header);
    FITSParser.saveFITSLocally(fits, path);
    console.log("finished");
});
