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