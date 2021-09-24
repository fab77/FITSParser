"use strict";
/**
 * Summary. (bla bla bla)
 *
 * Description. (bla bla bla)
 * 
 * @link   github https://github.com/fab77/FITSParser
 * @author Fabrizio Giordano <fabriziogiordano77@gmail.com>
 */


class Constants {

    static TRANSFER_FUNCTION_LINEAR = "linear";
    static TRANSFER_FUNCTION_LOG = "log";
    static TRANSFER_FUNCTION_POWER = "power";
    static TRANSFER_FUNCTION_SQRT = "sqrt";
    static TRANSFER_FUNCTION_SQUARED = "squared";
    static TRANSFER_FUNCTION_ASINH = "asinh";
    static TRANSFER_FUNCTION_SINH = "sinh";
    static TRANSFER_FUNCTION_HISTOGRAM = "histogram";

    static COLOR_MAP_GRAYSCALE = "grayscale";
    static COLOR_MAP_PLANCK = "planck";
    static COLOR_MAP_EOSB = "eosb";
    static COLOR_MAP_RAINBOW = "rainbow";
    static COLOR_MAP_CMB = "cmb";
    static COLOR_MAP_CUBEHELIX = "cubehelix";

    static checkGivenTransferFunction(tf){
        if ([Constants.TRANSFER_FUNCTION_ASINH, Constants.TRANSFER_FUNCTION_HISTOGRAM,
            Constants.TRANSFER_FUNCTION_LINEAR, Constants.TRANSFER_FUNCTION_LOG,
            Constants.TRANSFER_FUNCTION_POWER, Constants.TRANSFER_FUNCTION_SINH,
            Constants.TRANSFER_FUNCTION_SQRT, Constants.TRANSFER_FUNCTION_SQUARED].includes(tf)) {
            return true;
        }
        return false;
    }

    static checkGivenColorMap(colorMap) {
        if ([Constants.COLOR_MAP_CMB, Constants.COLOR_MAP_CUBEHELIX, 
            Constants.COLOR_MAP_EOSB.Constants.COLOR_MAP_GRAYSCALE, 
            Constants.COLOR_MAP_PLANCK, Constants.COLOR_MAP_RAINBOW].includes(colorMap)) {
                
            return true;
        }
        return false;
    }

}

export default Constants;