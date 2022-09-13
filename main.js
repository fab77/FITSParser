var FITSioAPI;(()=>{var t={300:(t,e)=>{"use strict";var r=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r)return r;throw new Error("unable to locate global object")}();t.exports=e=r.fetch,r.fetch&&(e.default=r.fetch.bind(r)),e.Headers=r.Headers,e.Request=r.Request,e.Response=r.Response},520:(t,e,r)=>{"use strict";var n=r(155),i="win32"===n.platform,o=r(539);function s(t,e){for(var r=[],n=0;n<t.length;n++){var i=t[n];i&&"."!==i&&(".."===i?r.length&&".."!==r[r.length-1]?r.pop():e&&r.push(".."):r.push(i))}return r}function a(t){for(var e=t.length-1,r=0;r<=e&&!t[r];r++);for(var n=e;n>=0&&!t[n];n--);return 0===r&&n===e?t:r>n?[]:t.slice(r,n+1)}var l=/^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,u=/^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/,c={};function f(t){var e=l.exec(t),r=(e[1]||"")+(e[2]||""),n=e[3]||"",i=u.exec(n);return[r,i[1],i[2],i[3]]}function p(t){var e=l.exec(t),r=e[1]||"",n=!!r&&":"!==r[1];return{device:r,isUnc:n,isAbsolute:n||!!e[2],tail:e[3]}}function h(t){return"\\\\"+t.replace(/^[\\\/]+/,"").replace(/[\\\/]+/g,"\\")}c.resolve=function(){for(var t="",e="",r=!1,i=arguments.length-1;i>=-1;i--){var a;if(i>=0?a=arguments[i]:t?(a=n.env["="+t])&&a.substr(0,3).toLowerCase()===t.toLowerCase()+"\\"||(a=t+"\\"):a=n.cwd(),!o.isString(a))throw new TypeError("Arguments to path.resolve must be strings");if(a){var l=p(a),u=l.device,c=l.isUnc,f=l.isAbsolute,d=l.tail;if((!u||!t||u.toLowerCase()===t.toLowerCase())&&(t||(t=u),r||(e=d+"\\"+e,r=f),t&&r))break}}return c&&(t=h(t)),t+(r?"\\":"")+(e=s(e.split(/[\\\/]+/),!r).join("\\"))||"."},c.normalize=function(t){var e=p(t),r=e.device,n=e.isUnc,i=e.isAbsolute,o=e.tail,a=/[\\\/]$/.test(o);return(o=s(o.split(/[\\\/]+/),!i).join("\\"))||i||(o="."),o&&a&&(o+="\\"),n&&(r=h(r)),r+(i?"\\":"")+o},c.isAbsolute=function(t){return p(t).isAbsolute},c.join=function(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(!o.isString(r))throw new TypeError("Arguments to path.join must be strings");r&&t.push(r)}var n=t.join("\\");return/^[\\\/]{2}[^\\\/]/.test(t[0])||(n=n.replace(/^[\\\/]{2,}/,"\\")),c.normalize(n)},c.relative=function(t,e){t=c.resolve(t),e=c.resolve(e);for(var r=t.toLowerCase(),n=e.toLowerCase(),i=a(e.split("\\")),o=a(r.split("\\")),s=a(n.split("\\")),l=Math.min(o.length,s.length),u=l,f=0;f<l;f++)if(o[f]!==s[f]){u=f;break}if(0==u)return e;var p=[];for(f=u;f<o.length;f++)p.push("..");return(p=p.concat(i.slice(u))).join("\\")},c._makeLong=function(t){if(!o.isString(t))return t;if(!t)return"";var e=c.resolve(t);return/^[a-zA-Z]\:\\/.test(e)?"\\\\?\\"+e:/^\\\\[^?.]/.test(e)?"\\\\?\\UNC\\"+e.substring(2):t},c.dirname=function(t){var e=f(t),r=e[0],n=e[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},c.basename=function(t,e){var r=f(t)[2];return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},c.extname=function(t){return f(t)[3]},c.format=function(t){if(!o.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof t);var e=t.root||"";if(!o.isString(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof t.root);var r=t.dir,n=t.base||"";return r?r[r.length-1]===c.sep?r+n:r+c.sep+n:n},c.parse=function(t){if(!o.isString(t))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof t);var e=f(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return{root:e[0],dir:e[0]+e[1].slice(0,-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},c.sep="\\",c.delimiter=";";var d=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,g={};function m(t){return d.exec(t).slice(1)}g.resolve=function(){for(var t="",e=!1,r=arguments.length-1;r>=-1&&!e;r--){var i=r>=0?arguments[r]:n.cwd();if(!o.isString(i))throw new TypeError("Arguments to path.resolve must be strings");i&&(t=i+"/"+t,e="/"===i[0])}return(e?"/":"")+(t=s(t.split("/"),!e).join("/"))||"."},g.normalize=function(t){var e=g.isAbsolute(t),r=t&&"/"===t[t.length-1];return(t=s(t.split("/"),!e).join("/"))||e||(t="."),t&&r&&(t+="/"),(e?"/":"")+t},g.isAbsolute=function(t){return"/"===t.charAt(0)},g.join=function(){for(var t="",e=0;e<arguments.length;e++){var r=arguments[e];if(!o.isString(r))throw new TypeError("Arguments to path.join must be strings");r&&(t+=t?"/"+r:r)}return g.normalize(t)},g.relative=function(t,e){t=g.resolve(t).substr(1),e=g.resolve(e).substr(1);for(var r=a(t.split("/")),n=a(e.split("/")),i=Math.min(r.length,n.length),o=i,s=0;s<i;s++)if(r[s]!==n[s]){o=s;break}var l=[];for(s=o;s<r.length;s++)l.push("..");return(l=l.concat(n.slice(o))).join("/")},g._makeLong=function(t){return t},g.dirname=function(t){var e=m(t),r=e[0],n=e[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},g.basename=function(t,e){var r=m(t)[2];return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},g.extname=function(t){return m(t)[3]},g.format=function(t){if(!o.isObject(t))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof t);var e=t.root||"";if(!o.isString(e))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof t.root);return(t.dir?t.dir+g.sep:"")+(t.base||"")},g.parse=function(t){if(!o.isString(t))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof t);var e=m(t);if(!e||4!==e.length)throw new TypeError("Invalid path '"+t+"'");return e[1]=e[1]||"",e[2]=e[2]||"",e[3]=e[3]||"",{root:e[0],dir:e[0]+e[1].slice(0,-1),base:e[2],ext:e[3],name:e[2].slice(0,e[2].length-e[3].length)}},g.sep="/",g.delimiter=":",t.exports=i?c:g,t.exports.posix=g,t.exports.win32=c},155:t=>{var e,r,n=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function s(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(r){try{return e.call(null,t,0)}catch(r){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(t){r=o}}();var a,l=[],u=!1,c=-1;function f(){u&&a&&(u=!1,a.length?l=a.concat(l):c=-1,l.length&&p())}function p(){if(!u){var t=s(f);u=!0;for(var e=l.length;e;){for(a=l,l=[];++c<e;)a&&a[c].run();c=-1,e=l.length}a=null,u=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function h(t,e){this.fun=t,this.array=e}function d(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];l.push(new h(t,e)),1!==l.length||u||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=d,n.addListener=d,n.once=d,n.off=d,n.removeListener=d,n.removeAllListeners=d,n.emit=d,n.prependListener=d,n.prependOnceListener=d,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},496:t=>{"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},384:t=>{t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},539:(t,e,r)=>{var n=r(155),i=/%[sdj%]/g;e.format=function(t){if(!y(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(a(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,o=n.length,s=String(t).replace(i,(function(t){if("%%"===t)return"%";if(r>=o)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return t}})),l=n[r];r<o;l=n[++r])g(l)||!b(l)?s+=" "+l:s+=" "+a(l);return s},e.deprecate=function(t,i){if(v(r.g.process))return function(){return e.deprecate(t,i).apply(this,arguments)};if(!0===n.noDeprecation)return t;var o=!1;return function(){if(!o){if(n.throwDeprecation)throw new Error(i);n.traceDeprecation?console.trace(i):console.error(i),o=!0}return t.apply(this,arguments)}};var o,s={};function a(t,r){var n={seen:[],stylize:u};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),d(r)?n.showHidden=r:r&&e._extend(n,r),v(n.showHidden)&&(n.showHidden=!1),v(n.depth)&&(n.depth=2),v(n.colors)&&(n.colors=!1),v(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=l),c(n,t,n.depth)}function l(t,e){var r=a.styles[e];return r?"["+a.colors[r][0]+"m"+t+"["+a.colors[r][1]+"m":t}function u(t,e){return t}function c(t,r,n){if(t.customInspect&&r&&I(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,t);return y(i)||(i=c(t,i,n)),i}var o=function(t,e){if(v(e))return t.stylize("undefined","undefined");if(y(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return m(e)?t.stylize(""+e,"number"):d(e)?t.stylize(""+e,"boolean"):g(e)?t.stylize("null","null"):void 0}(t,r);if(o)return o;var s=Object.keys(r),a=function(t){var e={};return t.forEach((function(t,r){e[t]=!0})),e}(s);if(t.showHidden&&(s=Object.getOwnPropertyNames(r)),T(r)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return f(r);if(0===s.length){if(I(r)){var l=r.name?": "+r.name:"";return t.stylize("[Function"+l+"]","special")}if(w(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(A(r))return t.stylize(Date.prototype.toString.call(r),"date");if(T(r))return f(r)}var u,b="",S=!1,_=["{","}"];return h(r)&&(S=!0,_=["[","]"]),I(r)&&(b=" [Function"+(r.name?": "+r.name:"")+"]"),w(r)&&(b=" "+RegExp.prototype.toString.call(r)),A(r)&&(b=" "+Date.prototype.toUTCString.call(r)),T(r)&&(b=" "+f(r)),0!==s.length||S&&0!=r.length?n<0?w(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),u=S?function(t,e,r,n,i){for(var o=[],s=0,a=e.length;s<a;++s)P(e,String(s))?o.push(p(t,e,r,n,String(s),!0)):o.push("");return i.forEach((function(i){i.match(/^\d+$/)||o.push(p(t,e,r,n,i,!0))})),o}(t,r,n,a,s):s.map((function(e){return p(t,r,n,a,e,S)})),t.seen.pop(),function(t,e,r){return t.reduce((function(t,e){return e.indexOf("\n"),t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}(u,b,_)):_[0]+b+_[1]}function f(t){return"["+Error.prototype.toString.call(t)+"]"}function p(t,e,r,n,i,o){var s,a,l;if((l=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]}).get?a=l.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):l.set&&(a=t.stylize("[Setter]","special")),P(n,i)||(s="["+i+"]"),a||(t.seen.indexOf(l.value)<0?(a=g(r)?c(t,l.value,null):c(t,l.value,r-1)).indexOf("\n")>-1&&(a=o?a.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+a.split("\n").map((function(t){return"   "+t})).join("\n")):a=t.stylize("[Circular]","special")),v(s)){if(o&&i.match(/^\d+$/))return a;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+a}function h(t){return Array.isArray(t)}function d(t){return"boolean"==typeof t}function g(t){return null===t}function m(t){return"number"==typeof t}function y(t){return"string"==typeof t}function v(t){return void 0===t}function w(t){return b(t)&&"[object RegExp]"===S(t)}function b(t){return"object"==typeof t&&null!==t}function A(t){return b(t)&&"[object Date]"===S(t)}function T(t){return b(t)&&("[object Error]"===S(t)||t instanceof Error)}function I(t){return"function"==typeof t}function S(t){return Object.prototype.toString.call(t)}function _(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(t){if(v(o)&&(o=n.env.NODE_DEBUG||""),t=t.toUpperCase(),!s[t])if(new RegExp("\\b"+t+"\\b","i").test(o)){var r=n.pid;s[t]=function(){var n=e.format.apply(e,arguments);console.error("%s %d: %s",t,r,n)}}else s[t]=function(){};return s[t]},e.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=h,e.isBoolean=d,e.isNull=g,e.isNullOrUndefined=function(t){return null==t},e.isNumber=m,e.isString=y,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=v,e.isRegExp=w,e.isObject=b,e.isDate=A,e.isError=T,e.isFunction=I,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},e.isBuffer=r(384);var E=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function x(){var t=new Date,e=[_(t.getHours()),_(t.getMinutes()),_(t.getSeconds())].join(":");return[t.getDate(),E[t.getMonth()],e].join(" ")}function P(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",x(),e.format.apply(e,arguments))},e.inherits=r(496),e._extend=function(t,e){if(!e||!b(e))return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t}},351:()=>{},288:()=>{}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n),r.d(n,{FITSHeader:()=>l,FITSHeaderItem:()=>e,FITSParser:()=>d,FITSWriter:()=>s,ParseHeader:()=>u,ParsePayload:()=>a,ParseUtils:()=>i,default:()=>g});var t=r(351);class e{constructor(t,e,r){this._key=t,this._value=void 0!==e?e:void 0,this._comment=void 0!==r?r:void 0}get key(){return this._key}get comment(){return this._comment}get value(){return this._value}}class i{static getStringAt(t,e,r){const n=[];for(let i=e,o=0;i<e+r;i++,o++)n[o]=String.fromCharCode(255&t.charCodeAt(i));return n.join("")}static byteString(t){if(t<0||t>255||t%1!=0)throw new Error(t+" does not fit in a byte");return("000000000"+t.toString(2)).substr(-8)}static parse32bitSinglePrecisionFloatingPoint(t,e,r,n){let i=(((t<<8)+e<<8)+r<<8)+n;return i<0&&(i+=4294967296),(1+(8388607&i)/8388608)*Math.pow(2,((2139095040&i)>>23)-127)}static convertBlankToBytes(t,e){let r=Math.abs(t).toString(2);for(;r.length/8<e;)r+="0";const n=new ArrayBuffer(e),i=new Uint8Array(n);for(let t=0;t<e;t++)i[t]=parseInt(r.substr(8*t,8*(t+1)),2);return i}static parseFloatingPointFormat(t,e,r){const n=[];for(let e=t.length;e;e-=1){let r=t[e-1];for(let t=8;t;t-=1)n.push(r%2?1:0),r>>=1}n.reverse();const i=n.join(""),o=(1<<e-1)-1,s=parseInt(i.substring(0,1),2)?-1:1,a=parseInt(i.substring(1,1+e),2),l=parseInt(i.substring(1+e),2);return a===(1<<e)-1?0!==l?void 0:s*(1/0):a>0?s*Math.pow(2,a-o)*(1+l/Math.pow(2,r)):0!==l?s*Math.pow(2,-(o-1))*(l/Math.pow(2,r)):0*s}static generate16bit2sComplement(t){throw new TypeError("not implemented yet"+t)}static parse16bit2sComplement(t,e){const r=t<<8|e;return 32768&r?4294901760|r:r}static parse32bit2sComplement(t,e,r,n){const i=t<<24|e<<16|r<<8|n;let o=4294967295&i;return(2147483648&i)>>31?(o=1+(4294967295&~i),-1*o):o}static getByteAt(t,e){return 255&t.charCodeAt(e+0)}static extractPixelValue(t,e,r){let n;if(16==r)n=i.parse16bit2sComplement(e[t],e[t+1]);else if(32==r)n=i.parse32bit2sComplement(e[t],e[t+1],e[t+2],e[t+3]);else if(-32==r)n=i.parseFloatingPointFormat(e.slice(t,t+8),8,23);else{if(64==r)throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");-64==r&&(n=i.parseFloatingPointFormat(e.slice(t,t+8),11,52))}return n}}var o=r(520);class s{run(t,e){this.prepareHeader(t),this._payloadArray=e,this.prepareFITS()}prepareHeader(t){const r=new e("END",null,null);t.addItem(r);let n="";for(let e=0;e<t.getItemList().length;e++){const r=t.getItemList()[e];n+=this.formatHeaderLine(r.key,r.value,r.comment)}const o=(new TextEncoder).encode(n).length,s=2880*Math.ceil(o/2880);for(let t=0;t<s-o;t++)n+=" ";const a=new ArrayBuffer(n.length);this._headerArray=new Uint8Array(a);for(let t=0;t<n.length;t++)this._headerArray[t]=i.getByteAt(n,t)}formatHeaderLine(t,e,r){let n;if(null!=t){if(n=t,"END"==t){for(let e=80;e>t.length;e--)n+=" ";return n}if("COMMENT"==t||"HISTORY"==t){for(let e=0;e<10-t.length;e++)n+=" ";n+=e;const r=n.length;for(let t=80;t>r;t--)n+=" ";return n}for(let e=0;e<8-t.length;e++)n+=" ";if(n+="= ",null!=e){n+=e,null!=r&&(n+=r);const t=n.length;for(let e=80;e>t;e--)n+=" "}else{null!=r&&(n+=r);const t=n.length;for(let e=80;e>t;e--)n+=" "}}else{n="";for(let t=0;t<18;t++)n+=" ";if(null!=r){n+=r;const t=n.length;for(let e=80;e>t;e--)n+=" "}else{n="";for(let t=80;t>0;t--)n+=" "}}return n}prepareFITS(){const t=new Uint8Array(this._headerArray.length+this._payloadArray[0].length*this._payloadArray.length);t.set(this._headerArray,0);for(let e=0;e<this._payloadArray.length;e++){const r=this._payloadArray[e];t.set(r,this._headerArray.length+e*r.length)}this._fitsData=t}writeFITS(e){const r=o.dirname(e);t.mkdir(r,{recursive:!0},(t=>{if(t)throw t})),t.existsSync(r)?t.writeFileSync(e,this._fitsData):console.error(r+" doesn't exist")}typedArrayToURL(){const t=new Blob([this._fitsData],{type:"application/fits"});return URL.createObjectURL(t)}}class a{constructor(t,e){const r=e.slice(t.offset);this._u8data=new Uint8Array(r),this.init(t)}init(t){if(this._BZERO=t.get("BZERO"),void 0===this._BZERO&&(this._BZERO=0),this._BSCALE=t.get("BSCALE"),void 0===this._BSCALE&&(this._BSCALE=1),this._BLANK=t.get("BLANK"),this._BITPIX=t.get("BITPIX"),this._NAXIS1=t.get("NAXIS1"),this._NAXIS2=t.get("NAXIS2"),this._DATAMIN=t.get("DATAMIN"),this._DATAMAX=t.get("DATAMAX"),this._physicalblank=void 0,void 0===this._DATAMAX||void 0===this._DATAMIN){const[r,n]=this.computePhysicalMinAndMax();this._DATAMAX=n,this._DATAMIN=r;const i=new e("DATAMAX",n," / computed with FITSParser"),o=new e("DATAMIN",r," / computed with FITSParser");t.addItem(i),t.addItem(o)}}computePhysicalMinAndMax(){let t=0;const e=Math.abs(this._BITPIX/8),r=this._u8data.byteLength/e;let n,i,o,s;for(void 0!==this._BLANK&&(this._physicalblank=this.pixel2physicalValue(this._BLANK));t<r;)n=this.extractPixelValue(e*t),i=this.pixel2physicalValue(n),void 0!==this._physicalblank&&this._physicalblank===i||(void 0!==i&&(i<o||void 0===o)&&(o=i),void 0!==i&&(i>s||void 0===s)&&(s=i)),t++;return[o,s]}parse(){const t=Math.abs(this._BITPIX/8);let e=this._u8data.byteLength/t;e=this._NAXIS1*this._NAXIS2;let r,n,i=0;const o=[];for(;i<e;){n=Math.floor(i/this._NAXIS1),r=(i-n*this._NAXIS1)*t,0===r&&(o[n]=new Uint8Array(this._NAXIS1*t));for(let e=0;e<t;e++)o[n][r+e]=this._u8data[i*t+e];i++}return o}extractPixelValue(t){let e;if(16==this._BITPIX)e=i.parse16bit2sComplement(this._u8data[t],this._u8data[t+1]);else if(32==this._BITPIX)e=i.parse32bit2sComplement(this._u8data[t],this._u8data[t+1],this._u8data[t+2],this._u8data[t+3]);else if(-32==this._BITPIX)e=i.parseFloatingPointFormat(this._u8data.slice(t,t+4),8,23);else{if(64==this._BITPIX)throw new Error("BITPIX=64 -> 64-bit 2's complement binary integer NOT supported yet.");-64==this._BITPIX&&(e=i.parseFloatingPointFormat(this._u8data.slice(t,t+8),11,52))}return e}pixel2physicalValue(t){if(void 0!==t)return this._BZERO+this._BSCALE*t}}class l extends Map{constructor(){super(),this._items=[]}set offset(t){this._offset=t}get offset(){return this._offset}getItemList(){return this._items}getItemListOf(t){const e=[];for(let r=0;r<this._items.length;r++){const n=this._items[r];n.key==t&&e.push(n)}return e}addItemAtTheBeginning(t){["SIMPLE","BITPIX","NAXIS","NAXIS1","NAXIS2","BLANK","BZERO","BSCALE","DATAMIN","DATAMAX","NPIX","ORDER","CRPIX1","CRPIX2","CDELT1","CDELT2"].includes(t.key)&&this.set(t.key,t.value);const e=[t].concat(this._items);this._items=e}addItem(t){["SIMPLE","BITPIX","NAXIS","NAXIS1","NAXIS2","BLANK","BZERO","BSCALE","DATAMIN","DATAMAX","NPIX","ORDER","CRPIX1","CRPIX2","CDELT1","CDELT2"].includes(t.key)&&this.set(t.key,t.value),this._items.push(t)}getNumRows(){return this._items.length}}class u{static parse(t){const r=new TextDecoder("iso-8859-1"),n=new l;let i,o,s,a,c,f,p,h=0,d="";for(;"END"!==d;){if(o=new Uint8Array(t.slice(80*h,80*h+80)),h++,s=new Uint8Array(o.slice(0,8)),d=r.decode(s).trim(),c=new Uint8Array(o.slice(8,10)),a=new Uint8Array(o.slice(10,80)),i=r.decode(a).trim(),61==c[0]&&32==c[1]){let t=32;for(let e=0;e<a.length;e++)if(32!=a[e]){t=a[e];break}39==t?p=u.parseStringValue(a):84==t||70==t?p=u.parseLogicalValue(a):(i=r.decode(a).trim(),p=i.includes(".")?u.parseFloatValue(a):u.parseIntValue(a)),f=new e(d,p.val,p.comment)}else if("COMMENT"==d||"HISTORY"==d)f=new e(d,null,i);else{let t=32;for(let e=0;e<a.length;e++)if(32!=a[e]){t=a[e];break}47==t?f=new e(null,null,i):32==t&&(f=new e(null,null,null))}n.addItem(f)}f=new e("COMMENT","FITS generated with FITSParser on ",null),n.addItem(f);const g=new Date;f=new e("COMMENT",g.toString(),null),n.addItem(f);const m=2880*Math.ceil(h/36);return n.offset=m,n}static parseStringValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim(),r=e.lastIndexOf("/"),n=e.substring(0,r);let i=e.substring(r);return void 0===i&&(i=null),{val:n,comment:i}}static parseLogicalValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim().split("/");return void 0===e[1]?{val:e[0].trim(),comment:null}:{val:e[0].trim(),comment:" /"+e[1]}}static parseIntValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim().split("/");return void 0===e[1]?{val:parseInt(e[0].trim()),comment:null}:{val:parseInt(e[0].trim()),comment:" /"+e[1]}}static parseFloatValue(t){const e=new TextDecoder("iso-8859-1").decode(t).trim().split("/");return void 0===e[1]?{val:parseFloat(e[0].trim()),comment:null}:{val:parseFloat(e[0].trim()),comment:" /"+e[1]}}}var c=r(288),f=r(300),p=r.n(f),h=function(t,e,r,n){return new(r||(r=Promise))((function(i,o){function s(t){try{l(n.next(t))}catch(t){o(t)}}function a(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}l((n=n.apply(t,e||[])).next())}))};class d{constructor(t){this._url=t}loadFITS(){return h(this,void 0,void 0,(function*(){return this.getFile(this._url).then((t=>{if(null!==t){const e=new Uint8Array(t);return this.processFits(e)}return null})).catch((t=>{var e,r;if(null===(r=null===(e=null==t?void 0:t.response)||void 0===e?void 0:e.data)||void 0===r?void 0:r.message)throw new Error("[FITSParser->loadFITS] "+t.response.data.message);throw t}))}))}processFits(t){const e=u.parse(t);return{header:e,data:new a(e,t).parse()}}static writeFITS(t,e,r){const n=new s;n.run(t,e),n.writeFITS(r)}getFile(t){return h(this,void 0,void 0,(function*(){return t.substring(0,5).toLowerCase().includes("http")?"undefined"!=typeof window?yield window.fetch(t,{method:"GET",mode:"cors",headers:{Accept:"image/fits","Content-Type":"image/fits","Access-Control-Allow-Origin":"*"}}).then((t=>{if(t.ok)return t.arrayBuffer();throw new Error("File not loaded. HTTP error: "+t.status+" "+t.statusText)})).catch((function(t){throw new Error("[FITSParser->getFile] "+t.response.data.message)})):yield p()(t,{method:"GET",headers:{Accept:"image/fits","Content-Type":"image/fits","Access-Control-Allow-Origin":"*"}}).then((t=>{if(t.ok)return t.arrayBuffer();if(404==t.status)return null;throw new Error("File not loaded. HTTP error: "+t.status+" "+t.statusText)})).catch((t=>{var e,r;if(null===(r=null===(e=null==t?void 0:t.response)||void 0===e?void 0:e.data)||void 0===r?void 0:r.message)throw new Error("[FITSParser->getFile] "+t.response.data.message);throw t})):yield(0,c.readFile)(t)}))}}const g=FITSioAPI=function(t){return new d(t).loadFITS()}})(),FITSioAPI=n})();
//# sourceMappingURL=main.js.map