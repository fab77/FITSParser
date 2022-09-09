/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */


 export class FITSHeaderItem {

    _key: string;
    _value: string | number;
    _comment: string


    constructor (key: string, value?: string | number, comment?: string) {
        this._key = key;
        this._value = ( value !== undefined ? value : undefined );
        this._comment = ( comment !== undefined ? comment : undefined );
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
