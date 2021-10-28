import FITSParser from "../src/FITSParser.js";
import assert, { doesNotMatch } from 'assert';




describe("Reading FITS file:", function() {
    it("type:HiPS, from Herschel", async function() {
        let fileuri = "/Users/fgiordano/Workspace/GitHub/FITSParser/test/inputs/Npix278.fits";
        let fp = new FITSParser(fileuri, function(res){
            assert.equal(res.header.get('NPIX'), '278');
        });
    });
});