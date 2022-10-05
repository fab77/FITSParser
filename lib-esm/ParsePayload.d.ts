/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
import { FITSHeader } from "./model/FITSHeader.js";
export declare class ParsePayload {
    _u8data: Uint8Array;
    _BZERO: number | undefined;
    _BSCALE: number | undefined;
    _BLANK: number | undefined;
    _BITPIX: number | undefined;
    _NAXIS1: number | undefined;
    _NAXIS2: number | undefined;
    _DATAMIN: number | undefined;
    _DATAMAX: number | undefined;
    _physicalblank: number | undefined;
    constructor(fitsheader: FITSHeader, rawdata: Uint8Array);
    init(fitsheader: FITSHeader): void;
    computePhysicalMinAndMax(): [number | undefined, number | undefined];
    parse(): Array<Uint8Array>;
    /** this can be deleted */
    extractPixelValue(offset: number): number | undefined;
    pixel2physicalValue(pxval: number): number;
}
//# sourceMappingURL=ParsePayload.d.ts.map