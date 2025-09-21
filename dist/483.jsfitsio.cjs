"use strict";
exports.id = 483;
exports.ids = [483];
exports.modules = {

/***/ 483:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLocalFile: () => (/* binding */ getLocalFile)
/* harmony export */ });
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(455);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs_promises__WEBPACK_IMPORTED_MODULE_0__);

// import path from 'path';
// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
async function getLocalFile(path) {
    // let buffer: Buffer;
    try {
        const response = await (0,node_fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile)(path);
        if (response) {
            return response;
        }
        else {
            return null;
        }
        // buffer = await readFile(path);
    }
    catch (error) {
        console.error("Failed to read path:", path, "\nError:", error);
        return null;
    }
}


/***/ })

};
;
//# sourceMappingURL=483.jsfitsio.cjs.map