import {Overwrite, PickByValue, SetDifference, SetComplement} from 'utility-types';

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

type AnyFn = (...args: any[]) => any;

export interface StringToTypeMap {
    boolean: boolean
    number: number
    string: string
    function: Function & AnyFn
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
    object: { [I in string | number]: never }
    bigint: never
    symbol: never
    null: null
    undefined: undefined
}

export type NonNever<T extends {}> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;
export type Never<T extends {}> = Pick<T, { [K in keyof T]: T[K] extends never ? K : never }[keyof T]>;

export type PossibleEmptyMap = NonNever<StringToEmptyTypeMap>;
export type PossibleEmptyInitialTypeMap = Pick<StringToTypeMap, keyof PossibleEmptyMap>;
export type PossibleEmptyType = PossibleEmptyInitialTypeMap[keyof PossibleEmptyInitialTypeMap];
export type EmptyTypeNameByType<V extends ExtendedType> = keyof PickByValue<PossibleEmptyMap, V>;

// export type PossibleEmptyTypeName = keyof PossibleEmptyInitialTypeMap;

export type ImpossibleEmptyMap = Never<StringToEmptyTypeMap>;
export type ImpossibleEmptyInitialTypeMap = Pick<StringToTypeMap, keyof ImpossibleEmptyMap>;
export type ImpossibleEmptyType = ImpossibleEmptyInitialTypeMap[keyof ImpossibleEmptyInitialTypeMap];
export type FilledByDefaultTypeNameByType<V extends ImpossibleEmptyType> = keyof PickByValue<ImpossibleEmptyMap, V>;
// export type ImpossibleToBeEmptyTypeName = keyof ImpossibleToBeEmptyInitialTypeMap;

export type StringToFilledTypeMap = Overwrite<StringToTypeMap, {
    string: SetComplement<string, ''>
    null: never
    undefined: never
}>

export type TypeNameByType<V extends ExtendedType> = keyof PickByValue<StringToTypeMap, V>;
export type EmptyTypeByType<V extends ExtendedType> = StringToEmptyTypeMap[TypeNameByType<V>];