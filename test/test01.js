// download fits and parse it (show header and footer)
import { FITSParser } from '../lib-esm/FITSParser.js';


console.log("Download fits and parse it (shows some header keywords and the payload data bytes length)");
const fileuri = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
const fp = new FITSParser(fileuri);
const promise = fp.loadFITS();
promise.then(function (fits) {
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

