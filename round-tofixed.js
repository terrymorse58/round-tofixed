(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.roundToFixed = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
