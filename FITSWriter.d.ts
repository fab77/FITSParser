import { FITSHeader } from "./model/FITSHeader";
export declare class FITSWriter {
    _headerArray: Uint8Array;
    _payloadArray: Uint8Array[];
    _fitsData: Uint8Array;
    run(header: FITSHeader, rawdata: Uint8Array[]): void;
    prepareHeader(headerDetails: FITSHeader): void;
    formatHeaderLine(keyword: string, value: string | number, comment: string): string;
    prepareFITS(): void;
    writeFITS(fileuri: string): void;
    typedArrayToURL(): string;
}
//# sourceMappingURL=FITSWriter.d.ts.map