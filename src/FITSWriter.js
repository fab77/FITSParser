import * as fs from 'fs';
var FITSWriter = /** @class */ (function () {
    function FITSWriter() {
    }
    FITSWriter.createFITS = function (fitsParsed) {
        var headerBytes = this.createHeader(fitsParsed.header);
        var dataBytes = this.createData(fitsParsed.data);
        // Concatenate header and data to form a complete FITS file
        var fitsFile = new Uint8Array(headerBytes.length + dataBytes.length);
        fitsFile.set(headerBytes, 0);
        fitsFile.set(dataBytes, headerBytes.length);
        return fitsFile;
    };
    FITSWriter.createHeader = function (header) {
        var headerString = "";
        // Convert header items to FITS 80-character records
        for (var _i = 0, _a = header.getItemList(); _i < _a.length; _i++) {
            var item = _a[_i];
            var key = item.key ? item.key.padEnd(8, " ") : "        ";
            var value = item.value !== undefined ? "= ".concat(item.value) : "";
            var comment = item.comment ? " / ".concat(item.comment) : "";
            var record = "".concat(key).concat(value).concat(comment).padEnd(80, " ");
            headerString += record;
        }
        // End header with "END" record and pad to 2880-byte multiple
        headerString += "END".padEnd(80, " ");
        while (headerString.length % 2880 !== 0) {
            headerString += " ";
        }
        return new TextEncoder().encode(headerString);
    };
    FITSWriter.createData = function (data) {
        // Concatenate all data rows into a single Uint8Array
        var totalLength = data.reduce(function (sum, row) { return sum + row.length; }, 0);
        var dataBytes = new Uint8Array(totalLength);
        var offset = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var row = data_1[_i];
            dataBytes.set(row, offset);
            offset += row.length;
        }
        // Ensure data section is a multiple of 2880 bytes
        var paddingSize = (2880 - (dataBytes.length % 2880)) % 2880;
        if (paddingSize > 0) {
            var paddedData = new Uint8Array(dataBytes.length + paddingSize);
            paddedData.set(dataBytes);
            return paddedData;
        }
        return dataBytes;
    };
    FITSWriter.typedArrayToURL = function (fitsParsed) {
        var fitsFile = this.createFITS(fitsParsed);
        var blob = new Blob([fitsFile], { type: "application/fits" });
        // console.log(`<html><body><img src='${URL.createObjectURL(b)}'</body></html>`);
        var url = URL.createObjectURL(blob);
        console.log("Generated FITS file URL: ".concat(url));
        var revokeTimeout_sec = 10;
        setTimeout(function () { return url; }, revokeTimeout_sec * 1000);
        console.log("Generated FITS will be available for ".concat(revokeTimeout_sec, " seconds: ").concat(url));
        return url;
    };
    FITSWriter.writeFITSFile = function (fitsParsed, filePath) {
        var fitsFile = this.createFITS(fitsParsed);
        try {
            fs.writeFileSync(filePath, fitsFile);
            console.log("FITS file written successfully to: ".concat(filePath));
        }
        catch (error) {
            console.error("Error writing FITS file: ".concat(error));
        }
    };
    return FITSWriter;
}());
export { FITSWriter };
// const fitsParsed: FITSParsed = {
//   header: new FITSHeader(),
//   data: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]
// };
// // Specify the file path
// const filePath = "/Users/fabriziogiordano/Desktop/PhD/code/new/FITSParser/output.fits";
// // Write the FITS file to the filesystem
// FITSWriter.writeFITSFile(fitsParsed, filePath);
