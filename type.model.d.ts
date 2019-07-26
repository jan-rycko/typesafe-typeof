import { Overwrite, PickByValue } from 'utility-types';
export declare enum Type {
    array = "array",
    bigint = "bigint",
    boolean = "boolean",
    date = "date",
    error = "error",
    function = "function",
    nan = "nan",
    null = "null",
    number = "number",
    object = "object",
    promise = "promise",
    regexp = "regexp",
    string = "string",
    symbol = "symbol",
    'undefined' = "undefined",
    unset = "unset"
}
declare type AnyFn = (...args: any[]) => any;
export interface TypeMap {
    array: any[];
    bigint: bigint;
    boolean: boolean;
    date: Date;
    error: Error;
    function: AnyFn;
    nan: number;
    null: null;
    number: number;
    object: Object & {
        [I in string | number | symbol]?: any;
    };
    promise: Promise<any>;
    regexp: RegExp;
    string: string;
    symbol: symbol;
    undefined: undefined;
    unset: null | undefined;
}
export declare type ExtendedTypeName = keyof TypeMap;
export declare type ExtendedType<K extends ExtendedTypeName = ExtendedTypeName> = TypeMap[K];
export declare type EmptyRegExp = RegExp & {
    readonly source: '(?:)';
};
export interface EmptyTypeMap extends TypeMap {
    array: [];
    bigint: never;
    boolean: never;
    date: never;
    error: Overwrite<Error, {
        message: '';
    }>;
    function: () => void;
    null: null;
    number: never;
    nan: number;
    object: Object & {
        [I in string | number | symbol]: never;
    };
    promise: never;
    regexp: EmptyRegExp;
    string: '';
    symbol: never;
    undefined: undefined;
    unset: null | undefined;
}
export declare type NonNever<T extends {}> = Pick<T, {
    [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]>;
export declare type Never<T extends {}> = Pick<T, {
    [K in keyof T]: T[K] extends never ? K : never;
}[keyof T]>;
export declare type PossibleEmptyMap = NonNever<EmptyTypeMap>;
export declare type PossibleEmptyInitialTypeMap = Pick<TypeMap, keyof PossibleEmptyMap>;
export declare type PossibleEmptyType = PossibleEmptyInitialTypeMap[keyof PossibleEmptyInitialTypeMap];
export declare type EmptyTypeNameByType<V extends ExtendedType> = keyof PickByValue<PossibleEmptyMap, V>;
export declare type ImpossibleEmptyMap = Never<EmptyTypeMap>;
export declare type ImpossibleEmptyInitialTypeMap = Pick<TypeMap, keyof ImpossibleEmptyMap>;
export declare type ImpossibleEmptyType = ImpossibleEmptyInitialTypeMap[keyof ImpossibleEmptyInitialTypeMap];
export declare type FilledByDefaultTypeNameByType<V extends ImpossibleEmptyType> = keyof PickByValue<ImpossibleEmptyMap, V>;
export declare type FilledTypeMap = Overwrite<TypeMap, {
    nan: never;
    null: never;
    undefined: never;
    unset: never;
}>;
export declare type TypeNameByType<V extends ExtendedType> = keyof PickByValue<TypeMap, V>;
export declare type EmptyTypeByType<V extends ExtendedType> = EmptyTypeMap[TypeNameByType<V>];
export {};
