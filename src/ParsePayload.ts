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
import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
import { FITSHeaderManager } from "./model/FITSHeaderManager.js";
import { ParseHeader } from "./ParseHeader.js";
import { ParseUtils } from "./ParseUtils.js";

export class ParsePayload {

  

  static computePhysicalMinAndMax(header: FITSHeaderManager, rawData: Uint8Array) {

    const BITPIX = ParseHeader.checkFITSItem(header, "BITPIX")
    if (BITPIX === null) {
      return null
    }
    const NAXIS1 = ParseHeader.checkFITSItem(header, "NAXIS1")
    if (NAXIS1 === null) {
      return null
    }
    const NAXIS2 = ParseHeader.checkFITSItem(header, "NAXIS2")
    if (NAXIS2 === null) {
      return null
    }
    
    const DATAMIN = ParseHeader.checkFITSItem(header, "DATAMIN")
    const DATAMAX = ParseHeader.checkFITSItem(header, "DATAMAX")
    

    if (!BITPIX || !NAXIS1 || !NAXIS2) {
      return null; // return early if invalid data.
    }
    

    if (!DATAMAX || !DATAMIN) {

      const [min, max] = ParsePayload.computePhysicalValues(rawData, header);
      if (min && max) {
        const maxitem = new FITSHeaderItem(
          "DATAMAX",
          min,
          "computed by jsfitsio"
        );
        const minitem = new FITSHeaderItem(
          "DATAMIN",
          max,
          "computed by jsfitsio"
        );
        header.insert(maxitem);
        header.insert(minitem);
      }
    }

    const endItem = new FITSHeaderItem('END', "", "");
    header.insert(endItem)
    return header
    // TODO: END tag shall be added here
  }



  static computePhysicalValues(rawData: Uint8Array, header: FITSHeaderManager): [number | null, number | null] {

    const BITPIX = ParseHeader.checkFITSItem(header, "BITPIX")
    if (BITPIX === null || isNaN(BITPIX)) {
      return [null, null]
    }
    
    const BLANK = ParseHeader.checkFITSItem(header, "BLANK")
    if (BLANK === null || isNaN(BITPIX)) {
      return [null, null]
    }
    
    let BZERO = ParseHeader.checkFITSItem(header, "BZERO")
    if (BZERO === null) {
      BZERO = 0
    }
    
    let BSCALE = ParseHeader.checkFITSItem(header, "BSCALE")
    if (BSCALE === null) {
      BSCALE = 1
    }
    
    let i = 0;

    const bytesXelem = Math.abs(BITPIX / 8);
    const pxLength = rawData.byteLength / bytesXelem;

    let min = null;
    let max = null;
    let physicalblank = null

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

  static pixel2physicalValue(pxval: number, BSCALE: number, BZERO: number): number {
    if (BZERO === null || BSCALE === null) {
      throw new Error("Either BZERO or BSCALE is null");
    }
    return BZERO + BSCALE * pxval;

  }

  static extractPixelValue(rawData: Uint8Array, offset: number, BITPIX: number): number | null {
    let px_val = null; // pixel value
    if (BITPIX == 16) {
      // 16-bit 2's complement binary integer
      px_val = ParseUtils.parse16bit2sComplement(
        rawData[offset],
        rawData[offset + 1]
      );
    } else if (BITPIX == 32) {
      // IEEE 754 half precision (float16) ??
      px_val = ParseUtils.parse32bit2sComplement(
        rawData[offset],
        rawData[offset + 1],
        rawData[offset + 2],
        rawData[offset + 3]
      );
    } else if (BITPIX == -32) {
      // 32-bit IEEE single-precision floating point
      // px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]);
      px_val = ParseUtils.parseFloatingPointFormat(
        rawData.slice(offset, offset + 4),
        8,
        23
      );
    } else if (BITPIX == 64) {
      // 64-bit 2's complement binary integer
      throw new Error(
        "BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet."
      );
    } else if (BITPIX == -64) {
      // 64-bit IEEE double-precision floating point
      //https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
      px_val = ParseUtils.parseFloatingPointFormat(
        rawData.slice(offset, offset + 8),
        11,
        52
      );
    }

    return px_val;
  }

}
