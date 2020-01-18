(function () {

  if (!Math) {
    return;
  }

  /**
   * obtain a number's mantissa and exponent
   * @param {number} val
   * @return {number[]} 2-element array containing mantissa, exponent
   */
  function separateFloat(val) {
    return Number(val)
      .toExponential()
      .split("e")
      .map(str => +str);
  }

  /**
   * round number `x` to `digits` number of digits after decimal point
   * @param {number} x
   * @param {number} [digits=0]
   * @return {number}
   */
  Math.roundDec = function (x, digits = 0) {
    let [mant, exp] = separateFloat(x);
    let xNew = +(mant + "e" + (exp + digits));
    [mant, exp] = separateFloat(Math.round(xNew));
    xNew = +(mant + "e" + (exp - digits));
    return xNew;
  };

})();
