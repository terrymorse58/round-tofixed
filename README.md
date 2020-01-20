# mathmods

Some simple but useful additions to javascript Math module

---

## Usage

Simply including the `mathmods.js` file will make the additions to `Math`.


````js
// using CommonJS
require("mathmods.js");
````

````html
<!-- from an HTML file -->
<script src="mathmods.js"></script>
````

## Math.roundDec()


Rounds a number to specified decimal places, because built-in `Math.round()`
only rounds to integers values.

### Syntax

```js
Math.roundDec(x, digits)
```

#### Parameters
`x` - a number to round off

`digits` - the number of digits after decimal point (optional, defaults to
 zero)

#### Return Value
The value of `x` rounded to `digits` decimal places

#### Discussion
`Math.roundDec()` avoids the rounding problems of commonly used
 methods, all of which produce wrong results in certain cases.

The most popular method for rounding a decimal number is:
 ````
 Number.toFixed(digits)
````
However, when a number ends in 5, it rounds down instead of up about 45% of
 the time.

Another popular method is **Multiply-and-divide**:

````
Math.round( x * (10 ** digits) ) / (10 ** digits);
````
While better than using `Number.toFixed()`, it rounds numbers ending in 5
 incorrectly about 6% of the time.
 
A more accurate method is **Exponent add-and-subtract**:

````
Math.round( x + 'e' + digits ) + 'e-' + digits;
````
Exponent add-and-subtract rounds numbers ending in 5 incorrectly only about 0.47
% of the time
. But it fails completely for values of x smaller than 1e-6, with a `NaN
` result.

`Math.roundDec()` uses a method similar to Exponent add-and-subtract method,
 but it avoids the `NaN` result, rounding in the correct direction 100% of the
  time.

---

## License

MIT license.
