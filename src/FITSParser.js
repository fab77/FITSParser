"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
 import FitsLoader from "./FitsLoader.js";
 import FITSWriter from "./FITSWriter.js";
 import ParsePayload from "./ParsePayload.js";
 import ParseHeader from "./ParseHeader.js";

// import FitsLoader from "./FitsLoader";
// import FITSWriter from "./FITSWriter";
// import ParsePayload from "./ParsePayload";
// import ParseHeader from "./ParseHeader";


class FITSParser {

	_procdata;
	_callback;
    constructor(uri, callback){
		this._procdata = undefined;
		this._callback = callback;
		// let data = FitsLoader.load(uri, this.processFits);
		FitsLoader.load(uri, this);

		
		// this.processFits(data);
		
		// this.data = p.then(imgBuffer => {
		// 	console.log("aooooo");
		// 	this.data = this.processFits(imgBuffer);
		// 	return this.data;
		// }).catch(err => {
		// 	console.error(err);
		// });
		// return this.data;
	}

    processFits (rawdata, caller) {

		let header = ParseHeader.parse(rawdata);
		
		let payloadParser = new ParsePayload(header, rawdata);
		let pixelvalues = payloadParser.parse();
		
		caller._procdata = {
			"header": header,
			"data": pixelvalues
			};
			caller._callback(caller._procdata);

	}

	writeFITS(header, rawdata) {
		let writer = new FITSWriter();
		writer.run(header, rawdata);
		return writer.typedArrayToURL();
	}

}

export default FITSParser;