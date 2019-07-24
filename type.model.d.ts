import { Overwrite, PickByValue, SetComplement } from 'utility-types';
export declare enum Type {
    boolean = "boolean",
    number = "number",
    string = "string",
    function = "function",
    array = "array",
    date = "date",
    regexp = "regexp",
    object = "object",
    bigint = "bigint",
    symbol = "symbol",
    null = "null",
    undefined = "undefined"
}
declare type AnyFn = (...args: any[]) => any;
export interface StringToTypeMap {
    boolean: boolean;
    number: number;
    string: string;
    function: Function & AnyFn;
    array: Array<any> & any[];
    date: Date;
    regexp: RegExp;
    object: Object & {
        [I in string | number]?: any;
    };
    bigint: bigint;
    symbol: symbol;
    null: null;
    undefined: undefined;
}
export declare type ExtendedTypeName = keyof StringToTypeMap;
export declare type ExtendedType<K extends ExtendedTypeName = ExtendedTypeName> = StringToTypeMap[K];
export declare type EmptyRegExp = RegExp & {
    readonly source: '(?:)';
};
export interface StringToEmptyTypeMap extends StringToTypeMap {
    boolean: never;
    number: never;
    string: '';
    function: () => undefined;
    array: [];
    date: never;
    regexp: EmptyRegExp;
    object: {
        [I in string | number]: never;
    };
    bigint: never;
    symbol: never;
    null: null;
    undefined: undefined;
}
export declare type NonNever<T extends {}> = Pick<T, {
    [K in keyof T]: T[K] extends never ? never : K;
}[keyof T]>;
export declare type Never<T extends {}> = Pick<T, {
    [K in keyof T]: T[K] extends never ? K : never;
}[keyof T]>;
export declare type PossibleEmptyMap = NonNever<StringToEmptyTypeMap>;
export declare type PossibleEmptyInitialTypeMap = Pick<StringToTypeMap, keyof PossibleEmptyMap>;
export declare type PossibleEmptyType = PossibleEmptyInitialTypeMap[keyof PossibleEmptyInitialTypeMap];
export declare type EmptyTypeNameByType<V extends ExtendedType> = keyof PickByValue<PossibleEmptyMap, V>;
export declare type ImpossibleEmptyMap = Never<StringToEmptyTypeMap>;
export declare type ImpossibleEmptyInitialTypeMap = Pick<StringToTypeMap, keyof ImpossibleEmptyMap>;
export declare type ImpossibleEmptyType = ImpossibleEmptyInitialTypeMap[keyof ImpossibleEmptyInitialTypeMap];
export declare type FilledByDefaultTypeNameByType<V extends ImpossibleEmptyType> = keyof PickByValue<ImpossibleEmptyMap, V>;
export declare type StringToFilledTypeMap = Overwrite<StringToTypeMap, {
    string: SetComplement<string, ''>;
    null: never;
    undefined: never;
}>;
export declare type TypeNameByType<V extends ExtendedType> = keyof PickByValue<StringToTypeMap, V>;
export declare type EmptyTypeByType<V extends ExtendedType> = StringToEmptyTypeMap[TypeNameByType<V>];
export {};
