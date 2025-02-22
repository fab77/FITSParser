// "use strict";

/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
import { FITSHeader } from "./model/FITSHeader.js";
import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
import { ParseUtils } from "./ParseUtils.js";

export class ParsePayload {
  
  static computePhysicalMinAndMax(header: FITSHeader, rawData: Uint8Array){
  
    const BITPIX: number = header.get("BITPIX") ?? null;
    const NAXIS1: number = header.get("NAXIS1") ?? null;
    const NAXIS2: number = header.get("NAXIS2") ?? null;
    const DATAMIN: number = header.get("DATAMIN") ?? null;
    const DATAMAX: number = header.get("DATAMAX") ?? null;
    
    if (!BITPIX || !NAXIS1 || !NAXIS2) {
      return null
    }

    if (!DATAMAX || !DATAMIN) {
      
      const [DATAMIN, DATAMAX] = ParsePayload.computePhysicalValues(rawData, header);
      if (DATAMIN && DATAMAX) {
        const maxitem = new FITSHeaderItem(
          "DATAMAX",
          DATAMAX,
          "computed by jsfitsio"
        );
        const minitem = new FITSHeaderItem(
          "DATAMIN",
          DATAMIN,
          "computed by jsfitsio"
        );
        header.addItem(maxitem);
        header.addItem(minitem);
      }
    }

    const endItem = new FITSHeaderItem('END', null, null);
    header.addItem(endItem)
    return header
    // TODO: END tag shall be added here
  }

  static computePhysicalValues(rawData: Uint8Array, header: FITSHeader): [number | undefined, number | undefined] {
    
    const BITPIX: number = header.get("BITPIX")
    const BLANK: number = header.get("BLANK")
    const BZERO: number = header.get("BZERO") ? header.get("BZERO") : 0;
    const BSCALE: number = header.get("BSCALE") ? header.get("BSCALE") : 1;
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

  static pixel2physicalValue(pxval: number, BSCALE:number, BZERO: number): number{
    if (BZERO === null || BSCALE === null) {
      throw new Error("Either BZERO or BSCALE is undefined");
    }
    return BZERO + BSCALE * pxval;
    
  }

  static extractPixelValue(rawData: Uint8Array, offset: number, BITPIX: number): number | undefined {
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
