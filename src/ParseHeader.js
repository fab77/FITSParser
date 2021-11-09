"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

import FITSHeader from './FITSHeader.js';
import FITSHeaderItem from './FITSHeaderItem.js';

class ParseHeader {
	
	// _rawData;
	
	// constructor (fitsFile){
	// 	this._rawData = fitsFile;
	// }
	

	static parse (rawdata) {
		
		// only one header block (2880) allowed atm. 
		// TODO handle multiple header blocks
		// let headerByteData = new Uint8Array(rawdata, 0, 2880);

		let textDecoder = new TextDecoder('iso-8859-1');
		
		
		let header = new FITSHeader();

		let nline = 0;
		let key = "", val, tval, comment;

		// // as per FITS standard, SIMPLE nust be the first keyword in HDU
		// let simpleline = new Uint8Array(rawdata.slice(nline*80, nline*80 + 80));
		// nline++;
		// let simpleval = new  Uint8Array(simpleline.slice(10, 80));
		// val = textDecoder.decode(simpleval).trim();
		// header.set("SIMPLE", val);
		
		// // as per FITS standard, SIMPLE nust be the second keyword in HDU
		// let bitpixline = new Uint8Array(rawdata.slice(nline*80, nline*80 + 80));
		// nline++;
		// let bitpixval = new  Uint8Array(bitpixline.slice(10, 80));
		// val = textDecoder.decode(bitpixval).trim();
		// header.set("BITPIX", val);
		

		let u8line, u8key, u8val, u8ind, ind, ival, icomment;
		let item;
		while (key !== 'END') {
			// line 80 characters
			u8line = new Uint8Array(rawdata.slice(nline*80, nline*80 + 80));
			nline++;
			// key
			u8key = new  Uint8Array(u8line.slice(0, 8));
			key = textDecoder.decode(u8key).trim();
			// value indicator
			u8ind = new  Uint8Array(u8line.slice(8, 10));
			ind = textDecoder.decode(u8ind);
			// reading value
			u8val = new  Uint8Array(u8line.slice(10, 80));
			val = textDecoder.decode(u8val).trim();

			
			if (u8ind[0] == 61 && u8ind[1] == 32) {
				let firstchar = 32;
				for (let i = 0; i < u8val.length; i++) {
					if (u8val[i] != 32) {
						firstchar = u8val[i];
						break;
					}
				}
				if (firstchar == 39) { // value starts with '
					[ival, icomment] = ParseHeader.parseStringValue(u8val);
				} else{
					if (firstchar == 84 || firstchar == 70) {	// T or F
						[ival, icomment] = ParseHeader.parseLogicalValue(u8val);
						// val = textDecoder.decode(u8val).trim();
					} else{
						val = textDecoder.decode(u8val).trim();
						if (val.includes('.')){
							[ival, icomment] = ParseHeader.parseFloatValue(u8val);
							// parseFloat(tval); 
						} else {
							[ival, icomment] = ParseHeader.parseIntValue(u8val);
							// parseInt(tval); 
						}
					}
				}
				item = new FITSHeaderItem(key, ival, icomment);
			} else {
				if (key == "COMMENT" || key == "HISTORY") {
					item = new FITSHeaderItem(key, null, val);
				} else {
					let firstchar = 32;
					for (let i = 0; i < u8val.length; i++) {
						if (u8val[i] != 32) {
							firstchar = u8val[i];
							break;
						}
					}
					if (firstchar == 47) { // single / this is the case when no key nor value indicator is defined
						item = new FITSHeaderItem(null, null, val);
					} else if (firstchar == 32) { // case when there's a line with only spaces
						item = new FITSHeaderItem(null, null, null);
					}
				}
			}
			
			header.addItem(item);

		}

		item = new FITSHeaderItem("COMMENT", "FITS generated with FITSParser on ", null);
		header.addItem(item);

		item = new FITSHeaderItem("COMMENT", new Date, null);
		header.addItem(item);

		// moved into parse payload for DATAMIN and DATAMAX
		// item = new FITSHeaderItem("END", null, null);
		// header.addItem(item);

		let nblock = Math.ceil(nline / 36);
		let offset = nblock * 2880;
		
		header.offset = offset;
		
		return header;
	}

	static parseStringValue(u8buffer) {
		let textDecoder = new TextDecoder('iso-8859-1');
		let decoded = textDecoder.decode(u8buffer).trim();
		let idx = decoded.lastIndexOf("/");
		let val = decoded.substring(0, idx);
		let comment = decoded.substring(idx);
		if (comment === undefined) {
			return [val, null];	
		}
		return [val, comment];
	}

	static parseLogicalValue(u8buffer) {
		let textDecoder = new TextDecoder('iso-8859-1');
		let val = textDecoder.decode(u8buffer).trim();
		let tokens = val.split("/");
		if (tokens[1] === undefined) {
			return [tokens[0].trim(), null];	
		}
		return [tokens[0].trim(), " /"+tokens[1]];
	}
	
	static parseIntValue(u8buffer) {
		let textDecoder = new TextDecoder('iso-8859-1');
		let val = textDecoder.decode(u8buffer).trim();
		let tokens = val.split("/");
		if (tokens[1] === undefined) {
			return [parseInt(tokens[0].trim()), null];	
		}
		return [parseInt(tokens[0].trim()), " /"+tokens[1]];
	}

	static parseFloatValue(u8buffer) {
		let textDecoder = new TextDecoder('iso-8859-1');
		let val = textDecoder.decode(u8buffer).trim();
		let tokens = val.split("/");
		if (tokens[1] === undefined) {
			return [parseFloat(tokens[0].trim()), null];	
		}
		return [parseFloat(tokens[0].trim()), " /"+tokens[1]];
	}
}

export default ParseHeader;

