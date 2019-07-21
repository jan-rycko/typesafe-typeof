import {typeOf, isTypeOf} from './typeof';

console.log({
    isBoolean: isTypeOf(true, 'boolean'),
    isNumber: isTypeOf(1, 'number'),
    isString: isTypeOf('a', 'string'),
    isFunction: isTypeOf(() => {}, 'function'),
    isArray: isTypeOf([], 'array'),
    isDate: isTypeOf(new Date(), 'date'),
    isRegexp: isTypeOf(/a/, 'regexp'),
    isObject: isTypeOf({}, 'object'),
    isBigint: isTypeOf(BigInt(1), 'bigint'), // 1n (bigint literal) would also work
    isSymbol: isTypeOf(Symbol(), 'symbol'),
    isNull: isTypeOf(null, 'null'),
    isUndefined: isTypeOf(undefined, 'undefined'),
});



const checkType = (x: string | any[]) => {
    if (typeOf(x) === 'array') {
        // x.map(z => z); // Typeerror – typeOf returns array, so no typechecking here
    }

    if (isTypeOf(x, 'string')) {
        // x.map(a => a); // Typeerror – cannot map, x cannot be an array.
        x.toUpperCase();  // ok, isTypeOf returns boolean type guard
    }
};