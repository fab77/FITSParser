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

	static byteString(n) {
		if (n < 0 || n > 255 || n % 1 !== 0) {
			throw new Error(n + " does not fit in a byte");
		}
		return ("000000000" + n.toString(2)).substr(-8)
	}

	static parse32bitSinglePrecisionFloatingPoint (byte1, byte2, byte3, byte4) {
		let long = (((((byte1 << 8) + byte2) << 8) + byte3) << 8) + byte4;
		if (long < 0) long += 4294967296;
		let float = (1.0+((long&0x007fffff)/0x0800000)) * Math.pow(2,((long&0x7f800000)>>23) - 127);
		return float;
	}


	static convertBlankToBytes(blank, nbytes) {
		let str = Math.abs(blank).toString(2);
		while ( (str.length/8) < nbytes ){
			str += "0";
		}
		let buffer = new ArrayBuffer(nbytes);
		let uint8 = new Uint8Array(buffer);
		for (let i = 0; i < nbytes; i++) {
			uint8[i] = parseInt(str.substr(8 * i, 8 * (i + 1)), 2);
		}
		return uint8;
		
	}
	/** https://gist.github.com/Manouchehri/f4b41c8272db2d6423fa987e844dd9ac */
	static parseFloatingPointFormat (bytes, ebits, fbits) {
		
		// console.log("parse64bitSinglePrecisionFloatingPoint3");
		// Bytes to bits
		var bits = [];
		for (var i = bytes.length; i; i -= 1) {
			var byte = bytes[i - 1];
			for (var j = 8; j; j -= 1) {
				bits.push(byte % 2 ? 1 : 0); byte = byte >> 1;
			}
		}
		bits.reverse();
		var str = bits.join('');
		// console.log(str);
		// Unpack sign, exponent, fraction
		var bias = (1 << (ebits - 1)) - 1;
		var s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
		var e = parseInt(str.substring(1, 1 + ebits), 2);
		var f = parseInt(str.substring(1 + ebits), 2);
		
		// Produce number
		if (e === (1 << ebits) - 1) {
			return f !== 0 ? NaN : s * Infinity;
		}
		else if (e > 0) {
			return s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
		}
		else if (f !== 0) {
			return s * Math.pow(2, -(bias-1)) * (f / Math.pow(2, fbits));
		}
		else {
			return s * 0;
		}
	}



	// static parse64bitSinglePrecisionFloatingPoint4 (byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8) {
	// 	// console.log("parse64bitSinglePrecisionFloatingPoint4");
	// 	// console.log(
	// 	// 	ParseUtils.byteString(byte1) +""+ ParseUtils.byteString(byte2) +""+ ParseUtils.byteString(byte3) +""+ ParseUtils.byteString(byte4) 
	// 	// 	+""+ ParseUtils.byteString(byte5) +""+ ParseUtils.byteString(byte6) +""+ ParseUtils.byteString(byte7) +""+ ParseUtils.byteString(byte8));
	// 	let long = (((((((((((((byte1 << 8 ) | byte2) << 8) | byte3) << 8 ) | byte4) << 8) | byte5) << 8) | byte6) << 8) | byte7) << 8) | byte8;
	// 	if (long < 0) long += 4503599627370496;
	// 	// console.log(long.toString(2));
	// 	var bias = (1 << (11 - 1)) - 1;
	// 	var s = Math.pow ( -1, (byte1 & 0x80));
	// 	var e = (((byte1 << 8) + byte2) & 0x7ff0) >> 4;
		
	// 	var fbytes = (((((byte2 << 8) | byte3) << 8 ) | byte4) << 8 ) | byte5 ;
	// 	var f = ((fbytes & 0x0fffffffffffff) / Math.pow(2, 52));
	// 	// console.log("bias: "+bias);
	// 	// console.log("sign: "+ (s === 1) ? "0" : "1");
	// 	// console.log("e: "+e.toString(2));
	// 	// console.log("e: "+e);
	// 	// console.log("fbytes: "+fbytes.toString(2));
	// 	// console.log("f: "+f.toString(2));

	// 	if (e === (1 << 11) - 1) {
	// 		return f !== 0 ? NaN : s * Infinity;
	// 	}
	// 	else if (e > 0) {
	// 		return s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, 52));
	// 	}
	// 	else if (f !== 0) {
	// 		return s * Math.pow(2, -(bias-1)) * (f / Math.pow(2, 52));
	// 	}
	// 	else {
	// 		return s * 0;
	// 	}
	// }
	
	// static parse64bitSinglePrecisionFloatingPoint5 (bytes) {
	// 	let float = new Float64Array(bytes.buffer);
	// 	console.log(float);
	// 	return float;
	// }
	
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

	static extractPixelValue(offset, bytes, bitpix) {

		let px_val = undefined; // pixel value
		let px_val1, px_val2, px_val3, px_val4;
		if (bitpix == 16) { // 16-bit 2's complement binary integer
			px_val = ParseUtils.parse16bit2sComplement(bytes[offset], bytes[offset+1]);
		
		} else if (bitpix == 32) { // IEEE 754 half precision (float16) ?? 
			px_val = ParseUtils.parse32bit2sComplement(bytes[offset], bytes[offset+1], bytes[offset+2], bytes[offset+3]); 
		
		} else if (bitpix == -32) { // 32-bit IEEE single-precision floating point
			// px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]); 
			px_val = ParseUtils.parseFloatingPointFormat(bytes.slice(offset, offset + 8), 8, 23);

		} else if (bitpix == 64) { // 64-bit 2's complement binary integer 
			throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
		
		} else if (bitpix == -64) { // 64-bit IEEE double-precision floating point 
			//https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
			px_val = ParseUtils.parseFloatingPointFormat(bytes.slice(offset, offset + 8), 11, 52);

		}

		return px_val;
	}
	
	
}

export default ParseUtils;