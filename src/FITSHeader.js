"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

// reference FTIS standard doc https://heasarc.gsfc.nasa.gov/docs/fcg/standard_dict.html

class FITSHeader extends Map {
	
	// _keyValues;
	// _width;
	// _height;
	_offset;

	constructor(){
		// this._keyValues = new Map();
		this.set("BZERO", 0);
		this.set("BSCALE", 1);
		/* BLANK: The value field shall contain an integer that
		 * specifies the representation of ARRAY values whose physical values are
		 * undefined. 
		 */
		this.set("BLANK", undefined);
		this._offset = 2880;
	}
	
	// setHeaderItem(key, value){
	// 	if (key === "NAXIS1") {
	// 		this._width = value;
	// 	} else if (key === "NAXIS2") {
	// 		this._height = value;
	// 	}
	// 	this._keyValues.set(key, value);
		
	// }

	get offset() {
		return this._offset;
	}
	
	getNaxis() {
		return this.get("NAXIS");
	}

	getNaxis1(){
		return this.get("NAXIS1");
	}

	getNaxis2(){
		return this.get("NAXIS2");
	}

	getSimple(){
		return this.get("SIMPLE");
	}

	getBlank(){
		return this.get("BLANK");
	}

	getBscale(){
		return this.get("BSCALE");
	}

	getBzero(){
		return this.get("BZERO");
	}

	getSimple(){
		return this.get("SIMPLE");
	}

	getValue(key){
		return this._keyValues.get(key);
	}

	get width () {
		return this._width;
	}

	get height () {
		return this._height;
	}

	// /**
	//  * @param {number} offset
	//  */
	// set offset (offset) {
	// 	this._offset = offset;
	// }

	// get offset () {
	// 	return this._offset;
	// }
	
}

export default FITSHeader;