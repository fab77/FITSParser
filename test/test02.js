
import { FITSHeader } from '../lib-esm/model/FITSHeader.js';
import { FITSWriter } from '../lib-esm/FITSWriter.js';
import { writeFITS } from '../lib-esm/FSWriter.js'
import { FITSHeaderItem } from '../lib-esm/model/FITSHeaderItem.js';
import myfits from './test02.json' assert {type: 'json'};

console.log("Write fits file in the local FS starting from data passed (in a JSON in this case)");
let header = new FITSHeader();
const hSimple = new FITSHeaderItem("SIMPLE", myfits.simple);
const hBitpix = new FITSHeaderItem("BITPIX", myfits.bitpix);
const hBscale = new FITSHeaderItem("BSCALE", myfits.bscale);
const hBzero = new FITSHeaderItem("BZERO", myfits.bzero);
const hNaxis = new FITSHeaderItem("NAXIS", myfits.naxis);
const hNaxis1 = new FITSHeaderItem("NAXIS1", myfits.naxis1);
const hNaxis2 = new FITSHeaderItem("NAXIS2", myfits.naxis2);
const hCtype1 = new FITSHeaderItem("CTYPE1", myfits.ctype1);
const hCtype2 = new FITSHeaderItem("CTYPE2", myfits.ctype2);

const hEnd = new FITSHeaderItem("END");

header.addItemAtTheBeginning(hSimple);
header.addItem(hBitpix);
header.addItem(hBscale);
header.addItem(hBzero);
header.addItem(hNaxis);
header.addItem(hNaxis1);
header.addItem(hNaxis2);
header.addItem(hCtype1);
header.addItem(hCtype2);
header.addItem(hEnd);

let fitsData = [];
let bytesXWord;
if (hBitpix.value == -64) { // 64bitIEEEfloatingPoint
    fitsData = new Float64Array(myfits.physicalValues);
    bytesXWord = 8;
} else if (hBitpix.value == -32) { // 32bitIEEEfloatingPoint
    fitsData = new Float32Array(myfits.physicalValues);
    bytesXWord = 4;
} else if (hBitpix.value == 16) { // 16bit2sComplement
    fitsData = new Int16Array(myfits.physicalValues);
    bytesXWord = 2;
} else if (hBitpix.value == 32) { // 32bit2sComplement
    fitsData = new Int32Array(myfits.physicalValues);
    bytesXWord = 4;
} else if (hBitpix.value == 64) { // 64bit2sComplement
    fitsData = new BigInt64Array(myfits.physicalValues);
    bytesXWord = 8;
}

if(fitsData.length > 0) {
    let phvalArrayUint8 = new Uint8Array(fitsData.buffer);
    let uint8 = [];
    for (let h = 0; h < phvalArrayUint8.length; h += (hNaxis1 * bytesXWord)) {
        let u8 = new Uint8Array(hNaxis2 * bytesXWord);
        for (let r = 0; r < (hNaxis2 * bytesXWord); r++) {
            u8[r] = phvalArrayUint8[h + r];
        }
        uint8.push(u8);
    }
    
    let fw = new FITSWriter();
    fw.run(header, uint8);
    writeFITS("./test/output/test02.fits", fw._fitsData);
}
