/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
import { FITSParsed } from "./model/FITSParsed.js";
export declare class FITSParser {
    static loadFITS(url: string): Promise<FITSParsed | null>;
    private static processFits;
    private static createMatrix;
    static generateFITSForWeb(fitsParsed: FITSParsed): string;
    static saveFITSLocally(fitsParsed: FITSParsed, path: string): void;
    private static getFile;
}
//# sourceMappingURL=FITSParser.d.ts.map