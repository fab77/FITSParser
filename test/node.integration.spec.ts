import { FITSParser } from "../src/FITSParser";

describe("Reading FITS file from URL:", function () {
  it("Reading HiPS FITS", async () => {
    const fileuri =
      "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
    const fp = new FITSParser(fileuri);
    const fits = await fp.loadFITS();
    FITSParser.writeFITS(
      fits.header,
      fits.data,
      "./test/output/FITSFromURLWithNode.fits"
    );
  });
});
