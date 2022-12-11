(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("jsfitsio", [], factory);
	else if(typeof exports === 'object')
		exports["jsfitsio"] = factory();
	else
		root["jsfitsio"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/blob-polyfill/Blob.js":
/*!********************************************!*\
  !*** ./node_modules/blob-polyfill/Blob.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* Blob.js
 * A Blob, File, FileReader & URL implementation.
 * 2020-02-01
 *
 * By Eli Grey, https://eligrey.com
 * By Jimmy Wärting, https://github.com/jimmywarting
 * License: MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */

(function(global) {
	(function (factory) {
		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {}
	})(function (exports) {
		"use strict";

		var BlobBuilder = global.BlobBuilder
			|| global.WebKitBlobBuilder
			|| global.MSBlobBuilder
			|| global.MozBlobBuilder;

		var URL = global.URL || global.webkitURL || function (href, a) {
			a = document.createElement("a");
			a.href = href;
			return a;
		};

		var origBlob = global.Blob;
		var createObjectURL = URL.createObjectURL;
		var revokeObjectURL = URL.revokeObjectURL;
		var strTag = global.Symbol && global.Symbol.toStringTag;
		var blobSupported = false;
		var blobSupportsArrayBufferView = false;
		var blobBuilderSupported = BlobBuilder
			&& BlobBuilder.prototype.append
			&& BlobBuilder.prototype.getBlob;

		try {
			// Check if Blob constructor is supported
			blobSupported = new Blob(["ä"]).size === 2;

			// Check if Blob constructor supports ArrayBufferViews
			// Fails in Safari 6, so we need to map to ArrayBuffers there.
			blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
		} catch (e) {/**/}


		// Helper function that maps ArrayBufferViews to ArrayBuffers
		// Used by BlobBuilder constructor and old browsers that didn't
		// support it in the Blob constructor.
		function mapArrayBufferViews (ary) {
			return ary.map(function (chunk) {
				if (chunk.buffer instanceof ArrayBuffer) {
					var buf = chunk.buffer;

					// if this is a subarray, make a copy so we only
					// include the subarray region from the underlying buffer
					if (chunk.byteLength !== buf.byteLength) {
						var copy = new Uint8Array(chunk.byteLength);
						copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
						buf = copy.buffer;
					}

					return buf;
				}

				return chunk;
			});
		}

		function BlobBuilderConstructor (ary, options) {
			options = options || {};

			var bb = new BlobBuilder();
			mapArrayBufferViews(ary).forEach(function (part) {
				bb.append(part);
			});

			return options.type ? bb.getBlob(options.type) : bb.getBlob();
		}

		function BlobConstructor (ary, options) {
			return new origBlob(mapArrayBufferViews(ary), options || {});
		}

		if (global.Blob) {
			BlobBuilderConstructor.prototype = Blob.prototype;
			BlobConstructor.prototype = Blob.prototype;
		}

		/********************************************************/
		/*               String Encoder fallback                */
		/********************************************************/
		function stringEncode (string) {
			var pos = 0;
			var len = string.length;
			var Arr = global.Uint8Array || Array; // Use byte array when possible

			var at = 0; // output position
			var tlen = Math.max(32, len + (len >> 1) + 7); // 1.5x size
			var target = new Arr((tlen >> 3) << 3); // ... but at 8 byte offset

			while (pos < len) {
				var value = string.charCodeAt(pos++);
				if (value >= 0xd800 && value <= 0xdbff) {
					// high surrogate
					if (pos < len) {
						var extra = string.charCodeAt(pos);
						if ((extra & 0xfc00) === 0xdc00) {
							++pos;
							value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
						}
					}
					if (value >= 0xd800 && value <= 0xdbff) {
						continue; // drop lone surrogate
					}
				}

				// expand the buffer if we couldn't write 4 bytes
				if (at + 4 > target.length) {
					tlen += 8; // minimum extra
					tlen *= (1.0 + (pos / string.length) * 2); // take 2x the remaining
					tlen = (tlen >> 3) << 3; // 8 byte offset

					var update = new Uint8Array(tlen);
					update.set(target);
					target = update;
				}

				if ((value & 0xffffff80) === 0) { // 1-byte
					target[at++] = value; // ASCII
					continue;
				} else if ((value & 0xfffff800) === 0) { // 2-byte
					target[at++] = ((value >> 6) & 0x1f) | 0xc0;
				} else if ((value & 0xffff0000) === 0) { // 3-byte
					target[at++] = ((value >> 12) & 0x0f) | 0xe0;
					target[at++] = ((value >> 6) & 0x3f) | 0x80;
				} else if ((value & 0xffe00000) === 0) { // 4-byte
					target[at++] = ((value >> 18) & 0x07) | 0xf0;
					target[at++] = ((value >> 12) & 0x3f) | 0x80;
					target[at++] = ((value >> 6) & 0x3f) | 0x80;
				} else {
					// FIXME: do we care
					continue;
				}

				target[at++] = (value & 0x3f) | 0x80;
			}

			return target.slice(0, at);
		}

		/********************************************************/
		/*               String Decoder fallback                */
		/********************************************************/
		function stringDecode (buf) {
			var end = buf.length;
			var res = [];

			var i = 0;
			while (i < end) {
				var firstByte = buf[i];
				var codePoint = null;
				var bytesPerSequence = (firstByte > 0xEF) ? 4
					: (firstByte > 0xDF) ? 3
						: (firstByte > 0xBF) ? 2
							: 1;

				if (i + bytesPerSequence <= end) {
					var secondByte, thirdByte, fourthByte, tempCodePoint;

					switch (bytesPerSequence) {
					case 1:
						if (firstByte < 0x80) {
							codePoint = firstByte;
						}
						break;
					case 2:
						secondByte = buf[i + 1];
						if ((secondByte & 0xC0) === 0x80) {
							tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
							if (tempCodePoint > 0x7F) {
								codePoint = tempCodePoint;
							}
						}
						break;
					case 3:
						secondByte = buf[i + 1];
						thirdByte = buf[i + 2];
						if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
							tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
							if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
								codePoint = tempCodePoint;
							}
						}
						break;
					case 4:
						secondByte = buf[i + 1];
						thirdByte = buf[i + 2];
						fourthByte = buf[i + 3];
						if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
							tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
							if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
								codePoint = tempCodePoint;
							}
						}
					}
				}

				if (codePoint === null) {
					// we did not generate a valid codePoint so insert a
					// replacement char (U+FFFD) and advance only 1 byte
					codePoint = 0xFFFD;
					bytesPerSequence = 1;
				} else if (codePoint > 0xFFFF) {
					// encode to utf16 (surrogate pair dance)
					codePoint -= 0x10000;
					res.push(codePoint >>> 10 & 0x3FF | 0xD800);
					codePoint = 0xDC00 | codePoint & 0x3FF;
				}

				res.push(codePoint);
				i += bytesPerSequence;
			}

			var len = res.length;
			var str = "";
			var j = 0;

			while (j < len) {
				str += String.fromCharCode.apply(String, res.slice(j, j += 0x1000));
			}

			return str;
		}

		// string -> buffer
		var textEncode = typeof TextEncoder === "function"
			? TextEncoder.prototype.encode.bind(new TextEncoder())
			: stringEncode;

		// buffer -> string
		var textDecode = typeof TextDecoder === "function"
			? TextDecoder.prototype.decode.bind(new TextDecoder())
			: stringDecode;

		function FakeBlobBuilder () {
			function bufferClone (buf) {
				var view = new Array(buf.byteLength);
				var array = new Uint8Array(buf);
				var i = view.length;
				while (i--) {
					view[i] = array[i];
				}
				return view;
			}
			function array2base64 (input) {
				var byteToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

				var output = [];

				for (var i = 0; i < input.length; i += 3) {
					var byte1 = input[i];
					var haveByte2 = i + 1 < input.length;
					var byte2 = haveByte2 ? input[i + 1] : 0;
					var haveByte3 = i + 2 < input.length;
					var byte3 = haveByte3 ? input[i + 2] : 0;

					var outByte1 = byte1 >> 2;
					var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
					var outByte3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
					var outByte4 = byte3 & 0x3F;

					if (!haveByte3) {
						outByte4 = 64;

						if (!haveByte2) {
							outByte3 = 64;
						}
					}

					output.push(
						byteToCharMap[outByte1], byteToCharMap[outByte2],
						byteToCharMap[outByte3], byteToCharMap[outByte4]
					);
				}

				return output.join("");
			}

			var create = Object.create || function (a) {
				function c () {}
				c.prototype = a;
				return new c();
			};

			function getObjectTypeName (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			}

			function isPrototypeOf(c, o) {
				return typeof c === "object" && Object.prototype.isPrototypeOf.call(c.prototype, o);
			}

			function isDataView (o) {
				return getObjectTypeName(o) === "DataView" || isPrototypeOf(global.DataView, o);
			}

			var arrayBufferClassNames = [
				"Int8Array",
				"Uint8Array",
				"Uint8ClampedArray",
				"Int16Array",
				"Uint16Array",
				"Int32Array",
				"Uint32Array",
				"Float32Array",
				"Float64Array",
				"ArrayBuffer"
			];

			function includes(a, v) {
				return a.indexOf(v) !== -1;
			}

			function isArrayBuffer(o) {
				return includes(arrayBufferClassNames, getObjectTypeName(o)) || isPrototypeOf(global.ArrayBuffer, o);
			}

			function concatTypedarrays (chunks) {
				var size = 0;
				var j = chunks.length;
				while (j--) { size += chunks[j].length; }
				var b = new Uint8Array(size);
				var offset = 0;
				for (var i = 0; i < chunks.length; i++) {
					var chunk = chunks[i];
					b.set(chunk, offset);
					offset += chunk.byteLength || chunk.length;
				}

				return b;
			}

			/********************************************************/
			/*                   Blob constructor                   */
			/********************************************************/
			function Blob (chunks, opts) {
				chunks = chunks ? chunks.slice() : [];
				opts = opts == null ? {} : opts;
				for (var i = 0, len = chunks.length; i < len; i++) {
					var chunk = chunks[i];
					if (chunk instanceof Blob) {
						chunks[i] = chunk._buffer;
					} else if (typeof chunk === "string") {
						chunks[i] = textEncode(chunk);
					} else if (isDataView(chunk)) {
						chunks[i] = bufferClone(chunk.buffer);
					} else if (isArrayBuffer(chunk)) {
						chunks[i] = bufferClone(chunk);
					} else {
						chunks[i] = textEncode(String(chunk));
					}
				}

				this._buffer = global.Uint8Array
					? concatTypedarrays(chunks)
					: [].concat.apply([], chunks);
				this.size = this._buffer.length;

				this.type = opts.type || "";
				if (/[^\u0020-\u007E]/.test(this.type)) {
					this.type = "";
				} else {
					this.type = this.type.toLowerCase();
				}
			}

			Blob.prototype.arrayBuffer = function () {
				return Promise.resolve(this._buffer.buffer || this._buffer);
			};

			Blob.prototype.text = function () {
				return Promise.resolve(textDecode(this._buffer));
			};

			Blob.prototype.slice = function (start, end, type) {
				var slice = this._buffer.slice(start || 0, end || this._buffer.length);
				return new Blob([slice], {type: type});
			};

			Blob.prototype.toString = function () {
				return "[object Blob]";
			};

			/********************************************************/
			/*                   File constructor                   */
			/********************************************************/
			function File (chunks, name, opts) {
				opts = opts || {};
				var a = Blob.call(this, chunks, opts) || this;
				a.name = name.replace(/\//g, ":");
				a.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
				a.lastModified = +a.lastModifiedDate;

				return a;
			}

			File.prototype = create(Blob.prototype);
			File.prototype.constructor = File;

			if (Object.setPrototypeOf) {
				Object.setPrototypeOf(File, Blob);
			} else {
				try {
					File.__proto__ = Blob;
				} catch (e) {/**/}
			}

			File.prototype.toString = function () {
				return "[object File]";
			};

			/********************************************************/
			/*                FileReader constructor                */
			/********************************************************/
			function FileReader () {
				if (!(this instanceof FileReader)) {
					throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
				}

				var delegate = document.createDocumentFragment();
				this.addEventListener = delegate.addEventListener;
				this.dispatchEvent = function (evt) {
					var local = this["on" + evt.type];
					if (typeof local === "function") local(evt);
					delegate.dispatchEvent(evt);
				};
				this.removeEventListener = delegate.removeEventListener;
			}

			function _read (fr, blob, kind) {
				if (!(blob instanceof Blob)) {
					throw new TypeError("Failed to execute '" + kind + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
				}

				fr.result = "";

				setTimeout(function () {
					this.readyState = FileReader.LOADING;
					fr.dispatchEvent(new Event("load"));
					fr.dispatchEvent(new Event("loadend"));
				});
			}

			FileReader.EMPTY = 0;
			FileReader.LOADING = 1;
			FileReader.DONE = 2;
			FileReader.prototype.error = null;
			FileReader.prototype.onabort = null;
			FileReader.prototype.onerror = null;
			FileReader.prototype.onload = null;
			FileReader.prototype.onloadend = null;
			FileReader.prototype.onloadstart = null;
			FileReader.prototype.onprogress = null;

			FileReader.prototype.readAsDataURL = function (blob) {
				_read(this, blob, "readAsDataURL");
				this.result = "data:" + blob.type + ";base64," + array2base64(blob._buffer);
			};

			FileReader.prototype.readAsText = function (blob) {
				_read(this, blob, "readAsText");
				this.result = textDecode(blob._buffer);
			};

			FileReader.prototype.readAsArrayBuffer = function (blob) {
				_read(this, blob, "readAsText");
				// return ArrayBuffer when possible
				this.result = (blob._buffer.buffer || blob._buffer).slice();
			};

			FileReader.prototype.abort = function () {};

			/********************************************************/
			/*                         URL                          */
			/********************************************************/
			URL.createObjectURL = function (blob) {
				return blob instanceof Blob
					? "data:" + blob.type + ";base64," + array2base64(blob._buffer)
					: createObjectURL.call(URL, blob);
			};

			URL.revokeObjectURL = function (url) {
				revokeObjectURL && revokeObjectURL.call(URL, url);
			};

			/********************************************************/
			/*                         XHR                          */
			/********************************************************/
			var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;
			if (_send) {
				XMLHttpRequest.prototype.send = function (data) {
					if (data instanceof Blob) {
						this.setRequestHeader("Content-Type", data.type);
						_send.call(this, textDecode(data._buffer));
					} else {
						_send.call(this, data);
					}
				};
			}

			exports.Blob = Blob;
			exports.File = File;
			exports.FileReader = FileReader;
			exports.URL = URL;
		}

		function fixFileAndXHR () {
			var isIE = !!global.ActiveXObject || (
				"-ms-scroll-limit" in document.documentElement.style &&
				"-ms-ime-align" in document.documentElement.style
			);

			// Monkey patched
			// IE doesn't set Content-Type header on XHR whose body is a typed Blob
			// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/6047383
			var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;
			if (isIE && _send) {
				XMLHttpRequest.prototype.send = function (data) {
					if (data instanceof Blob) {
						this.setRequestHeader("Content-Type", data.type);
						_send.call(this, data);
					} else {
						_send.call(this, data);
					}
				};
			}

			try {
				new File([], "");
				exports.File = global.File;
				exports.FileReader = global.FileReader;
			} catch (e) {
				try {
					exports.File = new Function("class File extends Blob {" +
						"constructor(chunks, name, opts) {" +
							"opts = opts || {};" +
							"super(chunks, opts || {});" +
							"this.name = name.replace(/\\//g, \":\");" +
							"this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();" +
							"this.lastModified = +this.lastModifiedDate;" +
						"}};" +
						"return new File([], \"\"), File"
					)();
				} catch (e) {
					exports.File = function (b, d, c) {
						var blob = new Blob(b, c);
						var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();

						blob.name = d.replace(/\//g, ":");
						blob.lastModifiedDate = t;
						blob.lastModified = +t;
						blob.toString = function () {
							return "[object File]";
						};

						if (strTag) {
							blob[strTag] = "File";
						}

						return blob;
					};
				}
			}
		}

		if (blobSupported) {
			fixFileAndXHR();
			exports.Blob = blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
		} else if (blobBuilderSupported) {
			fixFileAndXHR();
			exports.Blob = BlobBuilderConstructor;
		} else {
			FakeBlobBuilder();
		}

		if (strTag) {
			if (!exports.File.prototype[strTag]) exports.File.prototype[strTag] = "File";
			if (!exports.Blob.prototype[strTag]) exports.Blob.prototype[strTag] = "Blob";
			if (!exports.FileReader.prototype[strTag]) exports.FileReader.prototype[strTag] = "FileReader";
		}

		var blob = exports.Blob.prototype;
		var stream;

		try {
			new ReadableStream({ type: "bytes" });
			stream = function stream() {
				var position = 0;
				var blob = this;

				return new ReadableStream({
					type: "bytes",
					autoAllocateChunkSize: 524288,

					pull: function (controller) {
						var v = controller.byobRequest.view;
						var chunk = blob.slice(position, position + v.byteLength);
						return chunk.arrayBuffer()
							.then(function (buffer) {
								var uint8array = new Uint8Array(buffer);
								var bytesRead = uint8array.byteLength;

								position += bytesRead;
								v.set(uint8array);
								controller.byobRequest.respond(bytesRead);

								if(position >= blob.size)
									controller.close();
							});
					}
				});
			};
		} catch (e) {
			try {
				new ReadableStream({});
				stream = function stream(blob){
					var position = 0;

					return new ReadableStream({
						pull: function (controller) {
							var chunk = blob.slice(position, position + 524288);

							return chunk.arrayBuffer().then(function (buffer) {
								position += buffer.byteLength;
								var uint8array = new Uint8Array(buffer);
								controller.enqueue(uint8array);

								if (position == blob.size)
									controller.close();
							});
						}
					});
				};
			} catch (e) {
				try {
					new Response("").body.getReader().read();
					stream = function stream() {
						return (new Response(this)).body;
					};
				} catch (e) {
					stream = function stream() {
						throw new Error("Include https://github.com/MattiasBuelens/web-streams-polyfill");
					};
				}
			}
		}

		function promisify(obj) {
			return new Promise(function(resolve, reject) {
				obj.onload = obj.onerror = function(evt) {
					obj.onload = obj.onerror = null;

					evt.type === "load" ?
						resolve(obj.result || obj) :
						reject(new Error("Failed to read the blob/file"));
				};
			});
		}

		if (!blob.arrayBuffer) {
			blob.arrayBuffer = function arrayBuffer() {
				var fr = new FileReader();
				fr.readAsArrayBuffer(this);
				return promisify(fr);
			};
		}

		if (!blob.text) {
			blob.text = function text() {
				var fr = new FileReader();
				fr.readAsText(this);
				return promisify(fr);
			};
		}

		if (!blob.stream) {
			blob.stream = stream;
		}
	});
})(
	typeof self !== "undefined" && self ||
		typeof window !== "undefined" && window ||
		typeof __webpack_require__.g !== "undefined" && __webpack_require__.g ||
		this
);


/***/ }),

/***/ "./src/FITSParser.ts":
/*!***************************!*\
  !*** ./src/FITSParser.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FITSParser": () => (/* binding */ FITSParser)
/* harmony export */ });
/* harmony import */ var _FITSWriter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FITSWriter.js */ "./src/FITSWriter.ts");
/* harmony import */ var _ParsePayload_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParsePayload.js */ "./src/ParsePayload.ts");
/* harmony import */ var _ParseHeader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParseHeader.js */ "./src/ParseHeader.ts");
/**

 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



// import fetch from 'cross-fetch';
// import { readFile } from "node:fs/promises";
class FITSParser {
    constructor(url) {
        this._url = url;
    }
    loadFITS() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getFile(this._url)
                .then((rawdata) => {
                if (rawdata !== null && rawdata.byteLength > 0) {
                    const uint8 = new Uint8Array(rawdata);
                    const fits = this.processFits(uint8);
                    return fits;
                }
                return null;
            })
                .catch((error) => {
                var _a, _b;
                if ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
                    throw new Error("[FITSParser->loadFITS] " + error.response.data.message);
                }
                throw error;
            });
        });
    }
    processFits(rawdata) {
        const header = _ParseHeader_js__WEBPACK_IMPORTED_MODULE_2__.ParseHeader.parse(rawdata);
        const payloadParser = new _ParsePayload_js__WEBPACK_IMPORTED_MODULE_1__.ParsePayload(header, rawdata);
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
    static generateFITS(header, rawdata) {
        const writer = new _FITSWriter_js__WEBPACK_IMPORTED_MODULE_0__.FITSWriter();
        writer.run(header, rawdata);
        return writer.typedArrayToURL();
    }
    getFile(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            if (!uri.substring(0, 5).toLowerCase().includes("http")) {
                let p = yield __webpack_require__.e(/*! import() */ "src_getLocalFile_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./getLocalFile.js */ "./src/getLocalFile.ts"));
                // data = await p.getLocalFile(uri);
                return yield p.getLocalFile(uri);
            }
            else {
                let p = yield Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_cross-fetch_dist_browser-ponyfill_js"), __webpack_require__.e("src_getFile_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./getFile.js */ "./src/getFile.ts"));
                return p.getFile(uri).then((data) => {
                    return data;
                }).catch((err) => {
                    console.error(err);
                    return null;
                });
                // data = await p.getFile(uri);
                // return await p.getFile(uri).catch((err) => {
                //   console.error(err);
                // });
            }
            // return data;
        });
    }
}


/***/ }),

/***/ "./src/FITSWriter.ts":
/*!***************************!*\
  !*** ./src/FITSWriter.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FITSWriter": () => (/* binding */ FITSWriter)
/* harmony export */ });
/* harmony import */ var blob_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! blob-polyfill */ "./node_modules/blob-polyfill/Blob.js");
/* harmony import */ var blob_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blob_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/FITSHeaderItem.js */ "./src/model/FITSHeaderItem.ts");
/* harmony import */ var _ParseUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParseUtils.js */ "./src/ParseUtils.ts");
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



// import fs from 'node:fs/promises';
class FITSWriter {
    constructor() {
        this._headerArray = new Uint8Array();
        this._payloadArray = new Array();
        this._fitsData = new Uint8Array();
    }
    run(header, rawdata) {
        this.prepareHeader(header);
        this._payloadArray = rawdata;
        this.prepareFITS();
    }
    prepareHeader(headerDetails) {
        const item = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeaderItem("END");
        headerDetails.addItem(item);
        let str = "";
        for (let i = 0; i < headerDetails.getItemList().length; i++) {
            const item = headerDetails.getItemList()[i];
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
            this._headerArray[i] = _ParseUtils_js__WEBPACK_IMPORTED_MODULE_2__.ParseUtils.getByteAt(str, i);
        }
    }
    // formatHeaderLine(item: string | undefined, value: string | number, comment: string) {
    formatHeaderLine(item) {
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
            }
            else {
                if (comment !== null && comment !== undefined) {
                    str += comment;
                }
                const len = str.length;
                for (let j = 80; j > len; j--) {
                    str += " ";
                }
            }
        }
        else {
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
            }
            else {
                str = "";
                for (let j = 80; j > 0; j--) {
                    str += " ";
                }
            }
        }
        return str;
    }
    prepareFITS() {
        const bytes = new Uint8Array(this._headerArray.length +
            this._payloadArray[0].length * this._payloadArray.length);
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
    typedArrayToURL() {
        const b = new blob_polyfill__WEBPACK_IMPORTED_MODULE_0__.Blob([this._fitsData], { type: "application/fits" });
        // console.log(`<html><body><img src='${URL.createObjectURL(b)}'</body></html>`);
        return URL.createObjectURL(b);
    }
}


/***/ }),

/***/ "./src/ParseHeader.ts":
/*!****************************!*\
  !*** ./src/ParseHeader.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParseHeader": () => (/* binding */ ParseHeader)
/* harmony export */ });
/* harmony import */ var _model_FITSHeader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/FITSHeader.js */ "./src/model/FITSHeader.ts");
/* harmony import */ var _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/FITSHeaderItem.js */ "./src/model/FITSHeaderItem.ts");


/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
class ParseHeader {
    static parse(rawdata) {
        // only one header block (2880) allowed atm.
        // TODO handle multiple header blocks
        // let headerByteData = new Uint8Array(rawdata, 0, 2880);
        const textDecoder = new TextDecoder("iso-8859-1");
        const header = new _model_FITSHeader_js__WEBPACK_IMPORTED_MODULE_0__.FITSHeader();
        let nline = 0;
        let key = "";
        let val;
        let u8line;
        let u8key;
        let u8val;
        let u8ind;
        // let ind: string;
        let item;
        let fitsLine;
        item = null;
        while (key !== "END" && rawdata.length > 0) {
            // line 80 characters
            u8line = new Uint8Array(rawdata.slice(nline * 80, nline * 80 + 80));
            nline++;
            // key
            u8key = new Uint8Array(u8line.slice(0, 8));
            key = textDecoder.decode(u8key).trim();
            // value indicator
            u8ind = new Uint8Array(u8line.slice(8, 10));
            // ind = textDecoder.decode(u8ind);
            // reading value
            u8val = new Uint8Array(u8line.slice(10, 80));
            val = textDecoder.decode(u8val).trim();
            if (u8ind[0] == 61 && u8ind[1] == 32) {
                let firstchar = 32;
                for (let i = 0; i < u8val.length; i++) {
                    if (u8val[i] != 32) {
                        firstchar = u8val[i];
                        break;
                    }
                }
                if (firstchar == 39 || !Number(val)) {
                    // value starts with '
                    // [ival, icomment]
                    fitsLine = ParseHeader.parseStringValue(u8val);
                }
                else {
                    if (firstchar == 84 || firstchar == 70) {
                        // T or F
                        fitsLine = ParseHeader.parseLogicalValue(u8val);
                    }
                    else {
                        val = textDecoder.decode(u8val).trim();
                        if (val.includes(".")) {
                            fitsLine = ParseHeader.parseFloatValue(u8val);
                        }
                        else {
                            fitsLine = ParseHeader.parseIntValue(u8val);
                        }
                    }
                }
                item = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeaderItem(key, fitsLine.val, fitsLine.comment);
            }
            else {
                if (key == "COMMENT" || key == "HISTORY") {
                    item = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeaderItem(key, undefined, val);
                }
                else {
                    let firstchar = 32;
                    for (let i = 0; i < u8val.length; i++) {
                        if (u8val[i] != 32) {
                            firstchar = u8val[i];
                            break;
                        }
                    }
                    if (firstchar == 47) {
                        // single / this is the case when no key nor value indicator is defined
                        item = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeaderItem(undefined, undefined, val);
                    }
                    else if (firstchar == 32) {
                        // case when there's a line with only spaces
                        item = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeaderItem(undefined, undefined, undefined);
                    }
                }
            }
            if (item != null) {
                header.addItem(item);
            }
        }
        item = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeaderItem("COMMENT", "FITS generated with FITSParser on ", undefined);
        header.addItem(item);
        const now = new Date();
        item = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeaderItem("COMMENT", now.toString());
        header.addItem(item);
        const nblock = Math.ceil(nline / 36);
        const offset = nblock * 2880;
        header.offset = offset;
        return header;
    }
    static parseStringValue(u8buffer) {
        const textDecoder = new TextDecoder("iso-8859-1");
        const decoded = textDecoder.decode(u8buffer).trim();
        const idx = decoded.lastIndexOf("/");
        const val = decoded.substring(0, idx);
        let comment = decoded.substring(idx);
        // if (comment === undefined) {
        //   comment = null;
        // }
        return {
            val: val,
            comment: comment,
        };
    }
    static parseLogicalValue(u8buffer) {
        const textDecoder = new TextDecoder("iso-8859-1");
        const val = textDecoder.decode(u8buffer).trim();
        const tokens = val.split("/");
        if (tokens[1] === undefined) {
            return {
                val: tokens[0].trim(),
                comment: undefined,
            };
        }
        return {
            val: tokens[0].trim(),
            comment: " /" + tokens[1],
        };
    }
    static parseIntValue(u8buffer) {
        const textDecoder = new TextDecoder("iso-8859-1");
        const val = textDecoder.decode(u8buffer).trim();
        const tokens = val.split("/");
        if (tokens[1] === undefined) {
            return {
                val: parseInt(tokens[0].trim()),
                comment: undefined,
            };
        }
        return {
            val: parseInt(tokens[0].trim()),
            comment: " /" + tokens[1],
        };
    }
    static parseFloatValue(u8buffer) {
        const textDecoder = new TextDecoder("iso-8859-1");
        const val = textDecoder.decode(u8buffer).trim();
        const tokens = val.split("/");
        if (tokens[1] === undefined) {
            return {
                val: parseFloat(tokens[0].trim()),
                comment: undefined,
            };
        }
        return {
            val: parseFloat(tokens[0].trim()),
            comment: " /" + tokens[1],
        };
    }
}


/***/ }),

/***/ "./src/ParsePayload.ts":
/*!*****************************!*\
  !*** ./src/ParsePayload.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParsePayload": () => (/* binding */ ParsePayload)
/* harmony export */ });
/* harmony import */ var _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/FITSHeaderItem.js */ "./src/model/FITSHeaderItem.ts");
/* harmony import */ var _ParseUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParseUtils.js */ "./src/ParseUtils.ts");
// "use strict";


// let colorsMap = new Map();
// colorsMap.set("grayscale","grayscale");
// colorsMap.set("planck","planck");
// colorsMap.set("eosb","eosb");
// colorsMap.set("rainbow","rainbow");
// colorsMap.set("cmb","cmb");
// colorsMap.set("cubehelix","cubehelix");
class ParsePayload {
    constructor(fitsheader, rawdata) {
        this._u8data = new Uint8Array();
        this._BZERO = undefined;
        this._BSCALE = undefined;
        this._BLANK = undefined;
        this._BITPIX = undefined;
        this._NAXIS1 = undefined;
        this._NAXIS2 = undefined;
        this._DATAMIN = undefined;
        this._DATAMAX = undefined;
        this._physicalblank = undefined;
        const buffer = rawdata.slice(fitsheader.offset);
        this._u8data = new Uint8Array(buffer);
        this.init(fitsheader);
    }
    init(fitsheader) {
        this._BZERO = fitsheader.get("BZERO");
        if (this._BZERO === undefined) {
            this._BZERO = 0;
        }
        this._BSCALE = fitsheader.get("BSCALE");
        if (this._BSCALE === undefined) {
            this._BSCALE = 1;
        }
        this._BLANK = fitsheader.get("BLANK"); // undefined in case it's not present in the header
        // this._BLANK_pv = this._BZERO + this._BSCALE * this._BLANK || undefined;
        this._BITPIX = fitsheader.get("BITPIX");
        this._NAXIS1 = fitsheader.get("NAXIS1");
        this._NAXIS2 = fitsheader.get("NAXIS2");
        this._DATAMIN = fitsheader.get("DATAMIN");
        this._DATAMAX = fitsheader.get("DATAMAX");
        this._physicalblank = undefined;
        if (this._DATAMAX === undefined || this._DATAMIN === undefined) {
            const [min, max] = this.computePhysicalMinAndMax();
            this._DATAMAX = max;
            this._DATAMIN = min;
            const maxitem = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_0__.FITSHeaderItem("DATAMAX", max, " / computed with FITSParser");
            const minitem = new _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_0__.FITSHeaderItem("DATAMIN", min, " / computed with FITSParser");
            fitsheader.addItem(maxitem);
            fitsheader.addItem(minitem);
            // fitsheader.set("DATAMAX", max);
            // fitsheader.set("DATAMIN", min);
        }
        // let item = new FITSHeaderItem("END", null, null);
        // fitsheader.addItem(item);
    }
    computePhysicalMinAndMax() {
        let i = 0;
        if (this._BITPIX === undefined) {
            throw new Error("BITPIX is not defined");
        }
        const bytesXelem = Math.abs(this._BITPIX / 8);
        const pxLength = this._u8data.byteLength / bytesXelem;
        let px_val, ph_val;
        let min = undefined;
        let max = undefined;
        if (this._BLANK !== undefined) {
            this._physicalblank = this.pixel2physicalValue(this._BLANK);
        }
        while (i < pxLength) {
            // px_val = this.extractPixelValue(bytesXelem*i);
            px_val = this.extractPixelValue(bytesXelem * i);
            if (px_val === undefined) {
                i++;
                continue;
            }
            ph_val = this.pixel2physicalValue(px_val);
            if (min === undefined) {
                min = ph_val;
            }
            if (max === undefined) {
                max = ph_val;
            }
            //TODO check below if
            if (this._physicalblank === undefined || this._physicalblank !== ph_val) {
                if (ph_val !== undefined && (ph_val < min || min === undefined)) {
                    min = ph_val;
                }
                if (ph_val !== undefined && (ph_val > max || max === undefined)) {
                    max = ph_val;
                }
            }
            i++;
        }
        return [min, max];
    }
    parse() {
        // let px_val; // pixel array value
        // let ph_val = undefined; // pixel physical value
        if (this._BITPIX === undefined) {
            throw new Error("BITPIX is undefined");
        }
        if (this._NAXIS1 === undefined) {
            throw new Error("NAXIS1 is undefined");
        }
        if (this._NAXIS2 === undefined) {
            throw new Error("NAXIS2 is undefined");
        }
        const bytesXelem = Math.abs(this._BITPIX / 8);
        let pxLength = this._u8data.byteLength / bytesXelem;
        pxLength = this._NAXIS1 * this._NAXIS2;
        let k = 0;
        let c, r;
        const pixelvalues = [];
        //  let pixv, pv;
        while (k < pxLength) {
            r = Math.floor(k / this._NAXIS1); // row
            c = (k - r * this._NAXIS1) * bytesXelem; // col
            if (c === 0) {
                pixelvalues[r] = new Uint8Array(this._NAXIS1 * bytesXelem);
            }
            // px_val = this.extractPixelValue(bytesXelem * k);
            // ph_val = this.pixel2physicalValue(px_val);
            // TODO check if ph_val == blank
            // if not then use ph_val to compute datamin and datamax
            for (let i = 0; i < bytesXelem; i++) {
                pixelvalues[r][c + i] = this._u8data[k * bytesXelem + i];
            }
            // if (k == 232) {
            // 	pixv = this.extractPixelValue(k * bytesXelem);
            // 	pv = this._BZERO + this._BSCALE * pixv;
            // }
            k++;
        }
        return pixelvalues;
    }
    /** this can be deleted */
    extractPixelValue(offset) {
        let px_val = undefined; // pixel value
        if (this._BITPIX == 16) {
            // 16-bit 2's complement binary integer
            px_val = _ParseUtils_js__WEBPACK_IMPORTED_MODULE_1__.ParseUtils.parse16bit2sComplement(this._u8data[offset], this._u8data[offset + 1]);
        }
        else if (this._BITPIX == 32) {
            // IEEE 754 half precision (float16) ??
            px_val = _ParseUtils_js__WEBPACK_IMPORTED_MODULE_1__.ParseUtils.parse32bit2sComplement(this._u8data[offset], this._u8data[offset + 1], this._u8data[offset + 2], this._u8data[offset + 3]);
        }
        else if (this._BITPIX == -32) {
            // 32-bit IEEE single-precision floating point
            // px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]);
            px_val = _ParseUtils_js__WEBPACK_IMPORTED_MODULE_1__.ParseUtils.parseFloatingPointFormat(this._u8data.slice(offset, offset + 4), 8, 23);
        }
        else if (this._BITPIX == 64) {
            // 64-bit 2's complement binary integer
            throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
        }
        else if (this._BITPIX == -64) {
            // 64-bit IEEE double-precision floating point
            //https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
            px_val = _ParseUtils_js__WEBPACK_IMPORTED_MODULE_1__.ParseUtils.parseFloatingPointFormat(this._u8data.slice(offset, offset + 8), 11, 52);
        }
        return px_val;
    }
    pixel2physicalValue(pxval) {
        if (this._BZERO === undefined || this._BSCALE === undefined) {
            throw new Error("Either BZERO or BSCALE is undefined");
        }
        return this._BZERO + this._BSCALE * pxval;
    }
}


/***/ }),

/***/ "./src/ParseUtils.ts":
/*!***************************!*\
  !*** ./src/ParseUtils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParseUtils": () => (/* binding */ ParseUtils)
/* harmony export */ });
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
class ParseUtils {
    static getStringAt(data, offset, length) {
        const chars = [];
        for (let i = offset, j = 0; i < offset + length; i++, j++) {
            chars[j] = String.fromCharCode(data.charCodeAt(i) & 0xff);
        }
        return chars.join("");
    }
    static byteString(n) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return ("000000000" + n.toString(2)).substr(-8);
    }
    static parse32bitSinglePrecisionFloatingPoint(byte1, byte2, byte3, byte4) {
        let long = (((((byte1 << 8) + byte2) << 8) + byte3) << 8) + byte4;
        if (long < 0)
            long += 4294967296;
        const float = (1.0 + (long & 0x007fffff) / 0x0800000) *
            Math.pow(2, ((long & 0x7f800000) >> 23) - 127);
        return float;
    }
    static convertBlankToBytes(blank, nbytes) {
        let str = Math.abs(blank).toString(2);
        while (str.length / 8 < nbytes) {
            str += "0";
        }
        const buffer = new ArrayBuffer(nbytes);
        const uint8 = new Uint8Array(buffer);
        for (let i = 0; i < nbytes; i++) {
            uint8[i] = parseInt(str.substr(8 * i, 8 * (i + 1)), 2);
        }
        return uint8;
    }
    /** https://gist.github.com/Manouchehri/f4b41c8272db2d6423fa987e844dd9ac */
    static parseFloatingPointFormat(bytes, ebits, fbits) {
        // Bytes to bits
        const bits = [];
        for (let i = bytes.length; i; i -= 1) {
            let byte = bytes[i - 1];
            for (let j = 8; j; j -= 1) {
                bits.push(byte % 2 ? 1 : 0);
                byte = byte >> 1;
            }
        }
        bits.reverse();
        const str = bits.join("");
        // Unpack sign, exponent, fraction
        const bias = (1 << (ebits - 1)) - 1;
        const s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
        const e = parseInt(str.substring(1, 1 + ebits), 2);
        const f = parseInt(str.substring(1 + ebits), 2);
        // Produce number
        if (e === (1 << ebits) - 1) {
            return f !== 0 ? undefined : s * Infinity;
        }
        else if (e > 0) {
            return s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
        }
        else if (f !== 0) {
            return s * Math.pow(2, -(bias - 1)) * (f / Math.pow(2, fbits));
        }
        else {
            return s * 0;
        }
    }
    static generate16bit2sComplement(val) {
        throw new TypeError("not implemented yet" + val);
    }
    static parse16bit2sComplement(byte1, byte2) {
        const unsigned = (byte1 << 8) | byte2;
        if (unsigned & 0x8000) {
            return unsigned | 0xffff0000;
        }
        else {
            return unsigned;
        }
    }
    static parse32bit2sComplement(byte1, byte2, byte3, byte4) {
        const unsigned = (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
        const s = (unsigned & 0x80000000) >> 31;
        let res = unsigned & 0xffffffff;
        if (s) {
            res = (~unsigned & 0xffffffff) + 1;
            return -1 * res;
        }
        return res;
    }
    /**
     *
     * @param {*} data string?
     * @param {*} offset offset in the data
     * @returns returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.
     */
    static getByteAt(data, offset) {
        const dataOffset = 0;
        return data.charCodeAt(offset + dataOffset) & 0xff;
    }
    static extractPixelValue(offset, bytes, bitpix) {
        let px_val = undefined; // pixel value
        // let px_val1, px_val2, px_val3, px_val4;
        if (bitpix == 16) {
            // 16-bit 2's complement binary integer
            px_val = ParseUtils.parse16bit2sComplement(bytes[offset], bytes[offset + 1]);
        }
        else if (bitpix == 32) {
            // IEEE 754 half precision (float16) ??
            px_val = ParseUtils.parse32bit2sComplement(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
        }
        else if (bitpix == -32) {
            // 32-bit IEEE single-precision floating point
            // px_val = ParseUtils.parse32bitSinglePrecisionFloatingPoint (this._u8data[offset], this._u8data[offset+1], this._u8data[offset+2], this._u8data[offset+3]);
            px_val = ParseUtils.parseFloatingPointFormat(bytes.slice(offset, offset + 8), 8, 23);
        }
        else if (bitpix == 64) {
            // 64-bit 2's complement binary integer
            throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");
        }
        else if (bitpix == -64) {
            // 64-bit IEEE double-precision floating point
            //https://babbage.cs.qc.cuny.edu/ieee-754.old/Decimal.html
            px_val = ParseUtils.parseFloatingPointFormat(bytes.slice(offset, offset + 8), 11, 52);
        }
        return px_val;
    }
}
// export default ParseUtils;


/***/ }),

/***/ "./src/model/FITSHeader.ts":
/*!*********************************!*\
  !*** ./src/model/FITSHeader.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FITSHeader": () => (/* binding */ FITSHeader)
/* harmony export */ });
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
// reference FTIS standard doc https://heasarc.gsfc.nasa.gov/docs/fcg/standard_dict.html
class FITSHeader extends Map {
    constructor() {
        super();
        this._offset = undefined;
        this._items = [];
    }
    set offset(offset) {
        this._offset = offset;
    }
    get offset() {
        return this._offset;
    }
    getItemList() {
        return this._items;
    }
    getItemListOf(key) {
        const res = [];
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (item.key == key) {
                res.push(item);
            }
        }
        return res;
    }
    addItemAtTheBeginning(item) {
        if (item.key !== undefined) {
            if ([
                "SIMPLE",
                "BITPIX",
                "NAXIS",
                "NAXIS1",
                "NAXIS2",
                "BLANK",
                "BZERO",
                "BSCALE",
                "DATAMIN",
                "DATAMAX",
                "NPIX",
                "ORDER",
                "CRPIX1",
                "CRPIX2",
                "CDELT1",
                "CDELT2",
            ].includes(item.key)) {
                this.set(item.key, item.value);
            }
        }
        const newitemlist = [item].concat(this._items);
        this._items = newitemlist;
    }
    addItem(item) {
        if (item.key !== undefined) {
            if ([
                "SIMPLE",
                "BITPIX",
                "NAXIS",
                "NAXIS1",
                "NAXIS2",
                "BLANK",
                "BZERO",
                "BSCALE",
                "DATAMIN",
                "DATAMAX",
                "NPIX",
                "ORDER",
                "CRPIX1",
                "CRPIX2",
                "CDELT1",
                "CDELT2",
            ].includes(item.key)) {
                this.set(item.key, item.value);
            }
        }
        this._items.push(item);
    }
    getNumRows() {
        return this._items.length;
    }
}


/***/ }),

/***/ "./src/model/FITSHeaderItem.ts":
/*!*************************************!*\
  !*** ./src/model/FITSHeaderItem.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FITSHeaderItem": () => (/* binding */ FITSHeaderItem)
/* harmony export */ });
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
class FITSHeaderItem {
    constructor(key, value, comment) {
        this._key = key !== undefined ? key : undefined;
        this._value = value !== undefined ? value : undefined;
        this._comment = comment !== undefined ? comment : undefined;
    }
    get key() {
        return this._key;
    }
    get comment() {
        return this._comment;
    }
    get value() {
        return this._value;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js?h=" + {"src_getLocalFile_ts":"9afec65ea2038faa319b","vendors-node_modules_cross-fetch_dist_browser-ponyfill_js":"5a425c3391776f7feb23","src_getFile_ts":"802148f805683517f068"}[chunkId] + "";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "jsfitsio:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"jsfitsio": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkjsfitsio"] = self["webpackChunkjsfitsio"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FITSHeader": () => (/* reexport safe */ _model_FITSHeader_js__WEBPACK_IMPORTED_MODULE_1__.FITSHeader),
/* harmony export */   "FITSHeaderItem": () => (/* reexport safe */ _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_0__.FITSHeaderItem),
/* harmony export */   "FITSParser": () => (/* reexport safe */ _FITSParser_js__WEBPACK_IMPORTED_MODULE_2__.FITSParser),
/* harmony export */   "FITSWriter": () => (/* reexport safe */ _FITSWriter_js__WEBPACK_IMPORTED_MODULE_3__.FITSWriter),
/* harmony export */   "ParseHeader": () => (/* reexport safe */ _ParseHeader_js__WEBPACK_IMPORTED_MODULE_4__.ParseHeader),
/* harmony export */   "ParsePayload": () => (/* reexport safe */ _ParsePayload_js__WEBPACK_IMPORTED_MODULE_5__.ParsePayload),
/* harmony export */   "ParseUtils": () => (/* reexport safe */ _ParseUtils_js__WEBPACK_IMPORTED_MODULE_6__.ParseUtils)
/* harmony export */ });
/* harmony import */ var _model_FITSHeaderItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/FITSHeaderItem.js */ "./src/model/FITSHeaderItem.ts");
/* harmony import */ var _model_FITSHeader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/FITSHeader.js */ "./src/model/FITSHeader.ts");
/* harmony import */ var _FITSParser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FITSParser.js */ "./src/FITSParser.ts");
/* harmony import */ var _FITSWriter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FITSWriter.js */ "./src/FITSWriter.ts");
/* harmony import */ var _ParseHeader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ParseHeader.js */ "./src/ParseHeader.ts");
/* harmony import */ var _ParsePayload_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ParsePayload.js */ "./src/ParsePayload.ts");
/* harmony import */ var _ParseUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ParseUtils.js */ "./src/ParseUtils.ts");








})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=jsfitsio.js.map