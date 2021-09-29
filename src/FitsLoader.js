"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

class FitsLoader {
	
	_callback;
	_data;
	
	
	constructor (uri, caller) {
		
		this._blob = null;
		
		this._caller = caller;
		
		if (uri.substring(0,5).toLowerCase().includes("http")) {
			this.loadFITSFromURL(uri);
		} else {
			this.loadFITSFromFile(uri);
		}

	}

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