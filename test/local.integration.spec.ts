import {FITSParser} from "../src/FITSParser";

describe("Reading FITS file from local filesystem:", function() {
    it("Reading HiPS FITS", async () =>  {
        let fileuri: string = "./test/inputs/x0c70103t_c1f.fits";
        let fp = new FITSParser(fileuri);
        let fits = await fp.loadFITS();
        // console.log(fits.header);
        FITSParser.writeFITS(fits.header, fits.data, "./test/output/FITSFromLocalFS.fits");
        
    });
});
