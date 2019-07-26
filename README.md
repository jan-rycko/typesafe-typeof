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
import {isTypeOf, typeOf, Type} from 'typesafe-typeof';

console.log(typeOf(true)); // 'boolean'
console.log(typeOf(1)); // 'number'
console.log(typeOf('a')); // 'string'
console.log(typeOf(() => {})); // 'function'
console.log(typeOf(new Function())); // 'function'
console.log(typeOf([])); // 'array'
console.log(typeOf(new Date())); // 'date'
console.log(typeOf(/a/)); // 'regexp'
console.log(typeOf({})); // 'object'
console.log(typeOf(BigInt(1))); // 'bigint'
console.log(typeOf(NaN)); // 'nan'
console.log(typeOf(Symbol())); // 'symbol'
console.log(typeOf(null)); // 'null'
console.log(typeOf(undefined)); // 'undefined'
console.log(typeOf(new Promise(resolve => resolve()))); // 'promise'
console.log(typeOf(new TypeError('message'))); // 'error'
console.log(typeOf(new Int8Array(1))); // 'error'

const checkType = <X extends null | string | any[] | RegExp | RangeError | Promise<any>>(x: X) => {
    if (typeOf(x) === 'array') {
        // x.map(z => z); // Typeerror – typeOf returns string 'array', so no typechecking here
    }

    if (isTypeOf(x, 'string')) {
        // x.map(a => a); // Typeerror – cannot map, x cannot be an array.
        console.log(x.toUpperCase());  // ok, isTypeOf returns boolean type guard
    }

    if (isTypeOf(x, Type.regexp)) { // build-in enum is also provided
        console.log(x.test('a'));
    }

    if (isTypeOf(x, 'undefined') || isTypeOf(x, 'null')) { // how many times...
        console.log(x)
    }

    if (isTypeOf(x, 'unset')) { // Convenience type
        console.log(x)
    }

    if (isTypeOf(x, 'null', 'undefined')) { // but also
        console.log(x)
    }

    if (isTypeOf(x, Type.string, Type.array)) { // so this will also work
        console.log(x.length);
    }

    if (isTypeOf(x, 'error')) {
        console.log(x.message);
    }

    if (isTypeOf(x, 'promise')) {
        x.then(resp => console.log('Response from promise:', resp));
    }
};
const promise = new Promise(resolve => resolve('hello'));

checkType(promise); // see you at the end

checkType('aaa');
checkType(['a', 'a']);
checkType(/a/);
checkType(null);
checkType(new RangeError('we\'re out of range'));
```

## Supported types
Full list of supported types:
```ts
boolean
number
nan: number // NaN
string
function: (...args: any[]) => any
array: any[]
date: Date
regexp: RegExp
promise: Promise<any>
error: Error
object
bigint
symbol
null
undefined

// convenience type for simple isSet checks
unset
```

## Empty check
```ts
import {isEmpty, Type} from 'typesafe-typeof';

type X = string | number;
type Y = string | number | [];

const checkEmptyness = (x?: X) => {
    if (isEmpty(x)) { // no typeguard
        // x.length // would fail typecheck
    }

    if (isEmpty(x, 'string')) { // this will typecheck fail if x is not typeof 'string'
        // if (x === 'a') {} // correct typeerror – x is empty ""
        if (x === '') { console.log(x) } // no type error here
        return;
    }

    if (typeof x === 'string') {} // this is ok, x still can be a string

    if (isTypeOf(x, 'string')) { return }

    if (typeof x === 'string') {} // this on the contrary will warn that x cannot be a string any more

    if (isEmpty(x, Type.string)) { // Works with Type enum
        // if (x === 'a') {} // typeerror – x is empty ""
    }

    // and for other types
    const bool = false;

    if (isEmpty(bool, 'boolean')) {
        console.log(bool); //  never, false is also set value
    }

    const object = {};

    if (isEmpty(object, 'object')) {
        console.log(object); //  never, 0 is also set value
    }

    const date = new Date();

    if (isEmpty(date, 'date')) {
        console.log(date); //  never, empty date defaults to current
    }

    const array = [];

    if (isEmpty(array, 'array')) {
        console.log(JSON.stringify(array)); // []
    }

    const noop = () => {};

    if (isEmpty(noop, 'function')) {
        console.log(noop.toString()); // () => {} or function() {} depending on build system
    }

    const functionNoop = function abc() {};

    if (isEmpty(functionNoop, 'function', 'regexp')) {
        console.log(functionNoop.toString()); // function abc() {}
    }

    const regexp = RegExp('');

    if (isEmpty(regexp, 'regexp')) {
        console.log(regexp.toString()); // /(?:)/ – regexp matching all :)
    }

    // Check EmptyTypeMap for full list of possible type outcomes

    const string: string | number = 'filled';

    if (isFilled(string, 'string')) {
        console.log({ string });
    }

    const nullified: null = null;

    if (isFilled(nullified, 'null')) {
        console.log(nullified); // nope
    }

    const nan: number = NaN;

    if (isFilled(nan, 'number')) {
        console.log(nan); // nope, let's leave what's not a number behind
    }

    if (isFilled(nan, 'nan')) {
        console.log(nan); // never, NaN does not have any countable nor comparable value
    }

    return string;
};

checkEmptyness();
```

## Issues and contribution
If you have any issues, use GitHub issue tracker.
If you want to contribute, you're very welcome to send pull request as well as feature requests to me directly.



