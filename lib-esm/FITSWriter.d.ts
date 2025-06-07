import { FITSParsed } from "./model/FITSParsed.js";
export declare class FITSWriter {
    static createFITS(fitsParsed: FITSParsed): Uint8Array;
    private static createHeader;
    private static createData;
    static typedArrayToURL(fitsParsed: FITSParsed): string;
    static writeFITSFile(fitsParsed: FITSParsed, filePath: string): void;
}
//# sourceMappingURL=FITSWriter.d.ts.map