import {FITSParser} from './FITSParser.ts'


export default FITSioAPI = function (url) {
    const fp = new FITSParser(url);
    return fp.loadFITS();
}
