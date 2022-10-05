import { FITSHeaderItem } from "./FITSHeaderItem.js";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
export declare class FITSHeader extends Map {
    _offset: number | undefined;
    _items: FITSHeaderItem[];
    constructor();
    set offset(offset: number);
    get offset(): number;
    getItemList(): FITSHeaderItem[];
    getItemListOf(key: string): any[];
    addItemAtTheBeginning(item: FITSHeaderItem): void;
    addItem(item: FITSHeaderItem): void;
    getNumRows(): number;
}
//# sourceMappingURL=FITSHeader.d.ts.map