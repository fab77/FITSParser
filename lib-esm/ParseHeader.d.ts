import { FITSHeaderManager } from "./model/FITSHeaderManager.js";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
export declare class ParseHeader {
    static getFITSItemValue(header: FITSHeaderManager, key: string): number | null;
    static parse(rawdata: Uint8Array): FITSHeaderManager;
}
//# sourceMappingURL=ParseHeader.d.ts.map