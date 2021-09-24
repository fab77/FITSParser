"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

import FITSHeader from './FITSHeader';
import NAXISNotFoundException from './exceptions/NAXISNotFoundException';

class ParseHeader {
	
	_header;
	_data;
	// _width;
	// _height;
	// _offset; // number of digit used for the header 
	
	
	constructor (fitsFile){
		
		this._data = fitsFile;
		// this._offset = 0;
		this._header = new FITSHeader();
		// this.parse();
		
	}
	
	getValue (key) {
		return this._header.getValue(key);
	}
	
	
	get header () {
		return this._header;
	}
	
	// get offset (){
	// 	return this._offset;
	// }
	
	// get width (){
	// 	return this._width;
	// }
	
	// get height (){
	// 	return this._height;
	// }
	
	
	parse () {
		
		let headerByteData = new Uint8Array(this._data, 0, 2880);
		let textDecoder = new TextDecoder('iso-8859-1');
		
		// setting BZERO and BSCALE default values.
		this._header.setHeaderItem("BZERO", 0);
		this._header.setHeaderItem("BSCALE", 1);
		this._header.setHeaderItem("BLANK", undefined);

		for (let i = 0; i < 2880/80; i++) {
			let u8line = new Uint8Array(headerByteData.slice(i*80, i*80 + 80));
			let line = textDecoder.decode(u8line);
			// reading key
			let u8key = new  Uint8Array(u8line.slice(0, 7));
			let key = textDecoder.decode(u8key).trim();
			// reading value
			let u8val = new  Uint8Array(u8line.slice(10, 80));
			let val = textDecoder.decode(u8val).trim();

			if(val.indexOf("'") !== 0 && key !== "SIMPLE"){
				
				if(val.indexOf('.') >= 0) {
					val = parseFloat(val); // Floating point
				}else {
					val = parseInt(val); // Integer
				}

			}

			this._header.setHeaderItem(key, val);

			console.log(line);
			if (key == 'END') {
				break;
			}
		}
		
		// if (typeof this._header.getValue("NAXIS1") == "number") {
		// 	this._width = this._header.getValue("NAXIS1");
		// } else {
		// 	throw new NAXISNotFoundException("NAXIS1");
		// }
		// if (typeof this._header.getValue("NAXIS2") == "number") {
		// 	this._height = this._header.getValue("NAXIS2");
		// } else {
		// 	throw new NAXISNotFoundException("NAXIS2");
		// }

		// TODO handle headers containing more than 1 block of 2880 bytes
		// this._offset = 2880;
		this._header.offset = 2880;
		console.debug("header offset in bytes: "+this._offset);
		return this._header;
	}
	
}

export default ParseHeader;

