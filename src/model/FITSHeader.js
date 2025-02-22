var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
// reference FTIS standard doc https://heasarc.gsfc.nasa.gov/docs/fcg/standard_dict.html
var FITSHeader = /** @class */ (function (_super) {
    __extends(FITSHeader, _super);
    function FITSHeader() {
        var _this = _super.call(this) || this;
        _this._offset = undefined;
        _this._items = [];
        return _this;
    }
    Object.defineProperty(FITSHeader.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (offset) {
            this._offset = offset;
        },
        enumerable: false,
        configurable: true
    });
    FITSHeader.prototype.getItemList = function () {
        return this._items;
    };
    FITSHeader.prototype.getItemListOf = function (key) {
        var res = [];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item.key == key) {
                res.push(item);
            }
        }
        return res;
    };
    FITSHeader.prototype.addItemAtTheBeginning = function (item) {
        if (item.key !== undefined) {
            if ([
                "SIMPLE",
                "BITPIX",
                "NAXIS",
                "NAXIS1",
                "NAXIS2",
                "BLANK",
                "BZERO",
                "BSCALE",
                "DATAMIN",
                "DATAMAX",
                "NPIX",
                "ORDER",
                "CRPIX1",
                "CRPIX2",
                "CDELT1",
                "CDELT2",
                "CRVAL1",
                "CRVAL2",
            ].includes(item.key)) {
                this.set(item.key, item.value);
            }
        }
        var newitemlist = [item].concat(this._items);
        this._items = newitemlist;
    };
    FITSHeader.prototype.addItem = function (item) {
        if (item.key !== undefined) {
            if ([
                "SIMPLE",
                "BITPIX",
                "NAXIS",
                "NAXIS1",
                "NAXIS2",
                "BLANK",
                "BZERO",
                "BSCALE",
                "DATAMIN",
                "DATAMAX",
                "NPIX",
                "ORDER",
                "CRPIX1",
                "CRPIX2",
                "CDELT1",
                "CDELT2",
                "CRVAL1",
                "CRVAL2",
            ].includes(item.key)) {
                this.set(item.key, item.value);
            }
        }
        this._items.push(item);
    };
    FITSHeader.prototype.getNumRows = function () {
        return this._items.length;
    };
    return FITSHeader;
}(Map));
export { FITSHeader };
