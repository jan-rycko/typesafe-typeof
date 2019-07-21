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
import {isTypeOf, typeOf, Type} from './typeof';

console.log(typeOf(true)); // 'boolean'
console.log(typeOf(1)); // 'number'
console.log(typeOf('a')); // 'string'
console.log(typeOf(() => {})); // 'function'
console.log(typeOf([])); // 'array'
console.log(typeOf(new Date())); // 'date'
console.log(typeOf(/a/)); // 'regexp'
console.log(typeOf({})); // 'object'
console.log(typeOf(BigInt(1))); // 'bigint'
console.log(typeOf(Symbol())); // 'symbol'
console.log(typeOf(null)); // 'null'
console.log(typeOf(undefined)); // 'undefined'

const checkType = (x: string | any[] | RegExp) => {
    if (typeOf(x) === 'array') {
        // x.map(z => z); // Typeerror – typeOf returns string 'array', so no typechecking here
    }

    if (isTypeOf(x, 'string')) {
        // x.map(a => a); // Typeerror – cannot map, x cannot be an array.
        x.toUpperCase();  // ok, isTypeOf returns boolean type guard
    }

    if (isTypeOf(x, Type.regexp)) { // build-in enum is also provided
        x.test('a');
    }
};
```

## Supported types
Full list of supported types:
```ts
boolean: boolean
number: number
string: string
function: (...args: any[]) => any
array: any[]
date: Date
regexp: RegExp
object: { [I in string | number]?: any }
bigint: bigint
symbol: symbol
null: null
undefined: undefined
```

## Issues and contribution
If you have any issues, use GitHub issue tracker.
If you want to contribute, you're very welcome to send pull request as well as feature requests to me directly.



