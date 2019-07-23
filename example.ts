import {isTypeOf, typeOf} from 'typeof';
import {isEmpty} from 'empty';
import {Type} from 'type.model';

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

type X = string | number;
type Y = string | number | [];

const checkEmptyness = (x?: X, y?: Y) => {
    if (isEmpty(x)) { // no typechecking
        if (x === 'a') {} // number cannot be empty, since 0 might also be set value, no typeerror here
    }

    if (isEmpty(y)) { // no typechecking
        // if (y === 'a') {} // falsey typeerror – y is only [] here for some reason
        if (isTypeOf(y, 'string') && y === 'a') {} // this would loose y's empty state
    }

    // better way

    if (isEmpty<string>(x)) {
        // if (x === 'a') {} // correct typeerror – x is empty ""
    }

    if (isEmpty(x, 'string')) { // this will fail if x is not typeof 'string'
        // if (x === 'a') {} // correct typeerror – x is empty ""
    }

    if (isEmpty(x, Type.string)) { // Works with Type enum
        // if (x === 'a') {} // typeerror – x is empty ""
    }

    // and for other types
    const bool = false;

    if (isEmpty(bool, 'boolean')) {
        console.log(bool); //  never, false is also set value
    }

    const number = false;

    if (isEmpty(number, 'number')) {
        console.log(number); //  never, 0 is also set value
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
        console.log(noop.toString()); // () => undefined
    }

    const functionNoop = function abc() {};

    if (isEmpty(functionNoop, 'function')) {
        console.log(functionNoop.toString()); // () => undefined
    }

    const regexp = RegExp('');

    if (isEmpty(regexp, 'regexp')) {
        console.log(regexp.toString()); // /(?:)/ – regexp matching all :)
    }

    // Check StringToEmptyTypeMap for full list of possible type outcomes
};

checkEmptyness();