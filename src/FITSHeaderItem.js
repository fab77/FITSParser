"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */


class FITSHeaderItem {

    constructor (key, value, comment) {
        this._key = key;
        this._value = value;
        this._comment = comment;
    }

    get key() {
        return this._key;
    }

    get comment() {
        return this._comment;
    }

    get value() {
        return this._value;
    }

}

export default FITSHeaderItem;