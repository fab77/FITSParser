import { describe, expect, test, jest } from '@jest/globals';
import { FITSParser } from "../src/FITSParser";
import { FITSParsed } from "../src/model/FITSParsed";
import { FITSHeader } from "../src/model/FITSHeader";
import { FITSHeaderManager } from '../src/model/FITSHeaderManager';
import { header, data } from "./inputs/Npix47180"

test('[parse_hips__fits_1] Parse FITS from URL', async () => {
  const url = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
  const fits = new URL(url)
  const parsedFITS = await FITSParser.loadFITS(fits.toString());

  expect(parsedFITS).not.toBeNull();
  expect(parsedFITS?.header).toBeInstanceOf(FITSHeaderManager);
  expect(parsedFITS?.data).toBeInstanceOf(Array);
  const dataLength = parsedFITS ? parsedFITS?.data.length : 0
  expect(dataLength * 4096).toBe(2097152);
  expect(parsedFITS?.header.getItems().length).toBe(11);

}, 15000);


test('[parse_hips_fits_2] Create FITS programmatically from FITSParsed', async () => {

  const fitsParsed: FITSParsed = {
    header: header,
    data: data
  }

  const FITS_FILE_PATH = "./tests/resources/parse_hips_fits_2.fits"
  FITSParser.saveFITSLocally(fitsParsed, FITS_FILE_PATH)
  const parsedFITS = await FITSParser.loadFITS(FITS_FILE_PATH);

  expect(parsedFITS).not.toBeNull();
  expect(parsedFITS?.header).toBeInstanceOf(FITSHeaderManager);
  expect(parsedFITS?.data).toBeInstanceOf(Array);
  const dataLength = parsedFITS ? parsedFITS?.data.length : 0
  expect(dataLength * 4096).toBe(2097152);
  expect(parsedFITS?.header.getItems().length).toBe(11);
}, 15000);


test('[parse_hips_fits_3] Create local FITS from FITS from URL', async () => {
  const url = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
  const fits = new URL(url)
  const parsedFITS = await FITSParser.loadFITS(fits.toString());

  if (parsedFITS !== null) {
    FITSParser.saveFITSLocally(parsedFITS, "./tests/resources/parse_hips_fits_3.fits")
  }

  expect(parsedFITS).not.toBeNull();
  expect(parsedFITS?.header).toBeInstanceOf(FITSHeaderManager);
  expect(parsedFITS?.data).toBeInstanceOf(Array);
  const dataLength = parsedFITS ? parsedFITS?.data.length : 0
  expect(dataLength * 4096).toBe(2097152);
  expect(parsedFITS?.header.getItems().length).toBe(11);
}, 15000);


test('[parse_hips_fits_3] Should return null if fetch fails', async () => {
  const fits = await FITSParser.loadFITS("http://invalid-url");
  expect(fits).toBeNull();
}, 15000);


test('[parse_hips_fits_3] Should return null if local filesystem load fails', async () => {
  const fits = await FITSParser.loadFITS("./notexistent.fits");
  expect(fits).toBeNull();
}, 15000);


test('[parse_mercator_fits_1] Parse FITS from filesystem', async () => {
  const path = "./tests/resources/Mercator46.fits";
  const parsedFITS = await FITSParser.loadFITS(path);

  expect(parsedFITS).not.toBeNull();
  expect(parsedFITS?.header).toBeInstanceOf(FITSHeaderManager);
  expect(parsedFITS?.data).toBeInstanceOf(Array);
  const dataLength = parsedFITS ? parsedFITS?.data.length : 0
  expect(parsedFITS?.header.getItems().length).toBe(20);

}, 15000);



// jest.mock('../src/ParseHeader.js', () => ({
//   ParseHeader: {
//     parse: jest.fn(() => ({ items: [] })),
//     getFITSItemValue: jest.fn((header: FITSHeaderManager, key: string) => {
//       const defaults: Record<string, string | number> = { SIMPLE: 'T', BITPIX: 64, NAXIS: 2, NAXIS1: 512, NAXIS2: 512 };
//       return defaults[key] ?? null;
//     })
//   }
// }));
// jest.mock('../src/ParsePayload.js', () => ({
//   ParsePayload: {
//     computePhysicalMinAndMax: jest.fn((header, data) => header)
//   }
// }));

// describe("FITSParser", () => {

//   it("should return null if fetch fails", async () => {
//     const fits = await FITSParser.loadFITS("http://invalid-url");
//     expect(fits).toBeNull();
//   });

//   it("should parse and return a FITSParsed object", async () => {
//     const result = await FITSParser.loadFITS("http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits");
//     expect(result).not.toBeNull();
//     expect(result).toHaveProperty("header");
//     expect(result).toHaveProperty("data");
//     expect(result!.data.length).toBeGreaterThan(0);
//   });

// });