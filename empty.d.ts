import { StringToEmptyTypeMap, Type } from './type.model';
export declare const isEmpty: <T extends string | number | bigint | boolean | symbol | RegExp | any[] | (Object & {
    [x: string]: any;
    [x: number]: any;
}) | (Function & ((...args: any[]) => any)) | Date | null | undefined, N extends (boolean extends T ? "boolean" : never) | (number extends T ? "number" : never) | (string extends T ? "string" : never) | (Function & ((...args: any[]) => any) extends T ? "function" : never) | (any[] extends T ? "array" : never) | (Date extends T ? "date" : never) | (RegExp extends T ? "regexp" : never) | (Object & {
    [x: string]: any;
    [x: number]: any;
} extends T ? "object" : never) | (bigint extends T ? "bigint" : never) | (symbol extends T ? "symbol" : never) | (null extends T ? "null" : never) | (undefined extends T ? "undefined" : never) = (boolean extends T ? "boolean" : never) | (number extends T ? "number" : never) | (string extends T ? "string" : never) | (Function & ((...args: any[]) => any) extends T ? "function" : never) | (any[] extends T ? "array" : never) | (Date extends T ? "date" : never) | (RegExp extends T ? "regexp" : never) | (Object & {
    [x: string]: any;
    [x: number]: any;
} extends T ? "object" : never) | (bigint extends T ? "bigint" : never) | (symbol extends T ? "symbol" : never) | (null extends T ? "null" : never) | (undefined extends T ? "undefined" : never)>(obj: string | number | bigint | boolean | symbol | RegExp | any[] | (Object & {
    [x: string]: any;
    [x: number]: any;
}) | (Function & ((...args: any[]) => any)) | Date | null | undefined, type?: N | undefined) => obj is StringToEmptyTypeMap[N];
export declare const isEmptyCheck: <K extends "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "date" | "regexp" | "null" | Type>(obj: any, type?: K | undefined) => obj is StringToEmptyTypeMap[K];
