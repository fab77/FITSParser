import {FITSParser} from './FITSParser'

export default FITSioAPI = function (url: string):  Promise<FITSParsed> {
    const fp = new FITSParser(url);
    return fp.loadFITS();
}



export { FITSHeaderItem } from "./model/FITSHeaderItem"
export { FITSHeader } from "./model/FITSHeader"


import type { FITSHeaderLine } from "./model/FITSHeaderLine"
export type { FITSHeaderLine };
import type { FITSParsed } from "./model/FITSParsed"
export type { FITSParsed };

export { FITSParser } from "./FITSParser"
export { FITSWriter } from "./FITSWriter"
export { ParseHeader } from "./ParseHeader"
export { ParsePayload } from "./ParsePayload"
export { ParseUtils } from "./ParseUtils"



