// download fits and parse it (show header and footer)
import { FITSParser } from '../lib-esm/FITSParser.js';
import { FITSWriter } from '../lib-esm/FITSWriter.js';
// import { writeFITS } from '../lib-esm/FSWriter.js'

import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Download fits and parse it (shows some header keywords and the payload data bytes length)");
const fileuri = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
// const fileuri = "https://skies.esac.esa.int/VTSSHa//Norder2/Dir0/Npix30.fits";
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

        let fw = new FITSWriter()
        fw.run(fits.header, fits.data);
        // writeFITS("./test/output/test01-1.fits", fw._fitsData);
        fs.writeFile(__dirname+"/output/test01-1.fits", fw._fitsData);
        console.log("File created");
    } else {
        console.log("Empty data");
    }
});


