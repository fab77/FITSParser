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

class FITSParser {

    _FITSheader;
    _payloadParser;

    _img;

    constructor(uri, in_colorMap, in_tFunction, pvMin, pvMax){

		
		this._colorMap = in_colorMap;
		this._tFunction = in_tFunction;
		this._pvMin = pvMin;
		this._pvMax = pvMax;
		
		let fitsLoader = new FitsLoader(uri, this);
		
	}

    onFitsLoaded (fitsData) {

		this.processFits(this.fitsData);
		
	}

    processFits (data) {

		let headerParser = new ParseHeader(data);
        this._FITSheader = headerParser.parse();
		
		this._payloadParser = new ParsePayload(this._FITSheader, data);
		this._physicalValues = this._payloadParser.parse();
		return this._physicalValues;

	}

	changeTransferFunction(scaleFunction) {
		
		this._payloadParser.applyScaleFunction(scaleFunction);
		// this._img = this._payloadParser.img;
		
	}


	writeFITS(header, data) {

	}

	getImageData () {
		return this._img;
	}

	getFITSHeader () {
		this._FITSheader;
	}

    
	
	changeColorMap(colorMap) {
		
		this._payloadParser.changeColorMap(colorMap);
		this._img = this._payloadParser.img;
		
	}
	
	changeInverse(inverse){
		
		this._payloadParser.changeInverse(inverse);
		this._img = this._payloadParser.img;
		
	}

}

export default FITSParser;