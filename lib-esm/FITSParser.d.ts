/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
import { FITSHeader } from "./model/FITSHeader.js";
import { FITSParsed } from "./model/FITSParsed.js";
export declare class FITSParser {
    _url: string;
    constructor(url: string);
    loadFITS(): Promise<FITSParsed | null>;
    processFits(rawdata: Uint8Array): FITSParsed;
    static generateFITS(header: FITSHeader, rawdata: Uint8Array[]): string;
    getFile(uri: string): Promise<ArrayBuffer>;
}
//# sourceMappingURL=FITSParser.d.ts.map