(function () {

  if (!Math) {
    return;
  }

  /**
   * floating point object
   * @typedef {Object} Float
   * @property {number} mant - the mantissa
   * @property {number} exp - the exponent
   */

  /**
   * convert number to Float object
   * @param {number} val
   * @return {Float}
   */
  function numToFloat (val) {
    const [mant, exp] = Number(val)
      .toExponential()
      .split('e')
      .map(str => +str);
    return {
      mant,
      exp
    };
  }

  /**
   * round number `x` to `digits` number of digits after decimal point
   * @param {number} x
   * @param {number} [digits=0]
   * @return {number}
   */
  Math.roundDec = function (x, digits = 0) {
    const xF = numToFloat(x);
    const xFNew = numToFloat(
      Math.round(+(xF.mant + 'e' + (xF.exp + digits))));
    return +(xFNew.mant + 'e' + (xFNew.exp - digits));
  };

})();
