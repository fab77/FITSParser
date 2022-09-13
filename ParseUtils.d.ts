/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
export declare class ParseUtils {
    static getStringAt(data: string, offset: number, length: number): string;
    static byteString(n: number): string;
    static parse32bitSinglePrecisionFloatingPoint(byte1: number, byte2: number, byte3: number, byte4: number): number;
    static convertBlankToBytes(blank: number, nbytes: number): Uint8Array;
    /** https://gist.github.com/Manouchehri/f4b41c8272db2d6423fa987e844dd9ac */
    static parseFloatingPointFormat(bytes: Uint8Array, ebits: number, fbits: number): number;
    static generate16bit2sComplement(val: number): number;
    static parse16bit2sComplement(byte1: number, byte2: number): number;
    static parse32bit2sComplement(byte1: number, byte2: number, byte3: number, byte4: number): number;
    /**
     *
     * @param {*} data string?
     * @param {*} offset offset in the data
     * @returns returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.
     */
    static getByteAt(data: string, offset: number): number;
    static extractPixelValue(offset: number, bytes: Uint8Array, bitpix: number): number;
}
//# sourceMappingURL=ParseUtils.d.ts.map