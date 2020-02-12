# round-tofixed

Correctly round JavaScript numbers to a fixed number of decimal places
---
## Overview
**round-tofixed** solves common problems when rounding decimal numbers in JavaScript:
- the *Math.round()* built-in function only rounds to integers
- commonly used rounding methods for decimal numbers produce incorrect results

#### Rounding Method Comparison

Test results of rounding 1,040,000 random numbers that end with a '5':

Method                 | Errors | Fraction of total |   Avg Err Ratio
---------------------- | ------ | ----------------  | ----------
Number.toFixed         | 93,686 | 9.008 %           |  0.03391
multiply-then-divide   |  7,780 | 0.7481 %          |  0.005592
exponent +/-           |   549  | 0.6602 %          |  ***NaN***
**round-tofixed**       |   0    | 0 %               |  0

## Usage
Node.js:
````js
// using CommonJS
const roundToFixed = require("round-to-fixed");
````

````html
<!-- from an HTML file -->
<script src="round-tofixed.min.js"></script>
````
---
## Function

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
 &nbsp; &nbsp; &nbsp; (positive integer) **[optional]**- the number of digits after decimal point<br>
 &nbsp; &nbsp; &nbsp; Defaults to zero.

#### Return Value
(number) - The value of `num` rounded to `digits` decimal places. Returns `NaN` on invalid inputs.

---
#### Technical Details
**round-tofixed** avoids the problems of commonly used rounding methods, all of which produce incorrect results in certain cases.

The most commonly used method for rounding a decimal number is **Number.toFixed**:
 ````js
 Number.toFixed(digits)
````
However, when a number ends in 5, it sometimes rounds in the wrong direction.

Another popular method is **multiply-then-divide**:

````js
Math.round( x * (10 ** digits) ) / (10 ** digits);
````
While more accurate than using *Number.toFixed()*, it still rounds numbers ending in 5 incorrectly.
 
A more accurate method is **exponent add-and-subtract**:

````js
Math.round( x + 'e' + digits ) + 'e-' + digits;
````
*Exponent add-and-subtract* rounds numbers correctly. But it has a fatal flaw—for input values smaller than 1e-6, it returns `NaN`.

**round-tofixed** uses the *exponent add-and-subtract* method, but it avoids the `NaN` result, rounding correctly for all values.

---
#### Limitations

Because JavaScript numbers have about 16 digits of precision, **round-tofixed** produces inaccurate results with precision requests above 15.

---
## License

MIT license.
