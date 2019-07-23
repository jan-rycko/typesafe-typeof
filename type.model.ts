import {PickByValue} from 'utility-types';

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
    function: Function & ((...args: any[]) => any)
    array: Array<any> & any[]
    date: Date
    regexp: RegExp
    object: Object & { [I in string | number]?: any }
    bigint: bigint
    symbol: symbol
    null: null
    undefined: undefined
}

export type ExtendedTypeName = keyof StringToTypeMap;
export type ExtendedType<K extends ExtendedTypeName = ExtendedTypeName> = StringToTypeMap[K];

export type EmptyRegExp = RegExp & {
    readonly source: '(?:)'
}

export interface StringToEmptyTypeMap extends StringToTypeMap {
    boolean: never
    number: never
    string: ''
    function: () => undefined
    array: []
    date: never
    regexp: EmptyRegExp
    object: { [I in string | number]?: never }
    bigint: never
    symbol: never
    null: null
    undefined: undefined
}

export type TypeNameByType<V extends ExtendedType> = keyof PickByValue<StringToTypeMap, V>;
export type EmptyTypeByType<V extends ExtendedType> = StringToEmptyTypeMap[TypeNameByType<V>];