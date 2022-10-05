import { FITSParser } from './lib-esm/FITSParser.js';
var fileuri = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
var fp = new FITSParser(fileuri);
// const fits = await fp.loadFITS();
var promise = fp.loadFITS();
promise.then(function (fits) {
    if (fits !== null) {
        console.log(fits === null || fits === void 0 ? void 0 : fits.header);
        var blobUrl = FITSParser.generateFITS(fits.header, fits.data);
        console.log(blobUrl);
    }
    else {
        console.log("Empty data");
    }
});
