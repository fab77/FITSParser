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

class ParseHeader {
	
	_rawData;
	
	constructor (fitsFile){
		
		this._rawData = fitsFile;
		
	}
	
	parse () {
		let FITSheader = new FITSHeader();
		// only one header block (2880) allowed atm. TODO allow multiple header blocks
		let headerByteData = new Uint8Array(this._rawData, 0, 2880);
		let textDecoder = new TextDecoder('iso-8859-1');
		
		// setting BZERO and BSCALE default values.
		FITSheader.setHeaderItem("BZERO", 0);
		FITSheader.setHeaderItem("BSCALE", 1);
		FITSheader.setHeaderItem("BLANK", undefined);

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

			FITSheader.setHeaderItem(key, val);

			console.log(line);
			if (key == 'END') {
				break;
			}
		}

		FITSheader.offset = 2880;
		console.debug("header offset in bytes: "+this._offset);
		return FITSheader;
	}
	
}

export default ParseHeader;

