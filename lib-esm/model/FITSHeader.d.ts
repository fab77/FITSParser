import { FITSHeaderItem } from "./FITSHeaderItem.js";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
export declare class FITSHeader extends Map<string, any> {
    _offset: number | undefined;
    _items: FITSHeaderItem[];
    constructor();
    set offset(offset: number | undefined);
    get offset(): number | undefined;
    getItemList(): FITSHeaderItem[];
    getItemListOf(key: string): FITSHeaderItem[];
    addItemAtTheBeginning(item: FITSHeaderItem): void;
    addItem(item: FITSHeaderItem): void;
    getNumRows(): number;
}
//# sourceMappingURL=FITSHeader.d.ts.map