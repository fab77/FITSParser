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
//  import { https } from 'https';
//  const __https = https;


export async function load(uri) {

	if (uri.substring(0,5).toLowerCase().includes("http")) {
		
		// return fetch(uri)
		// 	.then(res => {
		// 		if (!res.ok) {
		// 			throw new Error("File not loaded. HTTP error: "+res.status + " " + res.statusText);
		// 		}else{
		// 			return res.buffer();
		// 		}
				
		// 	});

		// __https.get(uri, res => {
		// 	let data = [];
		// 	const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
		// 	console.log('Status Code:', res.statusCode);
		// 	console.log('Date in Response header:', headerDate);
		  
		// 	res.on('data', chunk => {
		// 	  data.push(chunk);
		// 	});
		  
		// 	res.on('end', () => {
		// 	  console.log('Response ended: ');
		// 	  return Buffer.concat(data);
		// 	});
		//   }).on('error', err => {
		// 	console.log('Error: ', err.message);
		//   });
		console.log("STOP!");
		// let w = window;
		
		// console.log(w);
		try { 
			if (window !== undefined) {
				console.log("after");
				return window.fetch(uri,{
					method: 'GET',
					mode: 'cors',
					headers:{
						"Accept": "image/fits",
						
					}
				})
					.then(res => {
						if (!res.ok) {
							throw new Error("File not loaded. HTTP error: "+res.status + " " + res.statusText);
						}else{
							let p = res.arrayBuffer();
							return p;
						}
						
					}).catch(function(err) {
						console.log("[FitsLoader2] "+err);
					});
			}


		} catch (err) {
			return fetch(uri,{
				method: 'GET',
				headers:{
					'Accept': 'image/fits',
					'Content-Type': 'image/fits',
					// 'Authorization': 'Basic ' + apiKey,
					'Access-Control-Allow-Origin':'*'
				}
			})
				.then(res => {
					console.log("STOP!");
					console.log(res);
					if (!res.ok) {
						throw new Error("File not loaded. HTTP error: "+res.status + " " + res.statusText);
					}else{
						return res.buffer();
					}
					
				}).catch(function(err) {
					console.log("[FitsLoader2] "+err);
				});
		}
	
		
	} else { // local file path
		
		const promise = await readFile(uri);  
		return promise;
		

	}

	
}

