// test rounding of numbers
"use strict";

const roundToFixed = require('../round-tofixed');

let errors = [];
let methods = [
  'Number.toFixed',
  'multiply-then-divide',
  'exponent +/-',
  'roundToFixed'
];
const TO_FIXED = methods[0],
  MULT_DIV = methods[1],
  EXP_PM = methods[2],
  R_TF = methods[3];

const errCount = {}, errSum = {};

methods.forEach(method => {
  errCount[method] = errSum[method] = 0;
});
let testCount = 0;

console.error("Testing different rounding methods...");

// test 3 different methods of rounding with integer `int` + [0.5, 0.05, ...]
function testRound (int) {
  const levels = 18;
  let result = [];

  for (let depth = 1; depth <= levels; depth++) {
    let digits = depth - 1;
    let fract = +('5e-' + depth);

    // stop evaluating when fract is too small to matter
    let testFract = (int) ? fract / int : fract;
    if (testFract < Number.EPSILON * 5) {
      break;
    }

    testCount++;

    let x = int + fract;

    // exact result
    let fractround = +('1e-' + digits);
    let xrExact = int + fractround;

    // multiply-and-divide method
    let mult = '1e' + digits;
    let mdResult = Math.round(x * mult) / mult;

    // toFixed() method
    let tfResult = +(Number(x).toFixed(digits));

    // Math.round(num + "e+n") + "e-n" method
    let efResult = +(Math.round(+(x + 'e' + digits)) + ('e-' + digits));

    // roundToFixed() method
    let rdResult = roundToFixed(x, digits);

    result.push({
      x,
      'digits': digits,
      'round exact': xrExact,
      'm-t-d': mdResult,
      'm-t-d error': (mdResult === xrExact) ? null : (mdResult - xrExact),
      'toFixed': tfResult,
      'tF error': (tfResult === xrExact ? null : (tfResult - xrExact)),
      'exp +/-': efResult,
      'exp +/- error': (efResult === xrExact) ? null : (efResult - xrExact),
      'roundToFixed': rdResult,
      'rTF error': ((rdResult === xrExact) ? null : (rdResult - xrExact))
    });

    function logErrors (method, x, digits, result, exact) {
      const error = result - exact;
      if (error || Number.isNaN(error)) {
        errors.push({
          'method': method,
          'input value': x,
          'round digits': digits,
          'error': error
        });
        errCount[method]++;
        if (errSum[method] === "Error" || Number.isNaN(error)) {
          errSum[method] = "Error";
        } else if (exact !== 0) {
          errSum[method] += error / exact;
        }
      }
    }

    logErrors(MULT_DIV, x, digits, mdResult, xrExact);
    logErrors(TO_FIXED, x, digits, tfResult, xrExact);
    logErrors(EXP_PM, x, digits, efResult, xrExact);
    logErrors(R_TF, x, digits, rdResult, xrExact);

  }

  // console.table(result);
  // console.log('\n\n');
}

let heading =
  `Testing ${methods.length} different methods of decimal number rounding:\n`;
methods.forEach(method => {
  heading += `    • ${method}\n`;
});
console.log(heading);

testRound(0);
testRound(1);
testRound(15);

// test with random ints
for (let i = 0; i < 10000; i++) {
  let int = Math.round(Math.random() * 100);
  testRound(int);
}

const errPct = function (method) {
  const errval = errCount[method];
  return +(errval/testCount * 100).toFixed(2) + '%';
};

const errAvg = function (method) {
  if (errSum[method] === 'Error') {
    return 'Error';
  }
  let rVal = (errCount[method]) ? errSum[method] / errCount[method] : 0;
  rVal = rVal.toPrecision(4);
  return rVal;
};


const report = 'Summary:\n' +
  `  Total tests: ${testCount}\n` +
  `  Errors:\n\n`;

const summary = [];
methods.forEach(method => {
  summary.push({
    'Method': method,
    'Errors': errCount[method],
    'Percent': errPct(method),
    'Avg Err': errAvg(method)
  })
});

console.log(report);
console.table(summary);
console.error('Test complete.');

//console.log('Errors:\n');
//console.table(errors);
