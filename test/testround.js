// test rounding of numbers

require('../mathmods');

const MULT_DIV = 'multiply-divide', TO_FIXED = 'toFixed()',
  EXP_PLUS_MINUS = 'exp +/-', ROUND_DEC = 'roundDec()';

let errors = [];

let summary = {
  testCount: 0,
  errCount: {
    'toFixed()': 0,
    'multiply-divide': 0,
    'exp +/-': 0,
    'roundDec()': 0
  }
};

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

    summary.testCount++;

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

    // roundDec() method
    let rdResult = Math.roundDec(x, digits);

    result.push({
      x,
      'digits': digits,
      'round exact': xrExact,
      MULT_DIV: mdResult,
      'm-d error': (mdResult === xrExact) ? null : (mdResult - xrExact),
      TO_FIXED: tfResult,
      'toFixed error': (tfResult === xrExact ? null : (tfResult - xrExact)),
      EXP_PLUS_MINUS: efResult,
      'exp +/- error': (efResult === xrExact) ? null : (efResult - xrExact),
      ROUND_DEC: rdResult,
      'roundDec error': ((rdResult === xrExact) ? null : (rdResult - xrExact))
    });

    function logErrors (method, x, digits, error) {
      if (error || Number.isNaN(error)) {
        errors.push({
          'method': method,
          'input value': x,
          'round digits': digits,
          'error': error
        });
        summary.errCount[method]++;
      }
    }

    logErrors(MULT_DIV, x, digits, (mdResult - xrExact));
    logErrors(TO_FIXED, x, digits, (tfResult - xrExact));
    logErrors(EXP_PLUS_MINUS, x, digits, (efResult - xrExact));
    logErrors(ROUND_DEC, x, digits, (rdResult - xrExact));

  }

  //console.table(result);
  //console.log('\n\n');
}

console.log('Testing 4 different methods of decimal number rounding:\n' +
  '    • Number.toFixed()\n' +
  '    • Multiply-and-divide\n' +
  '    • Exponent-add-and-subtract\n' +
  '    • Math.roundDec()\n');

testRound(0);
testRound(1);
testRound(15);

// test with random ints
for (let i = 0; i < 1000; i++) {
  let int = Math.round(Math.random() * 100);
  testRound(int);
}

const errPct = function (method) {
  const errval = summary.errCount[method];
  return +(errval/summary.testCount * 100).toFixed(2) + '%';
}

console.log('Summary:\n',
  '  Total tests: ', summary.testCount, '\n',
  '  Errors:\n',
  '    Number.toFixed():          ', summary.errCount[TO_FIXED], ` (${errPct(TO_FIXED)})\n`,
  '    Multiply-and-divide:       ', summary.errCount[MULT_DIV], ` (${errPct(MULT_DIV)})\n`,
  '    Exponent-add-and-subtract: ', summary.errCount[EXP_PLUS_MINUS], ` (${errPct(EXP_PLUS_MINUS)})\n`,
  '    Math.roundDec:             ', summary.errCount[ROUND_DEC], ` (${errPct(ROUND_DEC)})\n`
);

//console.log('Errors:\n');
//console.table(errors);
