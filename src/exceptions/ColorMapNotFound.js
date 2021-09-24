"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

class ColorMapNotFound {

    _colorMap;

    constructor(colorMap) {
        this._colorMap = colorMap;
    }

    getError() {
        return this._colorMap+" not found";
    }
}

export default ColorMapNotFound;