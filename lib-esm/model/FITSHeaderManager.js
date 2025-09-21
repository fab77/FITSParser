import { FITSHeaderItem } from "./FITSHeaderItem.js";
export class FITSHeaderManager {
    static SIMPLE = "SIMPLE";
    static BITPIX = "BITPIX";
    static BZERO = "BZERO";
    static BSCALE = "BSCALE";
    static BLANK = "BLANK";
    static NAXIS = "NAXIS";
    static NAXIS1 = "NAXIS1";
    static NAXIS2 = "NAXIS2";
    static DATAMIN = "DATAMIN";
    static DATAMAX = "DATAMAX";
    static CRVAL1 = "CRVAL1";
    static CRVAL2 = "CRVAL2";
    static CTYPE1 = "CTYPE1";
    static CTYPE2 = "CTYPE2";
    static CRPIX1 = "CRPIX1";
    static CRPIX2 = "CRPIX2";
    static ORIGIN = "ORIGIN";
    static COMMENT = "COMMENT";
    items = [];
    constructor() {
        this.items[0] = new FITSHeaderItem(FITSHeaderManager.SIMPLE, 'T', '');
        this.items[1] = new FITSHeaderItem(FITSHeaderManager.BITPIX, '', '');
        this.items[2] = new FITSHeaderItem(FITSHeaderManager.NAXIS, 2, '');
        this.items[3] = new FITSHeaderItem(FITSHeaderManager.NAXIS1, '', '');
        this.items[4] = new FITSHeaderItem(FITSHeaderManager.NAXIS2, '', '');
    }
    // insert(item: FITSHeaderItem, position?: number): void {
    insert(item) {
        if (item.key === FITSHeaderManager.SIMPLE) {
            // this.items.splice(0, 0, item);
            this.items[0] = item;
        }
        else if (item.key === FITSHeaderManager.BITPIX) {
            // this.items.splice(1, 0, item);
            this.items[1] = item;
        }
        else if (item.key === FITSHeaderManager.NAXIS) {
            // this.items.splice(2, 0, item);
            this.items[2] = item;
        }
        else if (item.key === FITSHeaderManager.NAXIS1) {
            // this.items.splice(3, 0, item);
            this.items[3] = item;
        }
        else if (item.key === FITSHeaderManager.NAXIS2) {
            // this.items.splice(4, 0, item);
            this.items[4] = item;
        }
        else {
            this.items.push(item);
        }
        // if (position !== undefined && position >= 0 && position <= this.items.length) {
        //     this.items.splice(position, 0, item);
        // } else {
        //     this.items.push(item);
        // }
    }
    getItems() {
        return this.items;
    }
    remove(key) {
        this.items = this.items.filter(item => item.key !== key);
    }
    findById(key) {
        const item = this.items.find(item => item.key === key);
        if (!item) {
            return null;
        }
        return item;
    }
}
//# sourceMappingURL=FITSHeaderManager.js.map