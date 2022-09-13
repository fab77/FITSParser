import { FITSHeaderItem } from "./FITSHeaderItem";

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

	constructor() {
		super();
		this._items = [];
	}

	set offset(offset) {
		this._offset = offset;
	}

	get offset() {
		return this._offset;
	}

	getItemList() {
		return this._items;
	}

	getItemListOf(key: string) {
		const res = [];
		for (let i = 0; i < this._items.length; i++) {
			const item = this._items[i];
			if (item.key == key) {
				res.push(item);
			}
		}
		return res;
	}

	addItemAtTheBeginning(item: FITSHeaderItem) {
		if (["SIMPLE", "BITPIX", "NAXIS", "NAXIS1", "NAXIS2", "BLANK", "BZERO",
			"BSCALE", "DATAMIN", "DATAMAX", "NPIX", "ORDER", "CRPIX1", "CRPIX2",
			"CDELT1", "CDELT2"].includes(item.key)) {
			this.set(item.key, item.value);
		}
		const newitemlist = [item].concat(this._items);
		this._items = newitemlist;
	}
	addItem(item: FITSHeaderItem) {

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
