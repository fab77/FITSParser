import { FITSHeader } from '../lib-esm/model/FITSHeader.js';
import { FITSParser } from '../lib-esm/FITSParser.js';
import { FITSWriter } from '../lib-esm/FITSWriter.js';
import { writeFITS } from '../lib-esm/FSWriter.js'
import { FITSHeaderItem } from '../lib-esm/model/FITSHeaderItem.js';

var header = new FITSHeader();
var hSimple = new FITSHeaderItem("SIMPLE", "T");
var hBitpix = new FITSHeaderItem("BITPIX", -64);
var hBscale = new FITSHeaderItem("BSCALE", 1);
var hBzero = new FITSHeaderItem("BZERO", 0);
var hNaxis = new FITSHeaderItem("NAXIS", 2);
var hNaxis1 = new FITSHeaderItem("NAXIS1", 512);
var hNaxis2 = new FITSHeaderItem("NAXIS2", 512);
// var hCtype1 = new FITSHeaderItem("CTYPE1", "RA---MER");
// var hCtype2 = new FITSHeaderItem("CTYPE2", "DEC--MER");

var hCtype1 = new FITSHeaderItem("CTYPE1", "RA---HPX");
var hCtype2 = new FITSHeaderItem("CTYPE2", "DEC--HPX");

// var hCdelt1 = new FITSHeaderItem("CDELT1", 0.0005);
// var hCdelt2 = new FITSHeaderItem("CDELT2", 0.0005);

// var hCrpix1 = new FITSHeaderItem("CRPIX1", 200);
// var hCrpix2 = new FITSHeaderItem("CRPIX2", 200);

// var hCrval1 = new FITSHeaderItem("CRVAL1", 12.350388900000123);
// var hCrval2 = new FITSHeaderItem("CRVAL2", 50.74485150000047);

// var hDatamin = new FITSHeaderItem("DATAMIN", -0.022566006690815016);
// var hDatamax = new FITSHeaderItem("DATAMAX", 0.21175157656197194);

var hEnd = new FITSHeaderItem("END");

header.addItemAtTheBeginning(hSimple);
header.addItem(hBitpix);
header.addItem(hBscale);
header.addItem(hBzero);
header.addItem(hNaxis);
header.addItem(hNaxis1);
header.addItem(hNaxis2);
header.addItem(hCtype1);
header.addItem(hCtype2);
// header.addItem(hCdelt1);
// header.addItem(hCdelt2);
// header.addItem(hCrpix1);
// header.addItem(hCrpix2);
// header.addItem(hCrval1);
// header.addItem(hCrval2);
// header.addItem(hCrval1);
// header.addItem(hDatamin);
// header.addItem(hDatamax);
header.addItem(hEnd);




var fileuri = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
var fp = new FITSParser(fileuri);
// const fits = await fp.loadFITS();
var promise = fp.loadFITS();
promise.then(function (fits) {
    if (fits !== null) {
        console.log(fits === null || fits === void 0 ? void 0 : fits.header);
        let pxvalArray = convertTo64bitIEEEfloatingPoint(fits.data);
        let phvalArray = pixelValue2PhysicalValue(pxvalArray, hBzero, hBscale);
        console.log(phvalArray);
        // var blobUrl = FITSParser.generateFITS(fits.header, fits.data);
        // console.log(blobUrl);

        // let flatUint8 = [];
        // for (let uint of phvalArray) [...flatUint8] = [...flatUint8, ...uint];

        // for (let a = 0; a < uint8.length; a++) {}

        let phvalArrayUint8 = new Uint8Array(phvalArray.buffer);
        let uint8 = [];
        for (let h = 0; h < phvalArrayUint8.length; h+= (512*8)) {
            let u8 = new Uint8Array(512 * 8);
            for (let r = 0; r < (512*8); r++) {
                u8[r] = phvalArrayUint8[h+r];
            }
            uint8.push(u8);
        }

        let fw = new FITSWriter();
        fw.run(header, uint8);
        writeFITS("./p1.fits", fw._fitsData);
        // const p = fw.typedArrayToURL();
        // console.log(p);
    }
    else {
        console.log("Empty data");
    }
});




function pixelValue2PhysicalValue(dataArray, bzero, bscale) {
    if (bzero == 0 && bscale == 1.0) {
        return dataArray;
    }
    let res = new Float64Array(dataArray.length);
    for (let n = 0; n < dataArray.length; n++) {
        let phval = bzero.value + dataArray[n] * bscale.value;
        res[n] = phval;
    }
    return res;
}




function physicalValue2PixelValue(dataArray, bzero, bscale) {
    if (bzero == 0 && bscale == 1.0) {
        return dataArray;
    }

    for (let n = 0; n < dataArray.length; n++) {
        let pxval = (phval - bzero) / bscale;
    }
    return pxval;
}

function convertTo64bitIEEEfloatingPoint(dataArray) { // bitpix -64
    console.log('[64bitIEEEfloatingPoint]');
    // let data64 = new Float64Array(dataArray.length * (dataArray[0].length/8));


    let flatUint8Data = new Uint8Array(dataArray.length * dataArray[0].length);
    let fidx = 0;
    for (let c = 0; c < dataArray.length; c++) {
        for (let d = 0; d < dataArray[c].length; d++) {

            flatUint8Data[fidx] = dataArray[c][d];
            // if (dataArray[c][d] !== 0 && dataArray[c][d] !== 127 && dataArray[c][d] !== 248) {
            //     console.log(`c ${c} d ${d} dataArray[${c}][${d}] ${dataArray[c][d]}`)
            // }
            fidx++;
        }

    }
    let data64 = new Float64Array(flatUint8Data.buffer);


    console.log(data64);
    return data64;

}
