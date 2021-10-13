"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

import ParseUtils from './ParseUtils';
import ColorMaps from './ColorMaps';
import Constants from './Constants';
import ColorMapNotFound from './exceptions/ColorMapNotFound';
import TransferFunctionNotFound from './exceptions/TransferFunctionNotFound';
import TransferFunctionNotImplemented from './exceptions/TransferFunctionNotImplemented';



let colorsMap = new Map();
colorsMap.set("grayscale","grayscale");
colorsMap.set("planck","planck");
colorsMap.set("eosb","eosb");
colorsMap.set("rainbow","rainbow");
colorsMap.set("cmb","cmb");
colorsMap.set("cubehelix","cubehelix");



class ParsePayload{
	
	_data;
	
	_BLANK_pv; // physical value for BLANK {BLANK_pv = BZERO + BSCALE * BLANK;}
	_PVMIN;
	_PVMAX;
	_PVMIN_orig;
	_PVMAX_orig;
	// _BLANK_pv;
	_physicalValues;
	_tfPhysicalValues;
	_bitpix;
	
	_tFunction;
	
	values;
	f;
	/**
	 * @param header:
	 *            ParseHeader.js
	 * @param fitsFile:
	 *            FITS binary file
	 * @param tFunction:
	 *            name of the trunsfer function
	 * @param coloMap:
	 *            name of the color map
	 */
	constructor (fitsheader, fitsFile) {
		
		this.init(fitsheader);

		this.values = [];
		
		
		this.u8data = new Uint8Array(fitsFile, fitsheader.offset);
		
		this.firstRun = true;
		
		this._PVMIN = undefined;
		this._PVMAX = undefined;
		
		if (pv_min !== undefined && pv_min !== null) {
			this._PVMIN = pv_min;
		}

		if (pv_max !== undefined && pv_max !== null) {
			this._PVMAX = pv_max;
		}
		
		this._physicalValues = new Array(this._naxis1 * this._naxis2);
		
		this._tfPhysicalValues = undefined;
		
		
		
	}
	
	init (fitsheader) {

		this._bzero = fitsheader.getValue("BZERO");
		this._bscale = fitsheader.getValue("BSCALE");
		this._blank = fitsheader.getValue("BLANK");
		this._BLANK_pv = this._bzero + this._bscale * this._blank || undefined;
		this._bitpix = fitsheader.getValue("BITPIX");
		this._naxis1 = fitsheader.getValue("NAXIS1");
		this._naxis2 =  fitsheader.getValue("NAXIS2");
		this._PVMIN = fitsheader.getValue("DATAMIN");
		this._PVMAX = fitsheader.getValue("DATAMAX");
	}

	
	parse (in_min, in_max) {
		
		this.parseData(in_min, in_max);
		
		this.applyScaleFunction(this._tFunction);
		
        return this._img;

	}
	
	computePhysicalMinAndMax () {
		this._PVMIN = fitsheader.getValue("DATAMIN");
		this._PVMAX = fitsheader.getValue("DATAMAX");

		let bytesXelem = Math.abs(this._bitpix / 8);
		let pxLength = this.u8data.byteLength / bytesXelem;
		let i = 0;
		if (this._PVMAX === undefined || this._PVMIN === undefined) {
			while (i < pxLength){
			
				px_val = this.extractPixelValue(bytesXelem*i);
				ph_val = this.pixel2physicalValue(px_val);
	
				if (ph_val < this._PVMIN) {
					this._PVMIN = ph_val;
				}
	
				if (ph_val > this._PVMAX) {
					this._PVMAX = ph_val;
				}				
				i++;
			}
		}
	}

	parseData (in_min, in_max) {
		
		if (in_min !== undefined && in_min !== null &&
			in_max !== undefined && in_max !== null) {

			this._PVMIN = in_min;
			this._PVMAX = in_max;

		} else if (this._PVMIN === undefined || this._PVMAX === undefined) {
			this.computePhysicalMinAndMax ();
		}

    	let px_val; // pixel array value
		let ph_val = undefined; // pixel physical value
		
		let bytesXelem = Math.abs(this._bitpix / 8);
		let pxLength = this.u8data.byteLength / bytesXelem;

		let j = 0;		
		while (j < pxLength) {

			px_val = this.extractPixelValue(bytesXelem*j);
			ph_val = this.pixel2physicalValue(px_val);
			
			if( ph_val < Number.MIN_VALUE || ph_val > Number.MAX_VALUE ||
				ph_val <= this._PVMIN || ph_val >= this._PVMAX) {
					// setting out of range pixels values to phisical BLANK value
					this._physicalValues[p++] = this._BLANK_pv;
			} else {
				this._physicalValues[p++] = ph_val;
			}
			j++;
		}

		return this._physicalValues;
		
	}

	applyScaleFunction (scaleFunction) {
		
		let self = this;
		this._tfPhysicalValues = [];
		
		if (scaleFunction == Constants.TRANSFER_FUNCTION_ASINH) {

			throw new TransferFunctionNotImplemented(scaleFunction);

		} else if (scaleFunction == Constants.TRANSFER_FUNCTION_HISTOGRAM) {

			throw new TransferFunctionNotImplemented(scaleFunction);

		} else if (scaleFunction == Constants.TRANSFER_FUNCTION_LINEAR) {

			this._tFunction = scaleFunction;
			this._tfPhysicalValues = this._physicalValues;

		} else if (scaleFunction == Constants.TRANSFER_FUNCTION_LOG) {

			this._tFunction = scaleFunction;
			this._physicalValues.forEach(function(element, idx){ 
				self._tfPhysicalValues[idx] = Math.log(element) 
			});

		} else if (scaleFunction == Constants.TRANSFER_FUNCTION_POWER) {

			throw new TransferFunctionNotImplemented(scaleFunction);

		} else if (scaleFunction == Constants.TRANSFER_FUNCTION_SINH) {

			throw new TransferFunctionNotImplemented(scaleFunction);

		} else if (scaleFunction == Constants.TRANSFER_FUNCTION_SQRT) {

			this._tFunction = scaleFunction;
			this._physicalValues.forEach(function(element, idx){ 
				self._tfPhysicalValues[idx] = Math.sqrt(element) 
			});

		} else if (scaleFunction == Constants.TRANSFER_FUNCTION_SQUARED) {

			throw new TransferFunctionNotImplemented(scaleFunction);

		} else {

			throw new TransferFunctionNotFound(scaleFunction);

		}
		
		this.applyColorMap(this._colorMap);

	}





	pixel2physicalValue (pxval) {
		return this._bzero + this._bscale * pxval;
	}
	
	extractPixelValue(offset) {

		let px_val = undefined; // pixel value
		if (this._bitpix == 16) { // 16-bit 2's complement binary integer
			px_val = ParseUtils.parse16bit2sComplement(this.u8data[offset], this.u8data[offset+1]);
		} else if (this._bitpix == 32) { // IEEE 754 half precision (float16) ?? 
			px_val = ParseUtils.parse32bit2sComplement(this.u8data[offset], this.u8data[offset+1], this.u8data[offset+2], this.u8data[offset+3]); 
		} else if (this._bitpix == -32) { // 32-bit IEEE single-precision floating point

			// let p = new Float32Array(this.u8data.buffer, offset*4);

			px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this.u8data[offset], this.u8data[offset+1], this.u8data[offset+2], this.u8data[offset+3]); 
			// if (px_val != 0){
			// 	// long to float conversion
			// 	px_val = (1.0+((px_val&0x007fffff)/0x0800000)) * Math.pow(2,((px_val&0x7f800000)>>23) - 127); 
			// }
		} else if (this._bitpix == 64) { // 64-bit 2's complement binary integer 
			throw new TypeError("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
		} else if (this._bitpix == -64) { // 64-bit IEEE double-precision floating point 
			throw new TypeError("BITPIX=-64 -> IEEE double-precision floating point NOT supported yet.");
		}

		return px_val;
	}


	
	
	
	applyColorMap (colorMapName) {
		
		if (colorMapName != null && colorMapName !== undefined){
			this._colorMap = colorMapName;	
		}

		
		if (Constants.checkGivenColorMap(colorMapName)) {
			this._colorMap = colorMapName;
		}else {
			throw new ColorMapNotFound(colorMapName);
		}

		let c = document.createElement('canvas');
    	c.width = this._naxis1;
        c.height = this._naxis2;
        let ctx = c.getContext("2d");
        let imgData = ctx.createImageData(c.width, c.height);
    	
        let row = 0;
        let col = 0;
        let i=0;
        let pos;
        let colors;
    	
//        console.log("Physical length: " + this._tfPhysicalValues.length);
//        console.log("Image length: " + imgData.data.length);
		for (row=0; row < this._naxis1; row++){
    		for (col=0; col < this._naxis2; col++){

    			/** to invert x and y replace the pos computation with the following */
    			/** pos = ((c.width - row) * (c.height) + col ) * 4; */
//    			pos = ( col * c.width + row ) * 4;
    			pos = ( (this._naxis1 - row) * c.width + col ) * 4;


    			colors = this.colorImage(this._tfPhysicalValues[i], this._inverse);

    			imgData.data[pos] = colors.r;
    			imgData.data[pos+1] = colors.g;
    			imgData.data[pos+2] = colors.b;
    			imgData.data[pos+3] = 0xff; // alpha
    			
    			i++;
    		}
    	}
    	ctx.putImageData(imgData, 0, 0);
    	let img = new Image();
        img.src = c.toDataURL();
        this._img = img;
	}
	
	
	colorImage (v, inverse){
		
		let min = this._PVMIN;
		let max = this._PVMAX;
		if (v<0) v = -v;
		let colormap_idx = ( (v-min) / (max-min)) * 256;
		let idx = Math.round(colormap_idx);
		let colorMap = ColorMaps[this._colorMap];
		if (idx<0){
			idx = -idx;
		}
		
		if (v <= this.BLANK_pv ){

			return {
				r:0,
				g:0,
				b:0
			};
		}
		
		if (this._colorMap == 'grayscale'){
			if (inverse){
				return {
					r: (255 - idx),
					g: (255 - idx),
					b: (255 - idx)
				};
			}
			
			return {
				r:idx,
				g:idx,
				b:idx
			};
		}else{
			if (inverse){
				return {
					r: (255 - colorMap.r[idx]),
					g: (255 - colorMap.g[idx]),
					b: (255 - colorMap.b[idx])
				};
			}
			
			return {
				r:colorMap.r[idx],
				g:colorMap.g[idx],
				b:colorMap.b[idx]
			};
		}

	}
	
	changeTransferFunction(tFunction){
		this._tFunction = tFunction;
		this.applyScaleFunction();
	}
	
	changeColorMap(colorMap){
		this._colorMap = colorMap;
		this.applyColorMap();
	}
	
	changeInverse(inverse){
		this._inverse = inverse;
		this.applyColorMap();
	}
	
	get img () {
		return this._img;
	}
	
	getPhysicalPixelValueFromScreenMouse(i, j){
		let idx =   ( (this._naxis2-j-1) * this._naxis1 ) + (i-1) ;		
		return this._tfPhysicalValues[idx];
	}

	getPixelValueFromScreenMouse(i, j){

		let arr = undefined;
		let idx =   ( (this._naxis2-j-1) * this._naxis1 ) + (i-1) ;
		if (this._bitpix == 16) {
			// return [this.u8data[2*idx], this.u8data[2*idx+1]];
			arr = this.u8data.slice(2*idx, 2*idx+2);
		} else if (this._bitpix == 32 || this._bitpix == -32) {
			arr = this.u8data.slice(4*idx, 4*idx+4);
		} else if (this._bitpix == 64 || this._bitpix == -64) {
			arr = this.u8data.slice(8*idx, 8*idx+8);
		}
		return arr;
		
	}
}

export default ParsePayload;