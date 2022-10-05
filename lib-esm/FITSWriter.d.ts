import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
import { FITSHeader } from "./model/FITSHeader.js";
export declare class FITSWriter {
    _headerArray: Uint8Array;
    _payloadArray: Uint8Array[];
    _fitsData: Uint8Array;
    constructor();
    run(header: FITSHeader, rawdata: Uint8Array[]): void;
    prepareHeader(headerDetails: FITSHeader): void;
    formatHeaderLine(item: FITSHeaderItem): any;
    prepareFITS(): void;
    typedArrayToURL(): string;
}
//# sourceMappingURL=FITSWriter.d.ts.map