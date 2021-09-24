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

    _header;
    _payload;

    _encodedFitsData;
    _img;

    constructor(url, localFile, callback, in_colorMap, in_tFunction, pvMin, pvMax){
		this.THETAX = Hploc.asin( (K - 1)/K );
		this.firstRun = true;
		
		this._colorMap = in_colorMap;
		this._tFunction = in_tFunction;
		
		if (url !== undefined && url != null){
			let fitsLoader = new FitsLoader(url, null, this);
		}else if (localFile !== undefined && localFile != null){
			let fitsLoader = new FitsLoader(null, localFile, this);	
		}
		

	}

    onFitsLoaded (fitsData) {
		this._encodedFitsData = fitsData;
		this._img = this.processFits(this._encodedFitsData);
		
		// this._inProjection = ProjectionFactory.getProjection(constants.PROJECTIONS.HEALPIX);
		// let nside = Math.pow(2, this._header.getValue('ORDER'));
		// this._inProjection.init(nside, this._header.getValue('NPIX'), this._header.getValue('NAXIS1'),this._header.getValue('NAXIS2'))

		// this._callback(this._img, this._payload._PVMIN, this._payload._PVMAX);
		
	}

    processFits (data) {

		let parseHeader = new ParseHeader(data);
        this._header = parseHeader.parse();

		this._fitsWidth = this._header.width;
		this._fitsHeight = this._header.height;
		let headerOffset = this._header.offset;

		this._payload = new ParsePayload(this._header, data, headerOffset, this._colorMap, this._tFunction);
		let image = this._payload.parse();
		return image;
	}

    changeTransferFunction(scaleFunction) {
		
		this._payload.applyScaleFunction(scaleFunction);
		this._img = this._payload.img;
		
	}
	
	changeColorMap(colorMap) {
		
		this._payload.changeColorMap(colorMap);
		this._img = this._payload.img;
		
	}
	
	changeInverse(inverse){
		
		this._payload.changeInverse(inverse);
		this._img = this._payload.img;
		
	}

}

export default FITSParser;