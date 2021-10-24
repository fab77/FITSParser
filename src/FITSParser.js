"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
import FitsLoader from "./FitsLoader";
import ParsePayload from "./ParsePayload";

class FITSParser {

    _FITSheader;
    _payloadParser;

    _img;

    constructor(uri){
		
		let fitsraw = FitsLoader().load(uri);
		this.processFits(fitsraw);
	
	}

    processFits (rawdata) {

		// let headerParser = new ParseHeader(data);
        this._header = ParseHeader.parse(rawdata);
		
		this._payloadParser = new ParsePayload(this._FITSheader, rawdata);
		this._physicalValues = this._payloadParser.parse();

		
		return {
			"header": this._header,
			"data": this._physicalValues
			};

	}

	writeFITS(header, rawdata) {

	}

}

export default FITSParser;