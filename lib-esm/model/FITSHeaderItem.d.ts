/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 *
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */
export declare class FITSHeaderItem {
    _key: string | undefined;
    _value: string | number | undefined;
    _comment: string | undefined;
    constructor(key?: string, value?: string | number, comment?: string);
    get key(): string;
    get comment(): string;
    get value(): string | number;
}
//# sourceMappingURL=FITSHeaderItem.d.ts.map