/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */

export class FITSHeaderItem {
  _key: string = "";
  _value: string | number = "";
  _comment: string = "";

  constructor(key: string, value: string | number, comment: string) {
    this._key = key
    this._value = value
    this._comment = comment
  }

  get key(): string {
    return this._key;
  }

  get comment(): string {
    return this._comment;
  }

  get value(): string | number {
    return this._value;
  }
}
