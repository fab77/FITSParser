"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

class ParseUtils {
	

	static getStringAt (data, offset, length) {
		let chars = [];
		for (let i=offset,j=0;i<offset+length;i++,j++) {
			
			chars[j] = String.fromCharCode(data.charCodeAt(i) & 0xFF);
			
		}
		return chars.join("");
	}
	
	// static parse32bitSinglePrecisionFloatingPoint (data, offset) {
	// 	var byte1 = ParseUtils.getByteAt(data, offset);
	// 	let byte2 = ParseUtils.getByteAt(data, offset + 1);
	// 	let byte3 = ParseUtils.getByteAt(data, offset + 2);
	// 	let byte4 = ParseUtils.getByteAt(data, offset + 3);
		
	// 	let long = (((((byte1 << 8) + byte2) << 8) + byte3) << 8) + byte4;
	// 	if (long < 0) long += 4294967296;


	// 	return long;
	// }

	static parse32bitSinglePrecisionFloatingPoint (byte1, byte2, byte3, byte4) {
		let long = (((((byte1 << 8) + byte2) << 8) + byte3) << 8) + byte4;
		if (long < 0) long += 4294967296;
		let float = (1.0+((long&0x007fffff)/0x0800000)) * Math.pow(2,((long&0x7f800000)>>23) - 127);
		return float;
	}
	
	
	static generate16bit2sComplement (val) {
		throw new TypeError("not implemented yet");
	}
	
	static parse16bit2sComplement(byte1, byte2) {
		let unsigned = (byte1 << 8) | byte2;
		if ( unsigned & 0x8000) {
			return unsigned | 0xffff0000;
		} else {
			return unsigned;
		}
	}

	// static parse16bit2sComplement(data, offset) {
	// 	let byte1 = ParseUtils.getByteAt(data, offset);
	// 	let byte2 = ParseUtils.getByteAt(data, offset + 1);
	// 	let h = 0x0000 | (byte1 << 8) | byte2;
		
	// 	let s = (h & 0x8000) >> 15;
	// 	let e = (h & 0x7C00) >> 10;
	// 	let f = h & 0x03FF; // non usato ma forse va cambiato in 0x07FF

	// 	let res = h & 0x0000FFFF;
	    
	//     if (s){
	//     	res = (~h & 0x0000FFFF)  + 1;
	//     	return -1 * res;
	//     }
	//     return res;

	// }

	static parse32bit2sComplement(byte1, byte2, byte3, byte4) {
		let unsigned = (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
		let s = (unsigned & 0x80000000) >> 31;
		let res = unsigned & 0xFFFFFFFF;
	    
	    if (s){
	    	res = (~unsigned & 0xFFFFFFFF) + 1;
	    	return -1 * res;
	    }
	    return res;
	}


	// static parse32bit2sComplement(data, offset) {
	// 	let byte1 = ParseUtils.getByteAt(data, offset);
	// 	let byte2 = ParseUtils.getByteAt(data, offset + 1);
	// 	let byte3 = ParseUtils.getByteAt(data, offset + 2);
	// 	let byte4 = ParseUtils.getByteAt(data, offset + 3);
		
	// 	let h = (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
		
	// 	let s = (h & 0x80000000) >> 31;
	// 	let e = (h & 0x7FC00000) >> 23;
	// 	let f =  h & 0x007FFFFF;

	// 	let res = h & 0xFFFFFFFF;
	    
	//     if (s){
	//     	res = (~h & 0xFFFFFFFF)  + 1;
	//     	return -1 * res;
	//     }
	//     return res;

	// }
	
	/**
	 * 
	 * @param {*} data string?
	 * @param {*} offset offset in the data
	 * @returns returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.
	 */
	static getByteAt (data, offset) {
		let dataOffset = 0;
		return data.charCodeAt(offset + dataOffset) & 0xFF;
	}
	
	
}

export default ParseUtils;