import { FITSHeaderItem } from "./FITSHeaderItem.js";
export class FITSHeaderManager {
    constructor() {
        this.items = [];
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
FITSHeaderManager.SIMPLE = "SIMPLE";
FITSHeaderManager.BITPIX = "BITPIX";
FITSHeaderManager.BZERO = "BZERO";
FITSHeaderManager.BSCALE = "BSCALE";
FITSHeaderManager.BLANK = "BLANK";
FITSHeaderManager.NAXIS = "NAXIS";
FITSHeaderManager.NAXIS1 = "NAXIS1";
FITSHeaderManager.NAXIS2 = "NAXIS2";
FITSHeaderManager.DATAMIN = "DATAMIN";
FITSHeaderManager.DATAMAX = "DATAMAX";
FITSHeaderManager.CRVAL1 = "CRVAL1";
FITSHeaderManager.CRVAL2 = "CRVAL2";
FITSHeaderManager.CTYPE1 = "CTYPE1";
FITSHeaderManager.CTYPE2 = "CTYPE2";
FITSHeaderManager.CRPIX1 = "CRPIX1";
FITSHeaderManager.CRPIX2 = "CRPIX2";
FITSHeaderManager.ORIGIN = "ORIGIN";
FITSHeaderManager.COMMENT = "COMMENT";
//# sourceMappingURL=FITSHeaderManager.js.map