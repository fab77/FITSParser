import { FITSHeaderManager } from "./model/FITSHeaderManager.js";
export declare class ParsePayload {
    static computePhysicalMinAndMax(header: FITSHeaderManager, rawData: Uint8Array): FITSHeaderManager | null;
    static computePhysicalValues(rawData: Uint8Array, header: FITSHeaderManager): [number | null, number | null];
    static pixel2physicalValue(pxval: number, BSCALE: number, BZERO: number): number;
    static extractPixelValue(rawData: Uint8Array, offset: number, BITPIX: number): number | null;
}
//# sourceMappingURL=ParsePayload.d.ts.map