"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

class FITSHeader{
	
	_keyValues;
	_width;
	_height;
	_offset;

	constructor(){
		this._keyValues = new Map();
	}
	
	setHeaderItem(key, value){
		if (key === "NAXIS1") {
			this._width = value;
		} else if (key === "NAXIS2") {
			this._height = value;
		}
		this._keyValues.set(key, value);
		
	}
	
	getValue(key){
		return this._keyValues.get(key);
	}

	get width () {
		return this._width;
	}

	get _height () {
		return this._height;
	}

	set offset (offset) {
		this._offset = offset;
	}
	
}

export default FITSHeader;