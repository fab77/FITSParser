import { FITSHeaderItem } from "./FITSHeaderItem.js";
export declare class FITSHeaderManager {
    static SIMPLE: string;
    static BITPIX: string;
    static BZERO: string;
    static BSCALE: string;
    static BLANK: string;
    static NAXIS: string;
    static NAXIS1: string;
    static NAXIS2: string;
    static DATAMIN: string;
    static DATAMAX: string;
    static CRVAL1: string;
    static CRVAL2: string;
    static CTYPE1: string;
    static CTYPE2: string;
    static CRPIX1: string;
    static CRPIX2: string;
    static ORIGIN: string;
    static COMMENT: string;
    private items;
    constructor();
    insert(item: FITSHeaderItem): void;
    getItems(): FITSHeaderItem[];
    remove(key: string): void;
    findById(key: string): FITSHeaderItem | null;
}
//# sourceMappingURL=FITSHeaderManager.d.ts.map