/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

 import {FITSWriter} from "./FITSWriter";
 import {ParsePayload} from "./ParsePayload";
 import {ParseHeader} from "./ParseHeader";
 import { FITSHeader } from "./model/FITSHeader";
 import { FITSParsed } from "./model/FITSParsed";
 
 
 
 export class FITSParser {
 
	 #url: string;
 
	 constructor(url: string) {
		 this.#url = url;
 
	 }
 
	 async loadFITS(): Promise<FITSParsed> {
		 try {
			 const rawdata = await this.getFile(this.#url);
			 if (rawdata !== undefined) {
				 const fits = this.processFits(rawdata);
				 return fits;
			 }
			 console.log("rawdata "+rawdata);
			 
		 } catch (err) {
			 console.log("[FITSParser] " + err);
		 }
	 }
 
	 processFits(rawdata: Uint8Array): FITSParsed {
 
		 let header: FITSHeader = ParseHeader.parse(rawdata);
 
		 let payloadParser = new ParsePayload(header, rawdata);
		 let pixelvalues = payloadParser.parse();
		 if (rawdata.length > (header.getNumRows() + (pixelvalues.length * pixelvalues[0].length))) {
			 let leftover = rawdata.length - (header.getNumRows() + (pixelvalues.length * pixelvalues[0].length));
			 console.warn("It seems that there's at least one more HDU since there are "+leftover+" bytes not processed.")
		 }
		 return {
			 "header": header,
			 "data": pixelvalues
		 };
 
	 }
 
	 static writeFITS(header, rawdata, fileuri) {
		 console.log("Writing FITS");
		 let writer = new FITSWriter();
		 writer.run(header, rawdata);
		 writer.writeFITS(fileuri);
	 }
 
 
 
 
 
	 async getFile(uri: string): Promise<any> {
		 if (uri.substring(0, 5).toLowerCase().includes("http")) {
			 let data = await window.fetch(uri, {
				 method: 'GET',
				 mode: 'cors',
				 headers: {
					 'Accept': 'image/fits',
					 'Content-Type': 'image/fits',
					 'Access-Control-Allow-Origin': '*'
				 }
			 }).then(res => {
					 if (!res.ok) {
						 throw new Error("File not loaded. HTTP error: " + res.status + " " + res.statusText);
					 } else {
						 return res.arrayBuffer();
					 }
 
				 }).catch(function (err) {
					 console.log("[FitsLoader2] " + err);
				 });
			 return data;
		 }
	 }
 
 }
 
 