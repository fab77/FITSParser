// "use strict";
import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
import { ParseUtils } from "./ParseUtils.js";
// let colorsMap = new Map();
// colorsMap.set("grayscale","grayscale");
// colorsMap.set("planck","planck");
// colorsMap.set("eosb","eosb");
// colorsMap.set("rainbow","rainbow");
// colorsMap.set("cmb","cmb");
// colorsMap.set("cubehelix","cubehelix");
export class ParsePayload {
    constructor(fitsheader, rawdata) {
        this._u8data = new Uint8Array();
        this._BZERO = undefined;
        this._BSCALE = undefined;
        this._BLANK = undefined;
        this._BITPIX = undefined;
        this._NAXIS1 = undefined;
        this._NAXIS2 = undefined;
        this._DATAMIN = undefined;
        this._DATAMAX = undefined;
        this._physicalblank = undefined;
        const buffer = rawdata.slice(fitsheader.offset);
        this._u8data = new Uint8Array(buffer);
        this.init(fitsheader);
    }
    init(fitsheader) {
        this._BZERO = fitsheader.get("BZERO");
        if (this._BZERO === undefined) {
            this._BZERO = 0;
        }
        this._BSCALE = fitsheader.get("BSCALE");
        if (this._BSCALE === undefined) {
            this._BSCALE = 1;
        }
        this._BLANK = fitsheader.get("BLANK"); // undefined in case it's not present in the header
        // this._BLANK_pv = this._BZERO + this._BSCALE * this._BLANK || undefined;
        this._BITPIX = fitsheader.get("BITPIX");
        this._NAXIS1 = fitsheader.get("NAXIS1");
        this._NAXIS2 = fitsheader.get("NAXIS2");
        this._DATAMIN = fitsheader.get("DATAMIN");
        this._DATAMAX = fitsheader.get("DATAMAX");
        this._physicalblank = undefined;
        if (this._DATAMAX === undefined || this._DATAMIN === undefined) {
            const [min, max] = this.computePhysicalMinAndMax();
            this._DATAMAX = max;
            this._DATAMIN = min;
            const maxitem = new FITSHeaderItem("DATAMAX", max, " / computed with FITSParser");
            const minitem = new FITSHeaderItem("DATAMIN", min, " / computed with FITSParser");
            fitsheader.addItem(maxitem);
            fitsheader.addItem(minitem);
            // fitsheader.set("DATAMAX", max);
            // fitsheader.set("DATAMIN", min);
        }
        // let item = new FITSHeaderItem("END", null, null);
        // fitsheader.addItem(item);
    }
    computePhysicalMinAndMax() {
        let i = 0;
        if (this._BITPIX === undefined) {
            throw new Error("BITPIX is not defined");
        }
        const bytesXelem = Math.abs(this._BITPIX / 8);
        const pxLength = this._u8data.byteLength / bytesXelem;
        let px_val, ph_val;
        let min = undefined;
        let max = undefined;
        if (this._BLANK !== undefined) {
            this._physicalblank = this.pixel2physicalValue(this._BLANK);
        }
        while (i < pxLength) {
            // px_val = this.extractPixelValue(bytesXelem*i);
            px_val = this.extractPixelValue(bytesXelem * i);
            if (px_val === undefined) {
                i++;
                continue;
            }
            ph_val = this.pixel2physicalValue(px_val);
            if (min === undefined) {
                min = ph_val;
            }
            if (max === undefined) {
                max = ph_val;
            }
            //TODO check below if
            if (this._physicalblank === undefined || this._physicalblank !== ph_val) {
                if (ph_val !== undefined && (ph_val < min || min === undefined)) {
                    min = ph_val;
                }
                if (ph_val !== undefined && (ph_val > max || max === undefined)) {
                    max = ph_val;
                }
            }
            i++;
        }
        return [min, max];
    }
    parse() {
        // let px_val; // pixel array value
        // let ph_val = undefined; // pixel physical value
        if (this._BITPIX === undefined) {
            throw new Error("BITPIX is undefined");
        }
        if (this._NAXIS1 === undefined) {
            throw new Error("NAXIS1 is undefined");
        }
        if (this._NAXIS2 === undefined) {
            throw new Error("NAXIS2 is undefined");
        }
        const bytesXelem = Math.abs(this._BITPIX / 8);
        let pxLength = this._u8data.byteLength / bytesXelem;
        pxLength = this._NAXIS1 * this._NAXIS2;
        let k = 0;
        let c, r;
        const pixelvalues = [];
        //  let pixv, pv;
        while (k < pxLength) {
            r = Math.floor(k / this._NAXIS1); // row
            c = (k - r * this._NAXIS1) * bytesXelem; // col
            if (c === 0) {
                pixelvalues[r] = new Uint8Array(this._NAXIS1 * bytesXelem);
            }
            // px_val = this.extractPixelValue(bytesXelem * k);
            // ph_val = this.pixel2physicalValue(px_val);
            // TODO check if ph_val == blank
            // if not then use ph_val to compute datamin and datamax
            for (let i = 0; i < bytesXelem; i++) {
                pixelvalues[r][c + i] = this._u8data[k * bytesXelem + i];
            }
            // if (k == 232) {
            // 	pixv = this.extractPixelValue(k * bytesXelem);
            // 	pv = this._BZERO + this._BSCALE * pixv;
            // }
            k++;
        }
        return pixelvalues;
    }
    /** this can be deleted */
    extractPixelValue(offset) {
        let px_val = undefined; // pixel value
        if (this._BITPIX == 16) {
            // 16-bit 2's complement binary integer
            px_val = ParseUtils.parse16bit2sComplement(this._u8data[offset], this._u8data[offset + 1]);
        }
        else if (this._BITPIX == 32) {
            // IEEE 754 half precision (float16) ??
            px_val = ParseUtils.parse32bit2sComplement(this._u8data[offset], this._u8data[offset + 1], this._u8data[offset + 2], this._u8data[offset + 3]);
        }
        else if (this._BITPIX == -32) {
            // 32-bit IEEE single-precision floating point
            // px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]);
            px_val = ParseUtils.parseFloatingPointFormat(this._u8data.slice(offset, offset + 4), 8, 23);
        }
        else if (this._BITPIX == 64) {
            // 64-bit 2's complement binary integer
            throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
        }
        else if (this._BITPIX == -64) {
            // 64-bit IEEE double-precision floating point
            //https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
            px_val = ParseUtils.parseFloatingPointFormat(this._u8data.slice(offset, offset + 8), 11, 52);
        }
        return px_val;
    }
    pixel2physicalValue(pxval) {
        if (this._BZERO === undefined || this._BSCALE === undefined) {
            throw new Error("Either BZERO or BSCALE is undefined");
        }
        return this._BZERO + this._BSCALE * pxval;
    }
}
//# sourceMappingURL=ParsePayload.js.map