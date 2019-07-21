import { typeOf as nonTypedTypeof } from 'remedial';

export enum Type {
    boolean = 'boolean',
    number = 'number',
    string = 'string',
    function = 'function',
    array = 'array',
    date = 'date',
    regexp = 'regexp',
    object = 'object',
    bigint = 'bigint',
    symbol = 'symbol',
    null = 'null',
    undefined = 'undefined',
}

interface StringToTypeMap {
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
}

type NormalizedType = keyof StringToTypeMap;

const typeOf = (obj: any): NormalizedType => {
    const type = nonTypedTypeof(obj); // supports array, date, regexp and null type but defaults to object for some reason

    return type === 'object' ?
        typeof obj // fix for bigint, symbol and any future type defaulting to object by remedial
        : type;
};

const isTypeOf = <K extends NormalizedType | Type>(obj: any, type: K): obj is StringToTypeMap[K] => {
    return typeOf(obj) === type;
};

export {
    typeOf,
    isTypeOf,
};