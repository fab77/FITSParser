import {FITSParser} from "../src/FITSParser";

describe("Reading FITS file from local filesystem:", function() {
    it("Reading HiPS FITS", async () =>  {
        const fileuri = "./test/inputs/x0c70103t_c1f.fits";
        const fp = new FITSParser(fileuri);
        const fits = await fp.loadFITS();
        FITSParser.writeFITS(fits.header, fits.data, "./test/output/FITSFromLocalFS.fits");
        
    });
});
