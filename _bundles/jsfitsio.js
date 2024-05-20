!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("jsfitsio",[],e):"object"==typeof exports?exports.jsfitsio=e():t.jsfitsio=e()}(self,(()=>(()=>{"use strict";var t,e,r={},i={};function s(t){var e=i[t];if(void 0!==e)return e.exports;var n=i[t]={exports:{}};return r[t].call(n.exports,n,n.exports,s),n.exports}s.m=r,s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var r in e)s.o(e,r)&&!s.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},s.f={},s.e=t=>Promise.all(Object.keys(s.f).reduce(((e,r)=>(s.f[r](t,e),e)),[])),s.u=t=>t+".bundle.js?h="+{483:"932b8edb3934c3fab8eb",646:"e403ea1ed6c03ed1da2d"}[t],s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},e="jsfitsio:",s.l=(r,i,n,o)=>{if(t[r])t[r].push(i);else{var a,l;if(void 0!==n)for(var d=document.getElementsByTagName("script"),h=0;h<d.length;h++){var c=d[h];if(c.getAttribute("src")==r||c.getAttribute("data-webpack")==e+n){a=c;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,s.nc&&a.setAttribute("nonce",s.nc),a.setAttribute("data-webpack",e+n),a.src=r),t[r]=[i];var u=(e,i)=>{a.onerror=a.onload=null,clearTimeout(p);var s=t[r];if(delete t[r],a.parentNode&&a.parentNode.removeChild(a),s&&s.forEach((t=>t(i))),e)return e(i)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),l&&document.head.appendChild(a)}},s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;s.g.importScripts&&(t=s.g.location+"");var e=s.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");if(r.length)for(var i=r.length-1;i>-1&&(!t||!/^http(s?):/.test(t));)t=r[i--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=t})(),(()=>{var t={202:0,924:0};s.f.j=(e,r)=>{var i=s.o(t,e)?t[e]:void 0;if(0!==i)if(i)r.push(i[2]);else{var n=new Promise(((r,s)=>i=t[e]=[r,s]));r.push(i[2]=n);var o=s.p+s.u(e),a=new Error;s.l(o,(r=>{if(s.o(t,e)&&(0!==(i=t[e])&&(t[e]=void 0),i)){var n=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;a.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",a.name="ChunkLoadError",a.type=n,a.request=o,i[1](a)}}),"chunk-"+e,e)}};var e=(e,r)=>{var i,n,[o,a,l]=r,d=0;if(o.some((e=>0!==t[e]))){for(i in a)s.o(a,i)&&(s.m[i]=a[i]);l&&l(s)}for(e&&e(r);d<o.length;d++)n=o[d],s.o(t,n)&&t[n]&&t[n][0](),t[n]=0},r=self.webpackChunkjsfitsio=self.webpackChunkjsfitsio||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})();var n={};s.r(n),s.d(n,{FITSHeader:()=>a,FITSHeaderItem:()=>o,FITSParser:()=>p,FITSWriter:()=>d,ParseHeader:()=>c,ParsePayload:()=>h,ParseUtils:()=>l});class o{constructor(t,e,r){this._key=void 0!==t?t:void 0,this._value=void 0!==e?e:void 0,this._comment=void 0!==r?r:void 0}get key(){return this._key}get comment(){return this._comment}get value(){return this._value}}class a extends Map{constructor(){super(),this._offset=void 0,this._items=[]}set offset(t){this._offset=t}get offset(){return this._offset}getItemList(){return this._items}getItemListOf(t){const e=[];for(let r=0;r<this._items.length;r++){const i=this._items[r];i.key==t&&e.push(i)}return e}addItemAtTheBeginning(t){void 0!==t.key&&["SIMPLE","BITPIX","NAXIS","NAXIS1","NAXIS2","BLANK","BZERO","BSCALE","DATAMIN","DATAMAX","NPIX","ORDER","CRPIX1","CRPIX2","CDELT1","CDELT2","CRVAL1","CRVAL2"].includes(t.key)&&this.set(t.key,t.value);const e=[t].concat(this._items);this._items=e}addItem(t){void 0!==t.key&&["SIMPLE","BITPIX","NAXIS","NAXIS1","NAXIS2","BLANK","BZERO","BSCALE","DATAMIN","DATAMAX","NPIX","ORDER","CRPIX1","CRPIX2","CDELT1","CDELT2","CRVAL1","CRVAL2"].includes(t.key)&&this.set(t.key,t.value),this._items.push(t)}getNumRows(){return this._items.length}}class l{static getStringAt(t,e,r){const i=[];for(let s=e,n=0;s<e+r;s++,n++)i[n]=String.fromCharCode(255&t.charCodeAt(s));return i.join("")}static byteString(t){if(t<0||t>255||t%1!=0)throw new Error(t+" does not fit in a byte");return("000000000"+t.toString(2)).substr(-8)}static parse32bitSinglePrecisionFloatingPoint(t,e,r,i){let s=(((t<<8)+e<<8)+r<<8)+i;return s<0&&(s+=4294967296),(1+(8388607&s)/8388608)*Math.pow(2,((2139095040&s)>>23)-127)}static convertBlankToBytes(t,e){let r=Math.abs(t).toString(2);for(;r.length/8<e;)r+="0";const i=new ArrayBuffer(e),s=new Uint8Array(i);for(let t=0;t<e;t++)s[t]=parseInt(r.substr(8*t,8*(t+1)),2);return s}static parseFloatingPointFormat(t,e,r){const i=[];for(let e=t.length;e;e-=1){let r=t[e-1];for(let t=8;t;t-=1)i.push(r%2?1:0),r>>=1}i.reverse();const s=i.join(""),n=(1<<e-1)-1,o=parseInt(s.substring(0,1),2)?-1:1,a=parseInt(s.substring(1,1+e),2),l=parseInt(s.substring(1+e),2);return a===(1<<e)-1?0!==l?void 0:o*(1/0):a>0?o*Math.pow(2,a-n)*(1+l/Math.pow(2,r)):0!==l?o*Math.pow(2,-(n-1))*(l/Math.pow(2,r)):0*o}static generate16bit2sComplement(t){throw new TypeError("not implemented yet"+t)}static parse16bit2sComplement(t,e){const r=t<<8|e;return 32768&r?4294901760|r:r}static parse32bit2sComplement(t,e,r,i){const s=t<<24|e<<16|r<<8|i;let n=4294967295&s;return(2147483648&s)>>31?(n=1+(4294967295&~s),-1*n):n}static getByteAt(t,e){return 255&t.charCodeAt(e+0)}static extractPixelValue(t,e,r){let i;if(8==r)i=e[0];else if(16==r)i=l.parse16bit2sComplement(e[t],e[t+1]);else if(32==r)i=l.parse32bit2sComplement(e[t],e[t+1],e[t+2],e[t+3]);else if(-32==r)i=l.parseFloatingPointFormat(e.slice(t,t+8),8,23);else{if(64==r)throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");-64==r&&(i=l.parseFloatingPointFormat(e.slice(t,t+8),11,52))}return i}}class d{constructor(){this._headerArray=new Uint8Array,this._payloadArray=new Array,this._fitsData=new Uint8Array}run(t,e){this.prepareHeader(t),this._payloadArray=e,this.prepareFITS()}prepareHeader(t){const e=new o("END");t.addItem(e);let r="";for(let e=0;e<t.getItemList().length;e++){const i=t.getItemList()[e];let s=this.formatHeaderLine(i);void 0!==s&&(r+=s)}const i=(new TextEncoder).encode(r).length,s=2880*Math.ceil(i/2880);for(let t=0;t<s-i;t++)r+=" ";const n=new ArrayBuffer(r.length);this._headerArray=new Uint8Array(n);for(let t=0;t<r.length;t++)this._headerArray[t]=l.getByteAt(r,t)}formatHeaderLine(t){let e,r=t.key,i=t.value,s=t.comment;if(null!=r){if(e=r,"END"==r){for(let t=80;t>r.length;t--)e+=" ";return e}if("COMMENT"==r||"HISTORY"==r){for(let t=0;t<10-r.length;t++)e+=" ";e+=i;const t=e.length;for(let r=80;r>t;r--)e+=" ";return e}for(let t=0;t<8-r.length;t++)e+=" ";if(e+="= ",null!=i){e+=i,null!=s&&(e+=s);const t=e.length;for(let r=80;r>t;r--)e+=" "}else{null!=s&&(e+=s);const t=e.length;for(let r=80;r>t;r--)e+=" "}}else{e="";for(let t=0;t<18;t++)e+=" ";if(null!=s){e+=s;const t=e.length;for(let r=80;r>t;r--)e+=" "}else{e="";for(let t=80;t>0;t--)e+=" "}}return e}prepareFITS(){const t=new Uint8Array(this._headerArray.length+this._payloadArray[0].length*this._payloadArray.length);t.set(this._headerArray,0);for(let e=0;e<this._payloadArray.length;e++){const r=this._payloadArray[e];t.set(r,this._headerArray.length+e*r.length)}this._fitsData=t}typedArrayToURL(){const t=new Blob([this._fitsData],{type:"application/fits"});return URL.createObjectURL(t)}}class h{constructor(t,e){this._u8data=new Uint8Array,this._BZERO=void 0,this._BSCALE=void 0,this._BLANK=void 0,this._BITPIX=void 0,this._NAXIS1=void 0,this._NAXIS2=void 0,this._DATAMIN=void 0,this._DATAMAX=void 0,this._physicalblank=void 0;const r=e.slice(t.offset);this._u8data=new Uint8Array(r),this.init(t)}init(t){if(this._BZERO=t.get("BZERO"),void 0===this._BZERO&&(this._BZERO=0),this._BSCALE=t.get("BSCALE"),void 0===this._BSCALE&&(this._BSCALE=1),this._BLANK=t.get("BLANK"),this._BITPIX=t.get("BITPIX"),this._NAXIS1=t.get("NAXIS1"),this._NAXIS2=t.get("NAXIS2"),this._DATAMIN=t.get("DATAMIN"),this._DATAMAX=t.get("DATAMAX"),this._physicalblank=void 0,void 0===this._DATAMAX||void 0===this._DATAMIN){const[e,r]=this.computePhysicalMinAndMax();this._DATAMAX=r,this._DATAMIN=e;const i=new o("DATAMAX",r," / computed with FITSParser"),s=new o("DATAMIN",e," / computed with FITSParser");t.addItem(i),t.addItem(s)}}computePhysicalMinAndMax(){let t=0;if(void 0===this._BITPIX)throw new Error("BITPIX is not defined");const e=Math.abs(this._BITPIX/8),r=this._u8data.byteLength/e;let i,s,n,o;for(void 0!==this._BLANK&&(this._physicalblank=this.pixel2physicalValue(this._BLANK));t<r;)i=this.extractPixelValue(e*t),void 0!==i?(s=this.pixel2physicalValue(i),void 0===n&&(n=s),void 0===o&&(o=s),void 0!==this._physicalblank&&this._physicalblank===s||(void 0!==s&&(s<n||void 0===n)&&(n=s),void 0!==s&&(s>o||void 0===o)&&(o=s)),t++):t++;return[n,o]}parse(){if(void 0===this._BITPIX)throw new Error("BITPIX is undefined");if(void 0===this._NAXIS1)throw new Error("NAXIS1 is undefined");if(void 0===this._NAXIS2)throw new Error("NAXIS2 is undefined");const t=Math.abs(this._BITPIX/8);let e=this._u8data.byteLength/t;e=this._NAXIS1*this._NAXIS2;let r,i,s=0;const n=[];for(;s<e;){i=Math.floor(s/this._NAXIS1),r=(s-i*this._NAXIS1)*t,0===r&&(n[i]=new Uint8Array(this._NAXIS1*t));for(let e=0;e<t;e++)n[i][r+e]=this._u8data[s*t+e];s++}return n}extractPixelValue(t){let e;if(16==this._BITPIX)e=l.parse16bit2sComplement(this._u8data[t],this._u8data[t+1]);else if(32==this._BITPIX)e=l.parse32bit2sComplement(this._u8data[t],this._u8data[t+1],this._u8data[t+2],this._u8data[t+3]);else if(-32==this._BITPIX)e=l.parseFloatingPointFormat(this._u8data.slice(t,t+4),8,23);else{if(64==this._BITPIX)throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");-64==this._BITPIX&&(e=l.parseFloatingPointFormat(this._u8data.slice(t,t+8),11,52))}return e}pixel2physicalValue(t){if(void 0===this._BZERO||void 0===this._BSCALE)throw new Error("Either BZERO or BSCALE is undefined");return this._BZERO+this._BSCALE*t}}class c{static parse(t){const e=new TextDecoder("iso-8859-1"),r=new a;let i,s,n,l,d,h,u,p=0,f="";for(h=null;"END"!==f&&t.length>0;){if(s=new Uint8Array(t.slice(80*p,80*p+80)),p++,n=new Uint8Array(s.slice(0,8)),f=e.decode(n).trim(),d=new Uint8Array(s.slice(8,10)),l=new Uint8Array(s.slice(10,80)),i=e.decode(l).trim(),61==d[0]&&32==d[1]){let t=32;for(let e=0;e<l.length;e++)if(32!=l[e]){t=l[e];break}39!=t&&Number(i)?84==t||70==t?u=c.parseLogicalValue(l):(i=e.decode(l).trim(),u=i.includes(".")?c.parseFloatValue(l):c.parseIntValue(l)):u=c.parseLogicalValue(l),h=new o(f,u.val,u.comment)}else if("COMMENT"==f||"HISTORY"==f)h=new o(f,void 0,i);else{let t=32;for(let e=0;e<l.length;e++)if(32!=l[e]){t=l[e];break}47==t?h=new o(void 0,void 0,i):32==t&&(h=new o(void 0,void 0,void 0))}null!=h&&r.addItem(h)}h=new o("COMMENT","FITS generated with FITSParser on ",void 0),r.addItem(h);const m=new Date;h=new o("COMMENT",m.toString()),r.addItem(h);const A=2880*Math.ceil(p/36);return r.offset=A,r}static parseStringValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim(),r=e.lastIndexOf("/");return{val:e.substring(0,r),comment:e.substring(r)}}static parseLogicalValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim().split("/");return void 0===e[1]?{val:e[0].trim(),comment:void 0}:{val:e[0].trim(),comment:" /"+e[1]}}static parseIntValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim().split("/");return void 0===e[1]?{val:parseInt(e[0].trim()),comment:void 0}:{val:parseInt(e[0].trim()),comment:" /"+e[1]}}static parseFloatValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim().split("/");return void 0===e[1]?{val:parseFloat(e[0].trim()),comment:void 0}:{val:parseFloat(e[0].trim()),comment:" /"+e[1]}}}var u=function(t,e,r,i){return new(r||(r=Promise))((function(s,n){function o(t){try{l(i.next(t))}catch(t){n(t)}}function a(t){try{l(i.throw(t))}catch(t){n(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(o,a)}l((i=i.apply(t,e||[])).next())}))};class p{constructor(t){this._url=t}loadFITS(){return u(this,void 0,void 0,(function*(){return this.getFile(this._url).then((t=>{if(null!==t&&t.byteLength>0){const e=new Uint8Array(t);return this.processFits(e)}return null})).catch((t=>{var e,r;if(null===(r=null===(e=null==t?void 0:t.response)||void 0===e?void 0:e.data)||void 0===r?void 0:r.message)throw new Error("[FITSParser->loadFITS] "+t.response.data.message);throw t}))}))}processFits(t){const e=c.parse(t);return{header:e,data:new h(e,t).parse()}}static generateFITS(t,e){const r=new d;return r.run(t,e),r.typedArrayToURL()}getFile(t){return u(this,void 0,void 0,(function*(){if(t.substring(0,5).toLowerCase().includes("http"))return(yield s.e(646).then(s.bind(s,646))).getFile(t).then((t=>t)).catch((t=>null));{let e=yield s.e(483).then(s.bind(s,483));return yield e.getLocalFile(t)}}))}}return n})()));
//# sourceMappingURL=jsfitsio.js.map