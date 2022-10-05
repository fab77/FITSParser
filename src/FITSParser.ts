/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

import { FITSWriter } from "./FITSWriter.js";
import { ParsePayload } from "./ParsePayload.js";
import { ParseHeader } from "./ParseHeader.js";
import { FITSHeader } from "./model/FITSHeader.js";
import { FITSParsed } from "./model/FITSParsed.js";
import fetch from 'cross-fetch';
// import { readFile } from "node:fs/promises";
// import fetch from "node-fetch";

export class FITSParser {
  _url: string;

  constructor(url: string) {
    this._url = url;
  }

  async loadFITS(): Promise<FITSParsed | null> {
    return this.getFile(this._url)
      .then((rawdata) => {
        if (rawdata !== null) {
          const uint8 = new Uint8Array(rawdata);
          const fits = this.processFits(uint8);
          return fits;
        }
        return null;
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          throw new Error(
            "[FITSParser->loadFITS] " + error.response.data.message
          );
        }
        throw error;
      });
  }

  processFits(rawdata: Uint8Array): FITSParsed {
    const header: FITSHeader = ParseHeader.parse(rawdata);

    const payloadParser = new ParsePayload(header, rawdata);
    const pixelvalues = payloadParser.parse();
    // if (rawdata.length > (header.getNumRows() + (pixelvalues.length * pixelvalues[0].length))) {
    // let leftover = rawdata.length - (header.getNumRows() + (pixelvalues.length * pixelvalues[0].length));
    // 	throw new Error("[FITSParser->processFits] It seems that there's at least one more HDU since there are " + leftover + " bytes not processed.");
    // 	console.warn("It seems that there's at least one more HDU since there are " + leftover + " bytes not processed.")
    // }
    return {
      header: header,
      data: pixelvalues,
    };
  }

  // static writeFITS(header: FITSHeader, rawdata: Uint8Array[], fileuri: string) {
  //   const writer = new FITSWriter();
  //   writer.run(header, rawdata);
  //   writer.writeFITS(fileuri);
  // }

  static generateFITS(header: FITSHeader, rawdata: Uint8Array[]) {
    const writer = new FITSWriter();
    writer.run(header, rawdata);
    return writer.typedArrayToURL();
  }

  async getFile(uri: string): Promise<ArrayBuffer> {

    // if (!uri.substring(0, 5).toLowerCase().includes("http")) {
    //   const promise = await fs.readFile(uri);
    //   return promise;
    // } else {
    const response = await fetch(uri);
    if (!response.ok) {
      return new ArrayBuffer(0);
    } else {
      return response.arrayBuffer();
    }
    // }

  }
}
