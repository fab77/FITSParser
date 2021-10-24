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

import ParseUtils from '../ParseUtils';

class FITSWriter {

    _headerArray;
    _payloadArray;
    _fitsData;

    constructor () {

    }

    run (headerDetails) {
        this.prepareHeader(headerDetails);
        this.preparePayload(headerDetails.data);
        this.prepareFITS();
    }

    prepareHeader (headerDetails) {
        
        // Gnomonic
        let str = this.formatHeaderLine("SIMPLE", "T");
        str += this.formatHeaderLine("BITPIX", headerDetails.bitpix);
        str += this.formatHeaderLine("NAXIS", 2);
        str += this.formatHeaderLine("NAXIS1", headerDetails.naxis1);
        str += this.formatHeaderLine("NAXIS2", headerDetails.naxis2);
        str += this.formatHeaderLine("BLANK", headerDetails.blank);
        str += this.formatHeaderLine("BSCALE", headerDetails.bscale);
        str += this.formatHeaderLine("BZERO", headerDetails.bzero);

        str += this.formatHeaderLine("CTYPE1", headerDetails.ctype1);
        str += this.formatHeaderLine("CTYPE2", headerDetails.ctype2);
        str += this.formatHeaderLine("CDELT1", headerDetails.cdelt1);
        str += this.formatHeaderLine("CDELT2", headerDetails.cdelt2);
        str += this.formatHeaderLine("CRPIX1", headerDetails.crpix1);
        str += this.formatHeaderLine("CRPIX2", headerDetails.crpix2);
        str += this.formatHeaderLine("CRVAL1", headerDetails.crval1);
        str += this.formatHeaderLine("CRVAL2", headerDetails.crval2);
        str += this.formatHeaderLine("WCSNAME", "Test Gnomonic");
        str += this.formatHeaderLine("ORIGIN", "FITSOnTheWeb v.0.x");
        str += this.formatHeaderLine("COMMENT", "FITSOnTheWebv0.x developed by F.Giordano and Y.Ascasibar");
        str += this.formatHeaderLine("END", "");

        let strBytelen = new TextEncoder().encode(str).length;
        
        for (let j = 0; j < 2880 - strBytelen; j++) {
            str += " ";
        }
        
        let ab = new ArrayBuffer(str.length);
        // Javascript character occupies 2 16-bit -> reducing them to 1 byte
        this._headerArray = new Uint8Array(ab);
        for (let i = 0; i <  str.length; i++) {
            this._headerArray[i] = ParseUtils.getByteAt(str, i);
        }
         
    }

    formatHeaderLine (keyword, value) {
        
        // SIMPLE must be the first keyword in the primary HDU
        // BITPIX must be the second keyword in the primary HDU
        // all rows 80 ASCII chars of 1 byte
        // bytes [0-8]   -> keyword
        // bytes [9-10] -> '= '
        // bytes [11-80] -> value:
        //      in case of number -> right justified to the 30th??? digit/position
        //      in case of string -> between '' and starting from byte 12
        let klen = keyword.length;
        let vlen;
        // keyword
        if (isNaN(value)){
            if (keyword == 'SIMPLE')  {
                value = value;
            }else{
                value = "'"+value+"'";
            }
            vlen = value.length;
        }else{
            vlen = value.toString().length;
        }
        
        let str = keyword;
        for (let i = 0; i < 8 - klen; i++) {
            str += ' ';
        }

        if (keyword !== 'END')  {
            // value
            str += "= ";
            str += value;
            for (let j = 80; j > 10 + vlen; j--) {
                str += ' ';
            }
        }
        
        return str;
    }

    preparePayload (arrayData) {

        this._payloadArray = new Array(arrayData.length * arrayData[0].length);
        // this._payloadArray = new Uint8Array(arrayData.buffer, 0, arrayData.byteLength);
        for (let i = 0; i < arrayData.length; i++) {
            for (let j = 0; j < arrayData[0].length; j++) {
                this._payloadArray.push(arrayData[i][j]);
            }    
        }
        // this._payloadArray = arrayData;
        
        // TODO TEST!!! Iterate over byte 2 by 2 and apply the 3's bit complement conversion:
        //  - first byte inverted ( invert all bits)
        //  - second byte inverted and added by 1 at the LSB
        // https://www.tutorialspoint.com/two-s-complement
        // Store the result in a buffer array Uint8 or directly in an arraybuffer of bytes and in the Blob at the end
        
    }

    prepareFITS () {
        // let bytes = new Int16Array(this._headerArray.byteLength + this._payloadArray.byteLength);
        // let bytes = new Int16Array(this._headerArray.byteLength);
        // bytes.set(this._headerArray, 0);
        // bytes.set(this._payloadArray, this._headerArray.byteLength);
        
        // this._fitsData = this._headerArray;

        console.debug("this._headerArray.byteLength "+this._headerArray.byteLength);
        console.debug("this._headerArray.length "+this._headerArray.length);
        let bytes = new Uint8Array(this._headerArray.length + this._payloadArray.length);
        // let bytes = new Int16Array(this._headerArray.length + this._payloadArray.length);

        bytes.set(this._headerArray, 0);
        bytes.set(this._payloadArray, this._headerArray.length);

        let test = new Uint16Array(bytes.buffer);

        // this._fitsData = test;
        this._fitsData = bytes;
    }

    typedArrayToURL() {
        // return URL.createObjectURL(new Blob([this._fitsData.buffer], {type: 'application/fits'}));
        let b = new Blob([this._fitsData], {type: 'application/fits'});
        return URL.createObjectURL(b);
        
    }

}

export default FITSWriter;