import { FITSHeaderItem } from "./FITSHeaderItem.js";


export class FITSHeaderManager {

    private items: FITSHeaderItem[] = []

    insert(item: FITSHeaderItem, position?: number): void {
        if (item.key === "SIMPLE") {
            this.items.splice(0, 0, item);
        } else if (item.key === "BITPIX") {
            this.items.splice(1, 0, item);
        } else if (item.key === "NAXIS") {
            this.items.splice(2, 0, item);
        } else if (item.key === "NAXIS1") {
            this.items.splice(3, 0, item);
        } else if (item.key === "NAXIS2") {
            this.items.splice(4, 0, item);
        } 
        if (position !== undefined && position >= 0 && position <= this.items.length) {
            this.items.splice(position, 0, item);
        } else {
            this.items.push(item);
        }
    }

    getItems(): FITSHeaderItem[] {
        return this.items;
    }

    remove(key: string): void {
        this.items = this.items.filter(item => item.key !== key);
    }

    findById(key: string): FITSHeaderItem | null {
        const item = this.items.find(item => item.key === key);
        if (!item) {
            return null
        }
        return item
    }


}