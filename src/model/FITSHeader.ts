import {FITSHeaderItem} from "./FITSHeaderItem";

/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

// reference FTIS standard doc https://heasarc.gsfc.nasa.gov/docs/fcg/standard_dict.html

export class FITSHeader extends Map {
	
	_offset: number;
	_items: FITSHeaderItem[];

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
	
	getItemListOf(key: string) {
		let res = [];
		for (let i = 0; i < this._items.length; i++) {
			let item = this._items[i];
			if (item.key == key){
				res.push(item);
			}
		}
		return res;
	}

	addItemAtTheBeginning(item: FITSHeaderItem){
		if (["SIMPLE", "BITPIX", "NAXIS", "NAXIS1", "NAXIS2", "BLANK", "BZERO",
			"BSCALE", "DATAMIN", "DATAMAX", "NPIX", "ORDER", "CRPIX1", "CRPIX2", 
			"CDELT1", "CDELT2"].includes(item.key)) {
			this.set(item.key, item.value);
		}
		let newitemlist = [item].concat(this._items);
		this._items = newitemlist;
	}
	addItem (item: FITSHeaderItem) {

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
	
	
}
