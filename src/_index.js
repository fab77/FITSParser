import {FITSParser} from './FITSParser.ts'

export default FITSioAPI = function (url) {
    const fp = new FITSParser(url);
    return fp.loadFITS();
}



export { FITSHeaderItem } from "./model/FITSHeaderItem.ts"
export { FITSHeader } from "./model/FITSHeader.ts"
export { FITSHeaderLine } from "./model/FITSHeaderLine.ts"
export { FITSParsed } from "./model/FITSParsed.ts"
export { FITSParser } from "./FITSParser.ts"
export { FITSWriter } from "./FITSWriter.ts"
export { ParseHeader } from "./ParseHeader.ts"
export { ParsePayload } from "./ParsePayload.ts"
export { ParseUtils } from "./ParseUtils.ts"



