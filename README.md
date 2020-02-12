# round-tofixed

Correctly round JavaScript numbers to a fixed number of decimal places
---
## Overview
**round-tofixed** solves common problems when rounding decimal numbers in JavaScript:
- the *Math.round()* built-in function only rounds to integers
- commonly used rounding methods for decimal numbers are inaccurate

#### Rounding Method Comparison

Test results of rounding 135,048 different numbers:

Method                 | Errors | Percent of total  |   Avg Err
---------------------- | ------ | ----------------  | ----------
Number.toFixed         | 62,099 | 45.98%            | -0.005243
multiply-then-divide   |  8,115 | 6.01%             | -0.007622
exponent +/-           |   549  |  0.41%            |  ***NaN***
**roundToFixed**       |   0    |   0%              |   0

## Usage
Node.js:
````js
// using CommonJS
const roundToFixed = require("round-to-fixed");
````

````html
<!-- from an HTML file -->
<script src="mathmods.js"></script>
````
---
## `roundToFixed()`


Round a number to a fixed number of decimal places.

### Syntax

````js
roundToFixed(num [, digits])
````

#### Parameters
`num`<br>
&nbsp; &nbsp; &nbsp; (number) - The number to round off

`digits`<br>
 &nbsp; &nbsp; &nbsp; (number) - the number of digits after decimal point<br>
 &nbsp; &nbsp; &nbsp; (optional, defaults to zero)

#### Return Value
(number) - The value of `x` rounded to `digits` decimal places

#### Technical Details
**roundtoFixed** avoids the problems of commonly used rounding methods, all of which produce incorrect results in certain cases.

The most popular method for rounding a decimal number is:
 ````js
 Number.toFixed(digits)
````
However, when a number ends in 5, it rounds in the wrong direction about 45% of the time.

Another popular method is **Multiply-and-divide**:

````js
Math.round( x * (10 ** digits) ) / (10 ** digits);
````
While more accurate than using *Number.toFixed()*, it rounds numbers ending in 5 incorrectly about 6% of the time.
 
A more accurate method is **Exponent add-and-subtract**:

````js
Math.round( x + 'e' + digits ) + 'e-' + digits;
````
*Exponent add-and-subtract* rounds numbers ending in 5 incorrectly only about 0.47% of the time. But it fails completely for numbers smaller than 1e-6, with a `NaN` result.

**roundToFixed** uses a method similar to Exponent add-and-subtract method, but it avoids the `NaN` result, rounding correctly for all values.

---

## License

MIT license.
