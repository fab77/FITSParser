"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

import ParseUtils from './ParseUtils.js';

// let colorsMap = new Map();
// colorsMap.set("grayscale","grayscale");
// colorsMap.set("planck","planck");
// colorsMap.set("eosb","eosb");
// colorsMap.set("rainbow","rainbow");
// colorsMap.set("cmb","cmb");
// colorsMap.set("cubehelix","cubehelix");



class ParsePayload{

	_u8data;
	_BZERO;
	_BSCALE;
	_BLANK;
	// _BLANK_pv;
	_BITPIX;
	_NAXIS1;
	_NAXIS2;
	_DATAMIN;
	_DATAMAX;
	/**
	 * @param header:
	 * @param fitsFile:
	 *            FITS binary file
	 */
	constructor (fitsheader, rawdata) {
		
		// let offset = fitsheader.offset;
		let buffer = rawdata.slice(fitsheader.offset);
		this._u8data = new Uint8Array(buffer);
		// this._u8data = new Uint8Array(rawdata, 2880);
		// console.log(this._u8data.byteOffset);
		this.init(fitsheader);		
		
		
	}
	
	init (fitsheader) {

		this._BZERO = fitsheader.get("BZERO");
		this._BSCALE = fitsheader.get("BSCALE");
		this._BLANK = fitsheader.get("BLANK"); // undefined in case it's not present in the header
		// this._BLANK_pv = this._BZERO + this._BSCALE * this._BLANK || undefined;
		this._BITPIX = fitsheader.get("BITPIX");
		this._NAXIS1 = fitsheader.get("NAXIS1");
		this._NAXIS2 =  fitsheader.get("NAXIS2");
		this._DATAMIN = fitsheader.get("DATAMIN");
		this._DATAMAX = fitsheader.get("DATAMAX");

		if (this._DATAMAX === undefined || this._DATAMIN === undefined) {
			let [min, max] = this.computePhysicalMinAndMax ();
			this._DATAMAX = max;
			this._DATAMIN = min;
			fitsheader.set("DATAMAX", max);
			fitsheader.set("DATAMIN", min);
		}
	}
	
	computePhysicalMinAndMax () {
		
		let i = 0;
		let bytesXelem = Math.abs(this._BITPIX / 8);
		let pxLength = this._u8data.byteLength / bytesXelem;
		let px_val, ph_val;
		let min = undefined;
		let max = undefined;
		while (i < pxLength){
		
			px_val = this.extractPixelValue(bytesXelem*i);
			ph_val = this.pixel2physicalValue(px_val);

			if (ph_val < min || min === undefined) {
				min = ph_val;
			}

			if (ph_val > max || max === undefined) {
				max = ph_val;
			}				
			i++;
		}
		return [min, max];
	}

	/**
	 * 
	 * @returns Matrix (naxis1 x naxis2) with physical values
	 * 
	 */
	parse () {
		
    	let px_val; // pixel array value
		let ph_val = undefined; // pixel physical value
		
		let bytesXelem = Math.abs(this._BITPIX / 8);
		let pxLength = this._u8data.byteLength / bytesXelem;

		let k = 0;
		// let p = 0;
		let c, r;
		let pixelvalues = [];
		// let blankbytes = ParseUtils.convertBlankToBytes(this._BLANK, bytesXelem); // not needed
		// let pixelvalues = new Uint8Array();
		while (k < pxLength) {

			/** old code */
			// r = Math.floor(k / this._NAXIS1); // row
			// c = k - r * this._NAXIS1; // col

			// if (r === 0) {
			// 	pixelvalues[c] = new Array(this._NAXIS1);				
			// }
			// px_val = this.extractPixelValue(bytesXelem * k);
			// ph_val = this.pixel2physicalValue(px_val);
			

			// if (this._BLANK !== undefined && this._BLANK === px_val) {
			// 	pixelvalues[c][r] = this._BLANK;
			// }else {
			// 	pixelvalues[c][r] = px_val;
			// }

			// k++;
			/** end of old code */
			r = Math.floor(k / this._NAXIS1); // row
			c = (k - r * this._NAXIS1) * bytesXelem; // col
			if (c === 0) {
				// pixelvalues[c] = new Array(this._NAXIS1);
				pixelvalues[r] = new Uint8Array(this._NAXIS1 * bytesXelem);
			}
			px_val = this.extractPixelValue(bytesXelem * k);
			ph_val = this.pixel2physicalValue(px_val);
			
			// if (this._BLANK !== undefined && this._BLANK == px_val) {
				
			// 	for (let i= 0; i < bytesXelem; i++ ) {
			// 		px_val = blankbytes[i];	
			// 		pixelvalues[r][c+i] = px_val;
			// 	}

			// }else {

				for (let i= 0; i < bytesXelem; i++ ) {
					// console.log(this._u8data[k + i]);
					pixelvalues[r][c+i] = this._u8data[k * bytesXelem + i];
				}

			// }
			k++;		
		}

		return pixelvalues;
		
	}

	
	extractPixelValue(offset) {

		let px_val = undefined; // pixel value
		let px_val1, px_val2, px_val3, px_val4;
		if (this._BITPIX == 16) { // 16-bit 2's complement binary integer
			px_val = ParseUtils.parse16bit2sComplement(this._u8data[offset], this._u8data[offset+1]);
		
		} else if (this._BITPIX == 32) { // IEEE 754 half precision (float16) ?? 
			px_val = ParseUtils.parse32bit2sComplement(this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]); 
		
		} else if (this._BITPIX == -32) { // 32-bit IEEE single-precision floating point
			// px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]); 
			px_val = ParseUtils.parseFloatingPointFormat(this._u8data.slice(offset, offset + 8), 8, 23);

		} else if (this._BITPIX == 64) { // 64-bit 2's complement binary integer 
			throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
		
		} else if (this._BITPIX == -64) { // 64-bit IEEE double-precision floating point 
			//https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
			px_val = ParseUtils.parseFloatingPointFormat(this._u8data.slice(offset, offset + 8), 11, 52);

		}

		return px_val;
	}
	
	pixel2physicalValue(pxval) {
		return this._BZERO + this._BSCALE * pxval;
	}
	
}

export default ParsePayload;