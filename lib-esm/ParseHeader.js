// import { FITSHeader } from "./model/FITSHeader.js";
import { FITSHeaderItem } from "./model/FITSHeaderItem.js";
import { FITSHeaderManager } from "./model/FITSHeaderManager.js";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
export class ParseHeader {
    static getFITSItemValue(header, key) {
        const item = header.findById(key);
        let VALUE = null;
        if (item) {
            VALUE = Number(item.value);
        }
        return VALUE;
    }
    static parse(rawdata) {
        // only one header block (2880) allowed atm.
        // TODO handle multiple header blocks
        // let headerByteData = new Uint8Array(rawdata, 0, 2880);
        const textDecoder = new TextDecoder('ascii');
        const headerSize = 2880; // FITS headers are in 2880-byte blocks
        const headerText = textDecoder.decode(rawdata.slice(0, headerSize));
        const header = new FITSHeaderManager();
        const lines = headerText.match(/.{1,80}/g) || [];
        for (const line of lines) {
            const key = line.slice(0, 8).trim();
            let value;
            let comment = "";
            if (key && key !== 'END') {
                const rawValue = line.slice(10).trim().split('/')[0].trim();
                if (isNaN(Number(rawValue))) {
                    value = rawValue;
                }
                else {
                    value = Number(rawValue);
                }
                if (line.includes('/')) {
                    comment = line.slice(10).trim().split('/')[1].trim();
                }
                const item = new FITSHeaderItem(key, value, comment);
                header.insert(item);
            }
        }
        return header;
    }
}
//# sourceMappingURL=ParseHeader.js.map