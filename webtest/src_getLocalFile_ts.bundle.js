(self["webpackChunkjsfitsio"] = self["webpackChunkjsfitsio"] || []).push([["src_getLocalFile_ts"],{

/***/ "./src/getLocalFile.ts":
/*!*****************************!*\
  !*** ./src/getLocalFile.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLocalFile": () => (/* binding */ getLocalFile)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs/promises */ "node:fs/promises");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'url'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const __filename = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'url'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("file:///Users/fgiordano/Desktop/dottorato/FITSParser/src/getLocalFile.ts");
const __dirname = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(__filename);
function getLocalFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(__dirname);
        let buffer;
        buffer = yield (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile)("/Users/fgiordano/Desktop/dottorato/FITSParser/" + path);
        return buffer;
    });
}


/***/ }),

/***/ "node:fs/promises":
/*!************************!*\
  !*** node:fs/promises ***!
  \************************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:fs/promises\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at /Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/webpack/lib/NormalModule.js:832:25\n    at Hook.eval [as callAsync] (eval at create (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/tapable/lib/Hook.js:18:14)\n    at Object.processResource (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/webpack/lib/NormalModule.js:829:8)\n    at processResource (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/loader-runner/lib/LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/loader-runner/lib/LoaderRunner.js:171:10)\n    at runLoaders (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/loader-runner/lib/LoaderRunner.js:398:2)\n    at NormalModule._doBuild (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/webpack/lib/NormalModule.js:819:3)\n    at NormalModule.build (/Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/webpack/lib/NormalModule.js:963:15)\n    at /Users/fgiordano/Desktop/dottorato/FITSParser/node_modules/webpack/lib/Compilation.js:1371:12");

/***/ })

}]);
//# sourceMappingURL=src_getLocalFile_ts.bundle.js.map?h=9ac6107a54748f9760b7