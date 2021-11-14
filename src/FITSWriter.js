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
import FITSHeaderItem from './FITSHeaderItem.js';
import ParseUtils from './ParseUtils.js';
import path from 'path';


class FITSWriter {

    _headerArray;
    _payloadArray;
    _fitsData;

    constructor () {

    }

    run (header, rawdata) {
        this.prepareHeader(header);
        this._payloadArray = rawdata;
        // this.preparePayload(rawdata);
        this.prepareFITS();
    }

    prepareHeader (headerDetails) {
        

        
        let item = new FITSHeaderItem("END", null, null);
		headerDetails.addItem(item);
        
        let str = '';
        for (let i =0; i < headerDetails.getItemList().length; i++) {
            let item = headerDetails.getItemList()[i];
            str += this.formatHeaderLine(item.key, item.value, item.comment);        
        }

        let strBytelen = new TextEncoder().encode(str).length;
        
        let nhdu = Math.ceil(strBytelen / 2880);
        let offset = nhdu * 2880;

        
        for (let j = 0; j < offset - strBytelen; j++) {
            str += " ";
        }
        
        let ab = new ArrayBuffer(str.length);
        // Javascript character occupies 2 16-bit -> reducing them to 1 byte
        this._headerArray = new Uint8Array(ab);
        for (let i = 0; i <  str.length; i++) {
            this._headerArray[i] = ParseUtils.getByteAt(str, i);
        }
        console.log(this._headerArray.byteLength);

    }

    formatHeaderLine (keyword, value, comment) {
        
        let str;
        
        if (keyword !== null && keyword !== undefined) {

            str = keyword;

            if (keyword == 'END') {
                for (let j = 80; j > keyword.length; j--) {
                    str += ' ';
                }
                console.log(str.length +" <- "+str);
                return str;
            }

            if (keyword == "COMMENT" || keyword == "HISTORY" ){
                for (let i = 0; i < 10 - keyword.length; i++) {
                    str += ' ';
                } 
                str += value;
                let len = str.length;
                for (let j = 80; j > len; j--) {
                    str += ' ';
                }
                console.log(str.length +" <- "+str);
                return str;
            }

            
            for (let i = 0; i < 8 - keyword.length; i++) {
                str += ' ';
            }

            str += "= ";

            if (value !== null && value !== undefined)  {
                // value    
                str += value;
                if (comment !== null && comment !== undefined) {
                    str += comment;
                }
                let len = str.length;
                for (let j = 80; j > len; j--) {
                    str += ' ';
                }
            } else {
                if (comment !== null && comment !== undefined) {
                    str += comment;
                }
                let len = str.length;
                for (let j = 80; j > len; j--) {
                    str += ' ';
                }
            }

        } else { // keyword null
            str ='';
            for (let j = 0; j < 18; j++) {
                str += ' ';
            }
            if (comment !== null && comment !== undefined) {
                str += comment;
                let len = str.length;
                for (let j = 80; j > len; j--) {
                    str += ' ';
                }
            } else {
                str = '';
                for (let j = 80; j > 0; j--) {
                    str += ' ';
                }
            }
        }

        
        console.log(str.length +" <- "+str);
        return str;
    }

    preparePayload (arrayData) {



        if (Array.isArray(arrayData[0])) {  // bidimensional input array
            
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
        
        // console.debug("this._headerArray.byteLength "+this._headerArray.byteLength);
        // console.debug("this._headerArray.length "+this._headerArray.length);

        let bytes = new Uint8Array(this._headerArray.length + this._payloadArray[0].length * this._payloadArray.length);
        
        bytes.set(this._headerArray, 0);
        for (let i = 0; i < this._payloadArray.length; i++) {
            let uint8 = this._payloadArray[i];
            bytes.set(uint8, this._headerArray.length + (i * uint8.length));
        }
        
        this._fitsData = bytes;
    }

    writeFITS (fileuri) {
        let dirname = path.dirname(fileuri);
        fs.mkdir(dirname, { recursive: true }, (err) => {
            if (err) throw err;
        });
        if (fs.existsSync(dirname)) {
            fs.writeFileSync(fileuri, this._fitsData);
        } else {
            console.error(dirname + " doesn't exist");
        }
        
    }

    typedArrayToURL() {
        // return URL.createObjectURL(new Blob([this._fitsData.buffer], {type: 'application/fits'}));
        let b = new Blob([this._fitsData], {type: 'application/fits'});
        return URL.createObjectURL(b);
        
    }

}

export default FITSWriter;