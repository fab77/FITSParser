// TBD
// import { FITSParser } from '../lib-esm/FITSParser-node.js';
import * as p from '../lib-esm/index-node.js';

console.log(p);



// console.log("Download fits and parse it (shows some header keywords and the payload data bytes length)");
// const fileuri = "./inputs/Npix278.fits";
// const fp = new FITSParser(fileuri);
// const promise = fp.loadFITS();
// promise.then(function (fits) {
//     if (fits !== null) {
//         console.log(fits === null || fits === void 0 ? void 0 : fits.header);

//         console.log(`BITPIX: ${fits.header.get('BITPIX')}`);
//         console.log(`NAXIS1: ${fits.header.get('NAXIS1')}`);
//         console.log(`NAXIS2: ${fits.header.get('NAXIS2')}`);
//         console.log(`payload bytes length ${fits.data.length * fits.data[0].length}`);

//     }
//     else {
//         console.log("Empty data");
//     }
// });
