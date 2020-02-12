// test rounding of numbers
"use strict";

const roundToFixed = require('../index.js');

let methods = [
  [
    'Number.toFixed',
    (val, digits) => { // Number.toFixed
      return +(Number(val).toFixed(digits));
    },
  ],
  [
    'multiply-then-divide',
    (val, digits) => { // multiply-then-divide
      let mult = '1e' + digits;
      return Math.round(val * mult) / mult;
    },
  ],
  [
    'exponent +/-',
    (val, digits) => { // exponent +/-
      return +(Math.round(+(val + 'e' + digits)) + ('e-' + digits));
    },
  ],
  [
    'roundToFixed',
    (val, digits) => roundToFixed(val, digits),
  ]
];

methods.forEach(method => {
  method.push({errCount: 0, errSum: 0});
});


let testCount = 0;
let errors = [];

console.error("Testing different rounding methods...");

function testRandom(digits, shift) {
  const [test, exact] = randomTestVal(digits, shift);
  // console.log(`test: ${test}, exact: ${exact}`);

  // loop through each method
  methods.forEach(method => {
    testCount++;
    const result = method[1](test, digits-1);
    const err = Math.abs(result - exact);
    if (Number.isNaN(err) || Math.abs(err) !== 0) {
      method[2].errCount++;
      errors.push({
        method: method[0],
        testVal: test,
        testDigits: digits-1,
        result: result
      });
    }
    if (Math.abs(err) !== 0 && exact !== 0) {
      method[2].errSum += err / exact;
    }
  });
}

// test with random values
for (let digits = 1; digits < 14; digits++) {
  for (let i = 0; i < 10000; i++) {
    testRandom(digits);
    testRandom(digits, 5);
  }
}

// console.log('methods:',methods);
// console.table(errors);

const report = [];
methods.forEach(method => {
  report.push({
    method: method[0],
    errors: method[2].errCount,
    "err %": errPct(method),
    "avg err": errAvg(method)
  })
});

console.log('testCount:', testCount);
console.table(report);

function errPct (method) {
  const errval = method[2].errCount;
  return +(+(errval/testCount * 100).toPrecision(4));
};

function errAvg (method) {
  const errSum = method[2].errSum;
  const errCount = method[2].errCount;
  if (errSum === 'Error') {
    return 'Error';
  }
  let rVal = (errCount) ? errSum / errCount : 0;
  rVal = +(rVal.toPrecision(4));
  return rVal;
};


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
 * generate random number ending in 5
 * @param {number} digits - number of digits to produce
 * @param {number} [shiftDown] - shift number down by this amount to make
 * small numbers
 * @return {number[]} - test value and the exact roundoff result
 */
function randomTestVal(digits, shiftDown = 0) {
  const rando = Math.random();
  const rFloat = numToFloat(rando);
  // shift down to make small numbers if requested
  if (shiftDown) {
    rFloat.exp -= shiftDown;
  }
  // shift rando by `digits`
  const randoUp = +(rFloat.mant + 'e' + (rFloat.exp + digits));
  // convert to integer
  let randoInt = Math.round(randoUp);
  // scrub last digit
  randoInt = randoInt - (randoInt % 10);

  // add 5 for test number
  let test = randoInt + 5;
  // shift right by `digits`
  let testFloat = numToFloat(test);
  test = +(testFloat.mant + 'e' + (testFloat.exp - digits));

  // add 10 for exact roundoff result
  let exact = randoInt + 10;
  // shift right by `digits`
  let exactFloat = numToFloat(exact);
  exact = +(exactFloat.mant + 'e' + (exactFloat.exp - digits));

  return [test, exact];
}
