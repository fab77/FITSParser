import { FITSParser } from "../src/FITSParser";
import { FITSParsed } from "../src/model/FITSParsed";
import { FITSHeader } from "../src/model/FITSHeader";

// Mocked functions
jest.mock("../src/getFile", () => ({
  getFile: jest.fn(async (url: string) => new Uint8Array([0, 1, 2, 3, 4])),
}));

jest.mock("../src/getLocalFile", () => ({
  getLocalFile: jest.fn(async (path: string) => new Uint8Array([0, 1, 2, 3, 4])),
}));

describe("FITSParser", () => {
  test("should load a FITS file from a URL", async () => {
    const url = "https://example.com/sample.fits";
    const parsedFITS: FITSParsed | null = await FITSParser.loadFITS(url);
    
    expect(parsedFITS).not.toBeNull();
    expect(parsedFITS?.header).toBeInstanceOf(FITSHeader);
    expect(parsedFITS?.data).toBeInstanceOf(Array);
  });

  test("should throw an error if the payload size does not match expected dimensions", () => {
    const header = new FITSHeader();
    header.set("NAXIS1", 5);
    header.set("NAXIS2", 5);
    header.set("BITPIX", 16); // 2 bytes per element

    const invalidPayload = new Uint8Array(10); // Incorrect size

    expect(() => FITSParser["createMatrix"](invalidPayload, header)).toThrow(
      "Payload size does not match the expected matrix dimensions."
    );
  });

  test("should generate a FITS file URL", () => {
    const header = new FITSHeader();
    header.set("NAXIS1", 2);
    header.set("NAXIS2", 2);
    const fitsParsed: FITSParsed = { header, data: [new Uint8Array([0, 1]), new Uint8Array([2, 3])] };

    const fileURL = FITSParser.generateFITSForWeb(fitsParsed);
    expect(fileURL).toContain("blob:");
  });

  test("should save FITS file locally", () => {
    const header = new FITSHeader();
    header.set("NAXIS1", 2);
    header.set("NAXIS2", 2);
    const fitsParsed: FITSParsed = { header, data: [new Uint8Array([0, 1]), new Uint8Array([2, 3])] };

    const fs = require("fs");
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});

    FITSParser.saveFITSLocally(fitsParsed, "./output.fits");
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
