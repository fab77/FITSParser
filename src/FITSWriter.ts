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
// import { Blob } from 'blob-polyfill';
import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
import { ParseUtils } from "./ParseUtils.js";
import { FITSHeader } from "./model/FITSHeader.js";
// import fs from 'node:fs/promises';

export class FITSWriter {
  _headerArray: Uint8Array;
  _payloadArray: Uint8Array[];
  _fitsData: Uint8Array;

  constructor() {
    this._headerArray = new Uint8Array();
    this._payloadArray = new Array<Uint8Array>();
    this._fitsData = new Uint8Array();
  }

  run(header: FITSHeader, rawdata: Uint8Array[]) {
    this.prepareHeader(header);
    this._payloadArray = rawdata;
    this.prepareFITS();
  }

  prepareHeader(headerDetails: FITSHeader) {
    const item = new FITSHeaderItem("END");
    headerDetails.addItem(item);

    let str = "";
    for (let i = 0; i < headerDetails.getItemList().length; i++) {
      const item: FITSHeaderItem = headerDetails.getItemList()[i];
      let s = this.formatHeaderLine(item);
      if (s !== undefined) {
        str += s;
      }
    }

    const strBytelen = new TextEncoder().encode(str).length;

    const nhdu = Math.ceil(strBytelen / 2880);
    const offset = nhdu * 2880;

    for (let j = 0; j < offset - strBytelen; j++) {
      str += " ";
    }

    const ab = new ArrayBuffer(str.length);
    // Javascript character occupies 2 16-bit -> reducing it to 1 byte
    this._headerArray = new Uint8Array(ab);
    for (let i = 0; i < str.length; i++) {
      this._headerArray[i] = ParseUtils.getByteAt(str, i);
    }
  }

  // formatHeaderLine(item: string | undefined, value: string | number, comment: string) {
  formatHeaderLine(item: FITSHeaderItem) {
    let str;
    let keyword = item.key;
    let value = item.value;
    let comment = item.comment;

    if (keyword !== null && keyword !== undefined) {
      str = keyword;

      if (keyword == "END") {
        for (let j = 80; j > keyword.length; j--) {
          str += " ";
        }
        return str;
      }

      if (keyword == "COMMENT" || keyword == "HISTORY") {
        for (let i = 0; i < 10 - keyword.length; i++) {
          str += " ";
        }
        str += value;
        const len = str.length;
        for (let j = 80; j > len; j--) {
          str += " ";
        }
        return str;
      }

      for (let i = 0; i < 8 - keyword.length; i++) {
        str += " ";
      }

      str += "= ";

      if (value !== null && value !== undefined) {
        // value
        str += value;
        if (comment !== null && comment !== undefined) {
          str += comment;
        }
        const len = str.length;
        for (let j = 80; j > len; j--) {
          str += " ";
        }
      } else {
        if (comment !== null && comment !== undefined) {
          str += comment;
        }
        const len = str.length;
        for (let j = 80; j > len; j--) {
          str += " ";
        }
      }
    } else {
      // keyword null
      str = "";
      for (let j = 0; j < 18; j++) {
        str += " ";
      }
      if (comment !== null && comment !== undefined) {
        str += comment;
        const len = str.length;
        for (let j = 80; j > len; j--) {
          str += " ";
        }
      } else {
        str = "";
        for (let j = 80; j > 0; j--) {
          str += " ";
        }
      }
    }
    return str;
  }

  prepareFITS() {
    const bytes = new Uint8Array(
      this._headerArray.length +
      this._payloadArray[0].length * this._payloadArray.length
    );

    bytes.set(this._headerArray, 0);
    for (let i = 0; i < this._payloadArray.length; i++) {
      const uint8 = this._payloadArray[i];
      bytes.set(uint8, this._headerArray.length + i * uint8.length);
    }

    this._fitsData = bytes;
  }

  // writeFITS(fileuri: string) {
  //   // const dirname = path.dirname(fileuri);
  //   // fs.mkdir(dirname, { recursive: true });
  //   fs.writeFile(fileuri, this._fitsData);
  //   // if (fs.existsSync(dirname)) {
  //   //   fs.writeFileSync(fileuri, this._fitsData);
  //   // } else {
  //   //   console.error(dirname + " doesn't exist");
  //   // }
  // }

  typedArrayToURL(): string {
    const b = new Blob([this._fitsData], { type: "application/fits" });
    // console.log(`<html><body><img src='${URL.createObjectURL(b)}'</body></html>`);
    return URL.createObjectURL(b);
  }
}
