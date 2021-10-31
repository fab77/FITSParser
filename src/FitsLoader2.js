"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
 import fetch from "node-fetch";
 import { readFile } from 'fs/promises';


export async function load(uri) {

	if (uri.substring(0,5).toLowerCase().includes("http")) {
		
		return fetch(uri)
			.then(res => {
				return res.buffer()
			});
		
	} else { // local file path
		
		const promise = await readFile(uri);  
		return promise;
		

	}

	
}

