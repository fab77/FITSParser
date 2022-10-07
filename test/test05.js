// download fits and parse it (show header and footer)
import { FITSParser } from '../lib-esm/FITSParser.js';

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log("Loading fits from local filesystem and parse it (shows some header keywords and the payload data bytes length)")
// console.log(__dirname+'/input/Mercator.fits');
const fileuri = __dirname+"/inputs/Npix43348.fits";
console.log(`loading ${fileuri}`);
const fp = new FITSParser(fileuri);
const promise = fp.loadFITS();
promise.then(function (fits) {
    console.log("file parsed");
    if (fits !== null) {
        console.log(fits === null || fits === void 0 ? void 0 : fits.header);

        console.log(`BITPIX: ${fits.header.get('BITPIX')}`);
        console.log(`NAXIS1: ${fits.header.get('NAXIS1')}`);
        console.log(`NAXIS2: ${fits.header.get('NAXIS2')}`);
        console.log(`payload bytes length ${fits.data.length * fits.data[0].length}`);

    }
    else {
        console.log("Empty data");
    }
});

