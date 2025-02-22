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
    static computePhysicalMinAndMax(header: FITSHeader, rawData: Uint8Array): FITSHeader;
    static computePhysicalValues(rawData: Uint8Array, header: FITSHeader): [number | undefined, number | undefined];
    static pixel2physicalValue(pxval: number, BSCALE: number, BZERO: number): number;
    static extractPixelValue(rawData: Uint8Array, offset: number, BITPIX: number): number | undefined;
}
//# sourceMappingURL=ParsePayload.d.ts.map