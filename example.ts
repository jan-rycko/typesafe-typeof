import {isTypeOf, Type, typeOf} from './typeof';
import {isEmpty} from './empty';

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

console.log({
    booleanIsEmpty: isEmpty(false), // false
    numberIsEmpty: isEmpty(0), // false
    stringIsEmpty: isEmpty(''), // true
    functionIsEmpty: isEmpty(() => {}), // false
    arrayIsEmpty: isEmpty([]), // true
    dateIsEmpty: isEmpty(new Date()), // false
    regexpIsEmpty: isEmpty(new RegExp('')), // true
    objectIsEmpty: isEmpty({}), // true
    bigintIsEmpty: isEmpty(BigInt(0)), // false
    symbolIsEmpty: isEmpty(Symbol()), // false
    nullIsEmpty: isEmpty(null), // true
    undefinedIsEmpty: isEmpty(undefined), // true
});

const checkEmptyness = (x: string | any[]) => {
    if (isTypeOf(x, Type.string) && isEmpty<'string'>(x)) {
        // if (x === 'a') { // Typeerror – x is empty string: ''

        // }

        if (x === '') { // ok
            return true;
        }
    }
};