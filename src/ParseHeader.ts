import { FITSHeader } from "./model/FITSHeader";
import { FITSHeaderItem } from "./model/FITSHeaderItem";
import { FITSHeaderLine } from "./model/FITSHeaderLine";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

export class ParseHeader {
  static parse(rawdata: Uint8Array): FITSHeader {
    // only one header block (2880) allowed atm.
    // TODO handle multiple header blocks
    // let headerByteData = new Uint8Array(rawdata, 0, 2880);

    const textDecoder = new TextDecoder("iso-8859-1");

    const header = new FITSHeader();

    let nline = 0;
    let key = "";
    let val: string;

    let u8line: Uint8Array;
    let u8key: Uint8Array;
    let u8val: Uint8Array;
    let u8ind: Uint8Array;
    // let ind: string;
    let item: FITSHeaderItem;
    let fitsLine: FITSHeaderLine;

    while (key !== "END") {
      // line 80 characters
      u8line = new Uint8Array(rawdata.slice(nline * 80, nline * 80 + 80));
      nline++;
      // key
      u8key = new Uint8Array(u8line.slice(0, 8));
      key = textDecoder.decode(u8key).trim();
      // value indicator
      u8ind = new Uint8Array(u8line.slice(8, 10));
      // ind = textDecoder.decode(u8ind);
      // reading value
      u8val = new Uint8Array(u8line.slice(10, 80));
      val = textDecoder.decode(u8val).trim();

      if (u8ind[0] == 61 && u8ind[1] == 32) {
        let firstchar = 32;
        for (let i = 0; i < u8val.length; i++) {
          if (u8val[i] != 32) {
            firstchar = u8val[i];
            break;
          }
        }
        if (firstchar == 39) {
          // value starts with '
          // [ival, icomment]
          fitsLine = ParseHeader.parseStringValue(u8val);
        } else {
          if (firstchar == 84 || firstchar == 70) {
            // T or F
            fitsLine = ParseHeader.parseLogicalValue(u8val);
          } else {
            val = textDecoder.decode(u8val).trim();
            if (val.includes(".")) {
              fitsLine = ParseHeader.parseFloatValue(u8val);
            } else {
              fitsLine = ParseHeader.parseIntValue(u8val);
            }
          }
        }
        item = new FITSHeaderItem(key, fitsLine.val, fitsLine.comment);
      } else {
        if (key == "COMMENT" || key == "HISTORY") {
          item = new FITSHeaderItem(key, null, val);
        } else {
          let firstchar = 32;
          for (let i = 0; i < u8val.length; i++) {
            if (u8val[i] != 32) {
              firstchar = u8val[i];
              break;
            }
          }
          if (firstchar == 47) {
            // single / this is the case when no key nor value indicator is defined
            item = new FITSHeaderItem(null, null, val);
          } else if (firstchar == 32) {
            // case when there's a line with only spaces
            item = new FITSHeaderItem(null, null, null);
          }
        }
      }

      header.addItem(item);
    }

    item = new FITSHeaderItem(
      "COMMENT",
      "FITS generated with FITSParser on ",
      null
    );
    header.addItem(item);
    const now = new Date();
    item = new FITSHeaderItem("COMMENT", now.toString(), null);
    header.addItem(item);

    const nblock = Math.ceil(nline / 36);
    const offset = nblock * 2880;

    header.offset = offset;

    return header;
  }

  static parseStringValue(u8buffer: Uint8Array): FITSHeaderLine {
    const textDecoder = new TextDecoder("iso-8859-1");
    const decoded = textDecoder.decode(u8buffer).trim();
    const idx = decoded.lastIndexOf("/");
    const val = decoded.substring(0, idx);
    let comment = decoded.substring(idx);
    if (comment === undefined) {
      comment = null;
    }
    return {
      val: val,
      comment: comment,
    };
  }

  static parseLogicalValue(u8buffer: Uint8Array): FITSHeaderLine {
    const textDecoder = new TextDecoder("iso-8859-1");
    const val = textDecoder.decode(u8buffer).trim();
    const tokens = val.split("/");
    if (tokens[1] === undefined) {
      return {
        val: tokens[0].trim(),
        comment: null,
      };
    }
    return {
      val: tokens[0].trim(),
      comment: " /" + tokens[1],
    };
  }

  static parseIntValue(u8buffer: Uint8Array): FITSHeaderLine {
    const textDecoder = new TextDecoder("iso-8859-1");
    const val = textDecoder.decode(u8buffer).trim();
    const tokens = val.split("/");
    if (tokens[1] === undefined) {
      return {
        val: parseInt(tokens[0].trim()),
        comment: null,
      };
    }
    return {
      val: parseInt(tokens[0].trim()),
      comment: " /" + tokens[1],
    };
  }

  static parseFloatValue(u8buffer: Uint8Array): FITSHeaderLine {
    const textDecoder = new TextDecoder("iso-8859-1");
    const val = textDecoder.decode(u8buffer).trim();
    const tokens = val.split("/");
    if (tokens[1] === undefined) {
      return {
        val: parseFloat(tokens[0].trim()),
        comment: null,
      };
    }
    return {
      val: parseFloat(tokens[0].trim()),
      comment: " /" + tokens[1],
    };
  }
}
