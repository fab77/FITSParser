import FITSParser from "../src/FITSParser.js";
import assert, { doesNotMatch } from 'assert';



class Pippo {
    notify(fits) {
        console.log("Hellooooo!!");
        console.log(fits.header);
    }
}


describe("Reading FITS file:", function() {
    it("type:HiPS, from Herschel using Promise", (done) =>  {
        let fileuri = "/Users/fgiordano/Workspace/GitHub/FITSParser/test/inputs/Npix278.fits";
        new FITSParser(fileuri).then(fits => {
            console.log(fits.header);
            assert.equal(fits.header.get('NPIX'), '278');
            done();    
        }).catch(done);
    });
});


describe("Reading FITS file:", function() {
    it("type:HiPS, from Herschel using Observer pattern", (done) =>  {
        let fileuri = "/Users/fgiordano/Workspace/GitHub/FITSParser/test/inputs/Npix278.fits";
        
        var pippo = new Pippo();
        let observerlist = [];
        observerlist.push(pippo);
        new FITSParser(fileuri, null, observerlist).then(fits => {
            assert.equal(fits.header.get('NPIX'), '278');
            done();    
        }).catch(done);
    });
});

describe("Reading FITS file:", function() {
    it("type:HiPS, from Herschel using callback", (done) =>  {
        let fileuri = "/Users/fgiordano/Workspace/GitHub/FITSParser/test/inputs/Npix278.fits";
        
        function mycallback (fits) {
            console.log(fits.header);
        }
        
        new FITSParser(fileuri, mycallback).then(fits => {
            assert.equal(fits.header.get('NPIX'), '278');
            done();
        }).catch(done);
    });
});


describe("Reading FITS file from URL:", function() {
    it("type:HiPS, from Herschel using callback", (done) =>  {
        let fileuri = "https://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix43348.fits";
        
        function mycallback (fits) {
            console.log(fits.header);
        }
        
        new FITSParser(fileuri, mycallback).then(fits => {
            assert.equal(fits.header.get('NPIX'), '43348');
            done();
        }).catch(done);
    });
});


describe("Reading FITS file from URL:", function() {
    it("type:HiPS, from Herschel using Promise", (done) =>  {
        let fileuri = "https://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix43348.fits";
        
        new FITSParser(fileuri).then(fits => {
            console.log(fits.header);
            assert.equal(fits.header.get('NPIX'), '43348');
            done();
        }).catch(done);
    });
});

describe("Reading FITS file:", function() {
    it("type:HiPS, from Herschel using Observer pattern", (done) =>  {
        let fileuri = "https://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix43348.fits";
        
        var pippo = new Pippo();
        let observerlist = [];
        observerlist.push(pippo);
        new FITSParser(fileuri, null, observerlist).then(fits => {
            assert.equal(fits.header.get('NPIX'), '43348');
            done();    
        }).catch(done);
    });
});