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
 * @param {number} val
 * @param {number} [digits=0] - positive integer
 * @return {number}
 */
function roundToFixed (val, digits = 0) {
  if (typeof val === 'number' && typeof digits === 'number'
    && Number.isInteger(digits) &&
    (digits === 0 || Math.sign(digits) === 1)) {
    const valF = numToFloat(val);
    const valFNew = numToFloat(
      Math.round(+(valF.mant + 'e' + (valF.exp + digits)))
    );
    return +(valFNew.mant + 'e' + (valFNew.exp - digits));
  }
  return NaN;
}

module.exports = roundToFixed;
