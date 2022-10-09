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
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs/promises */ "?6e4c");
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// import path from 'path';
// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
function getLocalFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let buffer;
        buffer = yield (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile)(path);
        return buffer;
    });
}


/***/ }),

/***/ "?6e4c":
/*!**********************************!*\
  !*** node:fs/promises (ignored) ***!
  \**********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=src_getLocalFile_ts.bundle.js.map?h=9afec65ea2038faa319b