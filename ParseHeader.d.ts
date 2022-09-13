import { FITSHeader } from "./model/FITSHeader";
import { FITSHeaderLine } from "./model/FITSHeaderLine";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
export declare class ParseHeader {
    static parse(rawdata: Uint8Array): FITSHeader;
    static parseStringValue(u8buffer: Uint8Array): FITSHeaderLine;
    static parseLogicalValue(u8buffer: Uint8Array): FITSHeaderLine;
    static parseIntValue(u8buffer: Uint8Array): FITSHeaderLine;
    static parseFloatValue(u8buffer: Uint8Array): FITSHeaderLine;
}
//# sourceMappingURL=ParseHeader.d.ts.map