import {Overwrite, PickByValue, SetComplement} from 'utility-types';

export enum Type {
    array = 'array',
    bigint = 'bigint',
    boolean = 'boolean',
    date = 'date',
    error = 'error',
    function = 'function',
    nan = 'nan',
    null = 'null',
    number = 'number',
    object = 'object',
    promise = 'promise',
    regexp = 'regexp',
    string = 'string',
    symbol = 'symbol',
    'undefined' = 'undefined',
    unset = 'unset',
}

type AnyFn = (...args: any[]) => any;

export interface TypeMap {
    array: any[]
    bigint: bigint
    boolean: boolean
    date: Date
    error: Error
    function: AnyFn
    nan: number
    null: null
    number: number
    object: Object & { [I in string | number | symbol]?: any }
    promise: Promise<any>
    regexp: RegExp
    string: string
    symbol: symbol
    undefined: undefined
    unset: null | undefined
}

export type ExtendedTypeName = keyof TypeMap;
export type ExtendedType<K extends ExtendedTypeName = ExtendedTypeName> = TypeMap[K];

export type EmptyRegExp = RegExp & {
    readonly source: '(?:)'
}

export interface EmptyTypeMap extends TypeMap {
    array: []
    bigint: never
    boolean: never
    date: never
    error: Overwrite<Error, { message: '' }>
    function: () => void
    null: null
    number: never
    nan: number
    object: Object & { [I in string | number | symbol]: never }
    promise: never
    regexp: EmptyRegExp
    string: ''
    symbol: never
    undefined: undefined
    unset: null | undefined
}

export type FilledTypeMap = Overwrite<TypeMap, {
    nan: never
    null: never
    undefined: never
    unset: never
}>

export type TypeNameByType<V extends ExtendedType> = keyof PickByValue<TypeMap, V>;
export type EmptyTypeByType<V extends ExtendedType> = EmptyTypeMap[TypeNameByType<V>];