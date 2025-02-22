import { FITSHeader } from "./model/FITSHeader.js";
import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
var ParseHeader = /** @class */ (function () {
    function ParseHeader() {
    }
    ParseHeader.parse = function (rawdata) {
        // only one header block (2880) allowed atm.
        // TODO handle multiple header blocks
        // let headerByteData = new Uint8Array(rawdata, 0, 2880);
        var textDecoder = new TextDecoder('ascii');
        var headerSize = 2880; // FITS headers are in 2880-byte blocks
        var headerText = textDecoder.decode(rawdata.slice(0, headerSize));
        var header = new FITSHeader();
        var lines = headerText.match(/.{1,80}/g) || [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var key = line.slice(0, 8).trim();
            var value = null;
            var comment = null;
            if (key && key !== 'END') {
                var rawValue = line.slice(10).trim().split('/')[0].trim();
                value = isNaN(Number(rawValue)) ? rawValue : Number(rawValue);
                if (line.includes('/')) {
                    comment = line.slice(10).trim().split('/')[1].trim();
                }
                var item = new FITSHeaderItem(key, value, comment);
                if (key == 'SIMPLE') {
                    header.addItemAtTheBeginning(item);
                }
                else {
                    header.addItem(item);
                }
            }
        }
        return header;
    };
    return ParseHeader;
}());
export { ParseHeader };
