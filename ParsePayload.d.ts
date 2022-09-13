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
    _BITPIX: number;
    _NAXIS1: number;
    _NAXIS2: number;
    _DATAMIN: number;
    _DATAMAX: number;
    _physicalblank: number | undefined;
    constructor(fitsheader: FITSHeader, rawdata: Uint8Array);
    init(fitsheader: FITSHeader): void;
    computePhysicalMinAndMax(): [number, number];
    parse(): Array<Uint8Array>;
    /** this can be deleted */
    extractPixelValue(offset: number): number;
    pixel2physicalValue(pxval: number): number | undefined;
}
//# sourceMappingURL=ParsePayload.d.ts.map