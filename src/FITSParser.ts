/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

import { FITSWriter } from "./FITSWriter";
import { ParsePayload } from "./ParsePayload";
import { ParseHeader } from "./ParseHeader";
import { FITSHeader } from "./model/FITSHeader";
import { FITSParsed } from "./model/FITSParsed";
import { readFile } from 'fs/promises';
import fetch from "node-fetch";


export class FITSParser {

	_url: string;

	constructor(url: string) {
		this._url = url;

	}

	async loadFITS(): Promise<FITSParsed> {

		return this.getFile(this._url).then((rawdata) => {
			if (rawdata !== null) {
				const fits = this.processFits(rawdata);
				return fits;
			}
			return null;
		}).catch((error) => {
			if (error?.response?.data?.message) {
				throw new Error("[FITSParser->loadFITS] " + error.response.data.message);
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
			"header": header,
			"data": pixelvalues
		};

	}

	static writeFITS(header: FITSHeader, rawdata: Uint8Array[], fileuri: string) {
		const writer = new FITSWriter();
		writer.run(header, rawdata);
		writer.writeFITS(fileuri);
	}





	async getFile(uri: string): Promise<ArrayBuffer> {

		if (!uri.substring(0, 5).toLowerCase().includes("http")) { // local file
			const promise = await readFile(uri);
			return promise;
		} else if (typeof window !== 'undefined') { // browser
			const data = await window.fetch(uri, {
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
				throw new Error("[FITSParser->getFile] " + err.response.data.message);
			});
			return data;
		} else { // node

			const data = await fetch(uri, {
				method: 'GET',
				headers: {
					'Accept': 'image/fits',
					'Content-Type': 'image/fits',
					'Access-Control-Allow-Origin': '*'
				}
			}).then(res => {
				if (!res.ok) {
					if (res.status == 404) {
						return null;
					} else {
						throw new Error("File not loaded. HTTP error: " + res.status + " " + res.statusText);
					}
				} else {
					return res.arrayBuffer();
				}

			}).catch((error) => {
				if (error?.response?.data?.message) {
					throw new Error("[FITSParser->getFile] " + error.response.data.message);
				}
				throw error;
			});
			return data;
		}
	}

}

