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
import {load} from "./FitsLoader2.js";
class FITSParser {

	_procdata;
	_callback;
    constructor(uri, callback, observerlist){
		this._procdata = undefined;
		this._callback = callback;
		
		
		let loader = load(uri);
		// TODO when load returns null, truncate promise chain
		return loader
			.then(data => 
				this.processFits(data))
			.then(fits => {
				if (observerlist){
					observerlist.forEach((observer) => {
						observer.notify(fits);
					});	
				}
				if (callback) {
					callback(fits);
				}
				return fits;
			}).catch(function(err) {
				console.log("[FITSParser] "+err);
			});
	}

    processFits (rawdata, caller) {

		let header = ParseHeader.parse(rawdata);
		
		let payloadParser = new ParsePayload(header, rawdata);
		let pixelvalues = payloadParser.parse();
		
		this._procdata = pixelvalues;
		return {
				"header": header,
				"data": pixelvalues
				};

	}

	static writeFITS(header, rawdata) {
		console.log("Writing FITS");
		let writer = new FITSWriter();
		writer.run(header, rawdata);
		writer.writeFITS();
		// return writer.typedArrayToURL();
	}

}

export default FITSParser;