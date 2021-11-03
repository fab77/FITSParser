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
// import { Blob } from 'buffer';
import fs from 'fs';
import ParseUtils from './ParseUtils.js';

class FITSWriter {

    _headerArray;
    _payloadArray;
    _fitsData;

    constructor () {

    }

    run (header, rawdata) {
        this.prepareHeader(header);
        this.preparePayload(rawdata);
        this.prepareFITS();
    }

    prepareHeader (headerDetails) {
        
        // Gnomonic
        let str = this.formatHeaderLine("SIMPLE", "T");
        str += this.formatHeaderLine("BITPIX", headerDetails.get("BITPIX"));
        str += this.formatHeaderLine("NAXIS", 2);
        str += this.formatHeaderLine("NAXIS1", headerDetails.get("NAXIS1"));
        str += this.formatHeaderLine("NAXIS2", headerDetails.get("NAXIS2"));
        str += this.formatHeaderLine("BLANK", headerDetails.get("BLANK"));
        str += this.formatHeaderLine("BSCALE", headerDetails.get("BSCALE"));
        str += this.formatHeaderLine("BZERO", headerDetails.get("BZERO"));

        str += this.formatHeaderLine("DATAMIN", headerDetails.get("DATAMIN"));
        str += this.formatHeaderLine("DATAMAX", headerDetails.get("DATAMAX"));

        str += this.formatHeaderLine("CTYPE1", headerDetails.get("CTYPE1"));
        str += this.formatHeaderLine("CTYPE2", headerDetails.get("CTYPE2"));
        str += this.formatHeaderLine("CDELT1", headerDetails.get("CDELT1"));
        str += this.formatHeaderLine("CDELT2", headerDetails.get("CDELT2"));
        str += this.formatHeaderLine("CRPIX1", headerDetails.get("CRPIX1"));
        str += this.formatHeaderLine("CRPIX2", headerDetails.get("CRPIX2"));
        str += this.formatHeaderLine("CRVAL1", headerDetails.get("CRVAL1"));
        str += this.formatHeaderLine("CRVAL2", headerDetails.get("CRVAL2"));
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



        if (Array.isArray(arrayData[0])) {  // bidimensional input array
            
            // let idx = 0;
            // let flatarray = [];
            // this._payloadArray = new Array(arrayData.length * arrayData[0].length);
            
            // for (let i = 0; i < arrayData.length; i++) {
            //     for (let j = 0; j < arrayData[0].length; j++) {
            //         this._payloadArray[idx] = arrayData[i][j];
            //         idx++;
            //     }    
            // }
            // NEVER CALLED?!?
            let pippo = new Array(arrayData.flat());

            const buffer = new ArrayBuffer(pippo[0].length);
            const uint8 = new Uint8Array(buffer);
            // uint8.set(pippo[0]);
            uint8.from(pippo[0]);
            this._payloadArray = uint8;
            console.log(this._payloadArray);
            // console.log("aa");
        } else {    // unimensional input array
            this._payloadArray = arrayData;
        }

        
        // this._payloadArray = arrayData;
        
        // TODO TEST!!! Iterate over byte 2 by 2 and apply the 3's bit complement conversion:
        //  - first byte inverted ( invert all bits)
        //  - second byte inverted and added by 1 at the LSB
        // https://www.tutorialspoint.com/two-s-complement
        // Store the result in a buffer array Uint8 or directly in an arraybuffer of bytes and in the Blob at the end
        
    }

    prepareFITS () {
        
        console.debug("this._headerArray.byteLength "+this._headerArray.byteLength);
        console.debug("this._headerArray.length "+this._headerArray.length);

        // let bytes = new Uint8Array(this._headerArray.length + this._payloadArray.length);
        let bytes = new Uint8Array(this._headerArray.length + this._payloadArray[0].length * this._payloadArray.length);
        
        // bytes.set(this._payloadArray, this._headerArray.length);
        bytes.set(this._headerArray, 0);
        for (let i = 0; i < this._payloadArray.length; i++) {
            // if (i == 511) {
            //     console.log(i);
            // }
            let uint8 = this._payloadArray[i];
            bytes.set(uint8, this._headerArray.length + (i * uint8.length));
        }
        
        this._fitsData = bytes;
    }

    writeFITS () {
        fs.writeFileSync('./test-'+Date.now()+'.fits', this._fitsData);
    }

    typedArrayToURL() {
        // return URL.createObjectURL(new Blob([this._fitsData.buffer], {type: 'application/fits'}));
        let b = new Blob([this._fitsData], {type: 'application/fits'});
        return URL.createObjectURL(b);
        
    }

}

export default FITSWriter;