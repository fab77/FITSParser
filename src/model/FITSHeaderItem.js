/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
var FITSHeaderItem = /** @class */ (function () {
    function FITSHeaderItem(key, value, comment) {
        this._key = key;
        this._value = value ? value : null;
        this._comment = comment ? comment : null;
    }
    Object.defineProperty(FITSHeaderItem.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FITSHeaderItem.prototype, "comment", {
        get: function () {
            return this._comment;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FITSHeaderItem.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return FITSHeaderItem;
}());
export { FITSHeaderItem };
