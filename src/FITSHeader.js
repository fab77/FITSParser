"use strict";

import FITSHeaderItem from "./FITSHeaderItem.js";

/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

// reference FTIS standard doc https://heasarc.gsfc.nasa.gov/docs/fcg/standard_dict.html

class FITSHeader extends Map {
	
	_offset;

	constructor(){
		super();
		// this.set("BZERO", 0);
		// this.set("BSCALE", 1);
		/* BLANK: The value field shall contain an integer that
		 * specifies the representation of ARRAY values whose physical values are
		 * undefined. 
		 */
		// this.set("BLANK", undefined);
		// this._offset = 2880;
		// if (offset) {
		// 	this._offset = offset;
		// }
		this._items = [];
		
	}

	set offset(offset){
		this._offset = offset;
	}
	
	get offset() {
		return this._offset;
	}

	getItemList() { 
		return this._items;
	}
	
	getItemListOf(key) {
		let res = [];
		for (let i = 0; i < this._items.length; i++) {
			let item = this._items[i];
			if (item.key == key){
				res.push(item);
			}
		}
		return res;
	}

	addItemAtTheBeginning(item){
		if (["SIMPLE", "BITPIX", "NAXIS", "NAXIS1", "NAXIS2", "BLANK", "BZERO",
			"BSCALE", "DATAMIN", "DATAMAX", "NPIX", "ORDER", "CRPIX1", "CRPIX2", 
			"CDELT1", "CDELT2"].includes(item.key)) {
			this.set(item.key, item.value);
		}
		let newitemlist = [item].concat(this._items);
		this._items = newitemlist;
	}
	addItem (item) {

		if (["SIMPLE", "BITPIX", "NAXIS", "NAXIS1", "NAXIS2", "BLANK", "BZERO",
			"BSCALE", "DATAMIN", "DATAMAX", "NPIX", "ORDER", "CRPIX1", "CRPIX2", 
			"CDELT1", "CDELT2"].includes(item.key)) {
			this.set(item.key, item.value);
		}
		this._items.push(item);
	}


	getNumRows() {
		return this._items.length;
	}
	
	getValue(key){
		return this._keyValues.get(key);
	}

	get width () {
		return this._width;
	}

	get height () {
		return this._height;
	}

	// getNaxis() {
	// 	return this.get("NAXIS");
	// }
	// setNaxis(val) {
	// 	return this.set("NAXIS", val);
	// }

	// getNaxis1(){
	// 	return this.get("NAXIS1");
	// }
	// setNaxis1(val) {
	// 	return this.set("NAXIS1", val);
	// }

	// getNaxis2(){
	// 	return this.get("NAXIS2");
	// }
	// setNaxis2(val) {
	// 	return this.set("NAXIS2", val);
	// }

	// getSimple(){
	// 	return this.get("SIMPLE");
	// }
	// setSimple(val) {
	// 	return this.set("SIMPLE", val);
	// }

	// getBlank(){
	// 	return this.get("BLANK");
	// }
	// setBlank(val) {
	// 	return this.set("BLANK", val);
	// }

	// getBscale(){
	// 	return this.get("BSCALE");
	// }
	// setBscale(val) {
	// 	return this.set("BSCALE", val);
	// }

	// getBzero(){
	// 	return this.get("BZERO");
	// }
	// setBzero(val) {
	// 	return this.set("BZERO", val);
	// }

	// getBitpix(){
	// 	return this.get("BITPIX");
	// }
	// setBitpix(val) {
	// 	return this.set("BITPIX", val);
	// }

	// getDatamin(){
	// 	return this.get("DATAMIN");
	// }
	// setDatamin(val) {
	// 	return this.set("DATAMIN", val);
	// }

	// getDatamax(){
	// 	return this.get("DATAMAX");
	// }
	// setDatamax(val) {
	// 	return this.set("DATAMAX", val);
	// }

	

	// /**
	//  * @param {number} offset
	//  */
	// set offset (offset) {
	// 	this._offset = offset;
	// }

	// get offset () {
	// 	return this._offset;
	// }
	
}

export default FITSHeader;