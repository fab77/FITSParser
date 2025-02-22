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
import { FITSParsed } from "./model/FITSParsed.js";
export declare class FITSWriter {
    static createFITS(fitsParsed: FITSParsed): Uint8Array;
    private static createHeader;
    private static createData;
    static typedArrayToURL(fitsParsed: FITSParsed): string;
    static writeFITSFile(fitsParsed: FITSParsed, filePath: string): void;
}
//# sourceMappingURL=FITSWriter.d.ts.map