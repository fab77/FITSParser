"use strict";
(self["webpackChunkjsfitsio"] = self["webpackChunkjsfitsio"] || []).push([["src_getFile_ts"],{

/***/ "./src/getFile.ts":
/*!************************!*\
  !*** ./src/getFile.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFile": () => (/* binding */ getFile)
/* harmony export */ });
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js");
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cross_fetch__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function getFile(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        response = yield cross_fetch__WEBPACK_IMPORTED_MODULE_0___default()(uri);
        if (!response.ok) {
            return new ArrayBuffer(0);
        }
        else {
            return response.arrayBuffer();
        }
    });
}


/***/ })

}]);
//# sourceMappingURL=src_getFile_ts.bundle.js.map?h=2feb2813035f192d10da