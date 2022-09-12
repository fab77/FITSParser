import {FITSParser} from "../src/FITSParser";



describe("Reading FITS file from URL:", function() {
    it("Reading HiPS FITS", async () =>  {
        let fileuri: string = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
        let fp = new FITSParser(fileuri);
        let fits = await fp.loadFITS();
        // console.log(fits.header);
        FITSParser.writeFITS(fits.header, fits.data, "./test/output/FITSFromURLWithNode.fits");
        
    });
});
