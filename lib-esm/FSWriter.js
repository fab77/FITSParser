import fs from 'node:fs/promises';
export function writeFITS(fileuri, fitsData) {
    fs.writeFile(fileuri, fitsData);
}
//# sourceMappingURL=FSWriter.js.map