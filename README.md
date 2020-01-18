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

`decimals` - the number of digits after decimal point (optional, defaults to
 zero)

#### Return Value
The value of `x` rounded to `digits` decimal places

---

## License

MIT license.
