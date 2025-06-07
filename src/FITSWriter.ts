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
import { FITSHeaderManager } from "./model/FITSHeaderManager.js";
import { FITSParsed } from "./model/FITSParsed.js"
// import { FITSHeader } from "./model/FITSHeader.js"
import * as fs from 'fs';


export class FITSWriter {

  static createFITS(fitsParsed: FITSParsed): Uint8Array {
    const headerBytes = this.createHeader(fitsParsed.header);
    const dataBytes = this.createData(fitsParsed.data);
    
    // Concatenate header and data to form a complete FITS file
    const fitsFile = new Uint8Array(headerBytes.length + dataBytes.length);
    fitsFile.set(headerBytes, 0);
    fitsFile.set(dataBytes, headerBytes.length);

    return fitsFile;
  }

  private static createHeader(header: FITSHeaderManager): Uint8Array {
    let headerString = "";

    // Convert header items to FITS 80-character records
    for (const item of header.getItems()) {
      if (item.key === "END") continue;

      const key = item.key ? item.key.padEnd(8, " ") : "        ";
      const value = item.value !== undefined ? `= ${item.value}` : "";
      const comment = item.comment ? ` / ${item.comment}` : "";
      let record = `${key}${value}${comment}`.padEnd(80, " ");
      headerString += record;
    }

    // End header with "END" record and pad to 2880-byte multiple
    headerString += "END".padEnd(80, " ");
    while (headerString.length % 2880 !== 0) {
      headerString += " ";
    }

    return new TextEncoder().encode(headerString);
  }

  private static createData(data: Array<Uint8Array>): Uint8Array {
    // Concatenate all data rows into a single Uint8Array
    let totalLength = data.reduce((sum, row) => sum + row.length, 0);
    let dataBytes = new Uint8Array(totalLength);
    
    // let offset = 0;
    // for (let row of data) {
    //   dataBytes.set(row, offset);
    //   offset += row.length;
    // }

    // // Ensure data section is a multiple of 2880 bytes
    // let paddingSize = (2880 - (dataBytes.length % 2880)) % 2880;
    // if (paddingSize > 0) {
    //   let paddedData = new Uint8Array(dataBytes.length + paddingSize);
    //   paddedData.set(dataBytes);
    //   return paddedData;
    // }

    return dataBytes;
  }

  static typedArrayToURL(fitsParsed: FITSParsed): string {
    const fitsFile = this.createFITS(fitsParsed);
    const blob = new Blob([fitsFile], { type: "application/fits" });
    // console.log(`<html><body><img src='${URL.createObjectURL(b)}'</body></html>`);
    const url = URL.createObjectURL(blob);
    console.log(`Generated FITS file URL: ${url}`);
    const revokeTimeout_sec = 10
    setTimeout(() => url, revokeTimeout_sec * 1000);
    console.log(`Generated FITS will be available for ${revokeTimeout_sec} seconds: ${url}`);
    return url;
  }

  static writeFITSFile(fitsParsed: FITSParsed, filePath: string): void {
    const fitsFile = this.createFITS(fitsParsed);

    try {
      fs.writeFileSync(filePath, fitsFile);
      console.log(`FITS file written successfully to: ${filePath}`);
    } catch (error) {
      console.error(`Error writing FITS file: ${error}`);
    }
  }

}

// const fitsParsed: FITSParsed = {
//   header: new FITSHeader(),
//   data: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]
// };

// // Specify the file path
// const filePath = "/Users/fabriziogiordano/Desktop/PhD/code/new/FITSParser/output.fits";

// // Write the FITS file to the filesystem
// FITSWriter.writeFITSFile(fitsParsed, filePath);