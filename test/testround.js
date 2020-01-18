// test rounding of numbers

require('../mathmods');

function testRound (int) {
  const levels = 15;
  const MIN_FIXED_NUMBER = 1.0e-6;
  let result = [];

  for (let i = 1; i <= levels; i++) {
    let j = i - 1;
    let fract = +("5e-" + i);
    let x = int + fract;
    let fractround = +('1e-' + j);
    let xround = int + fractround;

    let x2 = Math.roundDec(x,j);

    result.push({
      x,
      "exact rounding": xround,
      "roundDec": x2,
      "correct": ((x2===xround) ? "true" : "FALSE")
    });

  }

  console.table(result);
  console.log('\n\n');
}

console.log('Testing mathmods Math.roundDec()...\n');

for (let int = 0; int <= 9; int++) {
  testRound(int);
}