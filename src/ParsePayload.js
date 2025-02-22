// "use strict";
import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
import { ParseUtils } from "./ParseUtils.js";
var ParsePayload = /** @class */ (function () {
    function ParsePayload() {
    }
    ParsePayload.computePhysicalMinAndMax = function (header, rawData) {
        var _a, _b, _c, _d, _e;
        var BITPIX = (_a = header.get("BITPIX")) !== null && _a !== void 0 ? _a : null;
        var NAXIS1 = (_b = header.get("NAXIS1")) !== null && _b !== void 0 ? _b : null;
        var NAXIS2 = (_c = header.get("NAXIS2")) !== null && _c !== void 0 ? _c : null;
        var DATAMIN = (_d = header.get("DATAMIN")) !== null && _d !== void 0 ? _d : null;
        var DATAMAX = (_e = header.get("DATAMAX")) !== null && _e !== void 0 ? _e : null;
        if (!BITPIX || !NAXIS1 || !NAXIS2) {
            return null;
        }
        if (!DATAMAX || !DATAMIN) {
            var _f = ParsePayload.computePhysicalValues(rawData, header), DATAMIN_1 = _f[0], DATAMAX_1 = _f[1];
            if (DATAMIN_1 && DATAMAX_1) {
                var maxitem = new FITSHeaderItem("DATAMAX", DATAMAX_1, "computed by jsfitsio");
                var minitem = new FITSHeaderItem("DATAMIN", DATAMIN_1, "computed by jsfitsio");
                header.addItem(maxitem);
                header.addItem(minitem);
            }
        }
        var endItem = new FITSHeaderItem('END', null, null);
        header.addItem(endItem);
        return header;
        // TODO: END tag shall be added here
    };
    ParsePayload.computePhysicalValues = function (rawData, header) {
        var BITPIX = header.get("BITPIX");
        var BLANK = header.get("BLANK");
        var BZERO = header.get("BZERO") ? header.get("BZERO") : 0;
        var BSCALE = header.get("BSCALE") ? header.get("BSCALE") : 1;
        var i = 0;
        var bytesXelem = Math.abs(BITPIX / 8);
        var pxLength = rawData.byteLength / bytesXelem;
        var min = null;
        var max = null;
        var physicalblank = null;
        if (BLANK) {
            physicalblank = ParsePayload.pixel2physicalValue(BLANK, BSCALE, BZERO);
        }
        while (i < pxLength) {
            var px_val = ParsePayload.extractPixelValue(rawData, bytesXelem * i, BITPIX);
            if (px_val === null) {
                i++;
                continue;
            }
            var ph_val = ParsePayload.pixel2physicalValue(px_val, BSCALE, BZERO);
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
    };
    ParsePayload.pixel2physicalValue = function (pxval, BSCALE, BZERO) {
        if (BZERO === null || BSCALE === null) {
            throw new Error("Either BZERO or BSCALE is undefined");
        }
        return BZERO + BSCALE * pxval;
    };
    ParsePayload.extractPixelValue = function (rawData, offset, BITPIX) {
        var px_val = null; // pixel value
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
    };
    return ParsePayload;
}());
export { ParsePayload };
