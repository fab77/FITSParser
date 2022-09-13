/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
import { FITSHeader } from "./model/FITSHeader";
import { FITSParsed } from "./model/FITSParsed";
export declare class FITSParser {
    _url: string;
    constructor(url: string);
    loadFITS(): Promise<FITSParsed>;
    processFits(rawdata: Uint8Array): FITSParsed;
    static writeFITS(header: FITSHeader, rawdata: Uint8Array[], fileuri: string): void;
    getFile(uri: string): Promise<ArrayBuffer>;
}
//# sourceMappingURL=FITSParser.d.ts.map