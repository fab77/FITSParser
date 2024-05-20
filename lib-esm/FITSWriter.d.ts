/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/fitsontheweb
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 * import GnomonicProjection from './GnomonicProjection';
 * BITPIX definition from https://archive.stsci.edu/fits/fits_standard/node39.html
 * and "Definition of the Flexible Image Transport System (FITS)" standard document
 * defined by FITS Working Group from the International Astronomical Union
 * http://fits.gsfc.nasa.gov/iaufwg/
 * 8	8-bit Character or unsigned binary integer
 * 16	16-bit twos-complement binary integer
 * 32	32-bit twos-complement binary integer
 * -32	32-bit IEEE single precision floating point
 * -64	64-bit IEEE double precision floating point
 *
 */
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