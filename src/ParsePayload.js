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
		
		this._u8data = new Uint8Array(rawdata, fitsheader.offset);
		this.init(fitsheader);		
		
		
	}
	
	init (fitsheader) {

		this._BZERO = fitsheader.get("BZERO");
		this._BSCALE = fitsheader.get("BSCALE");
		this._BLANK = fitsheader.get("BLANK");
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
	 * TODO wouldn't be better to return pixel values? DONE!
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
		while (k < pxLength) {

			r = Math.floor(k / this._NAXIS1); // row
			c = k - r * this._NAXIS1; // col

			if (r === 0) {
				pixelvalues[c] = new Array(this._NAXIS1);
			}

			px_val = this.extractPixelValue(bytesXelem * k);
			ph_val = this.pixel2physicalValue(px_val);
			
			if( ph_val < Number.MIN_VALUE || ph_val > Number.MAX_VALUE ||
				ph_val <= this._DATAMIN || ph_val >= this._DATAMAX) {
					// setting out of range pixels values to phisical BLANK value
					// this._physicalValues[p++] = this._BLANK_pv;  // unidimensional
					pixelvalues[c][r] = this._BLANK;		// bidimensional
			} else {
				// this._physicalValues[p++] = ph_val;  // unidimensional
				pixelvalues[c][r] = px_val;
			}
			k++;
		}

		return pixelvalues;
		
	}

	
	extractPixelValue(offset) {

		let px_val = undefined; // pixel value
		if (this._BITPIX == 16) { // 16-bit 2's complement binary integer
			px_val = ParseUtils.parse16bit2sComplement(this._u8data[offset], this._u8data[offset+1]);
		} else if (this._BITPIX == 32) { // IEEE 754 half precision (float16) ?? 
			px_val = ParseUtils.parse32bit2sComplement(this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]); 
		} else if (this._BITPIX == -32) { // 32-bit IEEE single-precision floating point

			// let p = new Float32Array(this.u8data.buffer, offset*4);

			px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]); 
			// if (px_val != 0){
			// 	// long to float conversion
			// 	px_val = (1.0+((px_val&0x007fffff)/0x0800000)) * Math.pow(2,((px_val&0x7f800000)>>23) - 127); 
			// }
		} else if (this._BITPIX == 64) { // 64-bit 2's complement binary integer 
			throw new TypeError("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
		} else if (this._BITPIX == -64) { // 64-bit IEEE double-precision floating point 
			throw new TypeError("BITPIX=-64 -> IEEE double-precision floating point NOT supported yet.");
		}

		return px_val;
	}
	
	pixel2physicalValue(pxval) {
		return this._BZERO + this._BSCALE * pxval;
	}
	// getPhysicalPixelValueFromScreenMouse(i, j){
	// 	let idx =   ( (this._naxis2-j-1) * this._naxis1 ) + (i-1) ;		
	// 	return this._tfPhysicalValues[idx];
	// }

	// getPixelValueFromScreenMouse(i, j){

	// 	let arr = undefined;
	// 	let idx =   ( (this._naxis2-j-1) * this._naxis1 ) + (i-1) ;
	// 	if (this._bitpix == 16) {
	// 		// return [this.u8data[2*idx], this.u8data[2*idx+1]];
	// 		arr = this.u8data.slice(2*idx, 2*idx+2);
	// 	} else if (this._bitpix == 32 || this._bitpix == -32) {
	// 		arr = this.u8data.slice(4*idx, 4*idx+4);
	// 	} else if (this._bitpix == 64 || this._bitpix == -64) {
	// 		arr = this.u8data.slice(8*idx, 8*idx+8);
	// 	}
	// 	return arr;
		
	// }
}

export default ParsePayload;