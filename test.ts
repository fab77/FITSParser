import { FITSParser } from './lib-esm/FITSParser.js';




const fileuri = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
const fp = new FITSParser(fileuri);

// const fits = await fp.loadFITS();
let promise = fp.loadFITS();
promise.then( (fits) => {
    if (fits !== null) {
        console.log(fits?.header);
        const blobUrl = FITSParser.generateFITS(fits.header, fits.data);
        console.log(blobUrl);
    } else {
        console.log("Empty data");
    }
})


