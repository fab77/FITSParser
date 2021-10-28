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
import fs from "fs";

class FitsLoader {
	
	_callback;
	_data;
	
	
	static load(uri, caller) {

		let myfile;

		if (uri.substring(0,5).toLowerCase().includes("http")) {
			let promloader = new Promise(function(loadSuccess, loadError){
				let req = new XMLHttpRequest();
				// req.overrideMimeType("text/plain; charset=x-user-defined");
				req.overrideMimeType("text/plain; charset=iso-8859-1");
				// req.overrideMimeType("text/plain; charset=UTF-8");
				req.open("GET", uri, true);
				
				req.onload = function() {
					if (req.status == 200){
						loadSuccess(req.responseText);
					}else{
						loadError("File not loaded");
					}
				}
				req.send();
			});
			
			promloader.then(FitsLoader.fitsLoaded, FitsLoader.fitsLoadError);

		} else {

			

			// // FileReader doesn't work directly with filesystem. It works with <input> and drag&drop
			// let promloader = new Promise(function(loadSuccess, loadError){

			// 	let chunkSize = 1024 * 1024 * 16; // 16MB Chunk size
			// 	let fileSize = file.size;
			// 	let currentChunk = 1;
			// 	let totalChunks = Math.ceil((fileSize/chunkSize), chunkSize);

			// 	while (currentChunk <= totalChunks) {

			// 		let offset = (currentChunk-1) * chunkSize;
			// 		let currentFilePart = file.slice(offset, (offset+chunkSize));

			// 		let reader = new FileReader();
			// 		reader.readAsArrayBuffer(currentFilePart);

			// 		reader.onload = function (e) {
			// 			if (reader.readyState == 2) {
			// 				loadSuccess(req.responseText);
			// 			} else if (reader.error) {
			// 				loadError("File not loaded");
			// 			}
			// 		}
			// 		currentChunk++;
			// 	}
			// });

			// promloader.then(FitsLoader.fitsLoaded, FitsLoader.fitsLoadError);
			// let p = new Promise(function (resolve, reject) {
			// 	fs.readFile(uri, null , (err, data) => {
			// 		if (err) {
			// 		  console.error(err);
			// 			reject(err);
			// 		} else {
			// 			console.log("File read");
			// 			resolve(data);
			// 		}
					
			// 	  });	
			// });

			// return p;
			
			fs.readFile(uri, null , (err, data) => {
				if (err) {
				  console.error(err)
				  return;
				}
				console.log("File read");
				caller.processFits(data, caller);
			  })
		}
		// return myfile;
	}

	static fitsLoadError(errstr){
		console.error(errstr);
	}

	static fitsLoaded(fitsdata){
		return fitsdata;
	}

	/** @deprecated */
	constructor (uri, caller) {
		
		this._blob = null;
		
		this._caller = caller;
		
		if (uri.substring(0,5).toLowerCase().includes("http")) {
			this.loadFITSFromURL(uri);
		} else {
			this.loadFITSFromFile(uri);
		}

	}


	/** @deprecated */
	loadFITSFromURL (url) {
		
		let self = this;
		
		let xhr = new XMLHttpRequest();

//		xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.overrideMimeType("text/plain; charset=iso-8859-1");
// 		xhr.overrideMimeType("text/plain; charset=UTF-8");
		
	    xhr.onload = function() {
	    	self._caller.onFitsLoaded(xhr.responseText);
	    }
	    xhr.open("GET", url, true);
		xhr.send(null);
		
	}	

	/** @deprecated */
	loadFITSFromFile (file) {

		let self = this;
		
        var chunkSize = 1024 * 1024 * 16; // 16MB Chunk size
        var fileSize = file.size;
        var currentChunk = 1;
        var totalChunks = Math.ceil((fileSize/chunkSize), chunkSize);

        while (currentChunk <= totalChunks) {

            var offset = (currentChunk-1) * chunkSize;
            var currentFilePart = file.slice(offset, (offset+chunkSize));

            let reader = new FileReader();
            // reader.readAsText(currentFilePart, "iso-8859-1");
			reader.readAsArrayBuffer(currentFilePart);

            reader.onload = function (e) {
            	self._caller.onFitsLoaded(reader.result);
            }
            currentChunk++;
        }
}

// // WORKING WITH SMALL FILES
// loadFITSFromFile () {
//
// let self = this;
//		
// let reader = new FileReader();
//
// reader.readAsText(this._file, "iso-8859-1");
//		
// reader.onload = function() {
// console.log("File loaded");
// self._caller.onFitsLoaded(reader.result);
// };
//		
// reader.onerror = function() {
// throw 'Error: '+reader.error;
// };
// }
	

}



export default FitsLoader;