import { typeOf as nonTypedTypeof } from 'remedial';
import {PickByValueExact} from 'utility-types';

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

export interface StringToTypeMap {
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

export type NormalizedTypeName<T extends keyof StringToTypeMap = keyof StringToTypeMap> = T;
export type NormalizedType<T extends NormalizedTypeName = NormalizedTypeName> = StringToTypeMap[T];

export const typeOf = <T extends NormalizedType, N extends keyof PickByValueExact<StringToTypeMap, T>>(obj: T): N => {
    const type = nonTypedTypeof(obj); // supports array, date, regexp and null type but defaults to object for some reason

    return type === 'object' ?
        typeof obj // fix for bigint, symbol and any future type defaulting to object by remedial
        : type;
};

export const isTypeOf = <K extends NormalizedTypeName | Type>(obj: any, type: K): obj is StringToTypeMap[K] => {
    return typeOf(obj) === type;
};