(function () {

  if (!Math) {
    return;
  }

  /**
   * round number `x` to `decimals` number of places
   * @param {number} x
   * @param {number} [decimals=0]
   * @return {number}
   */
  Math.roundDec = function (x, decimals) {
    decimals = decimals || 0;
    return Number(Math.round(Number(x + 'e' + decimals)) + 'e-' + decimals);
  };
})();
