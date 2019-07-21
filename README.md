# typesafe-typeof

Native typeof operator treats arrays, regexp, date and null as object, thus not allowing to seamlessly check them in one way.

Projects like Crockford's [remedial](http://www.crockford.com/javascript/remedial.html) provide some insight on how to treat types in JS,
although will always prove to be outdated as new types seems to appear from time to time. 

On the other hand with new tooling like typescript, we need also additionally consistent type checking WITH proper typeguards,
as this would be the case in native typeof operator.

## Install
```sh
npm install --save typesafe-typeof

```

## Usage
```ts
import {typeOf, isTypeOf} from 'typesafe-typeof';

console.log(typeOf([])); // 'array'
console.log(typeOf(null)); // 'null'
console.log(typeOf(123n)); // 'bigint'
console.log(typeOf(/a/)); // 'regexp'
console.log(typeOf(new Date())); // 'date'
console.log(typeOf(Symbol())); // 'symbol'

const checkType = (x: string | any[]) => {
    if (typeOf(x) === 'array') {
        x.map(z => z); // Typeerror – typeOf returns array, so no typechecking here
    }

    if (isTypeOf(x, 'string')) {
        // x.map(a => a); // Typeerror – cannot map, x cannot be an array.
        x.toUpperCase();  // ok, isTypeOf returns boolean type guard
    }
};

```

## Issues and contribution
If you have any issues, use GitHub issue tracker.
If you want to contribute, you're very welcome to send pull request as well as feature requests to me directly.



