import { StringToTypeMap, Type } from './type.model';
export declare const typeOf: <T extends string | number | bigint | boolean | symbol | RegExp | any[] | (Object & {
    [x: string]: any;
    [x: number]: any;
}) | (Function & ((...args: any[]) => any)) | Date | null | undefined, N extends ([T] extends [boolean] ? [boolean] extends [T] ? "boolean" : never : never) | ([T] extends [number] ? [number] extends [T] ? "number" : never : never) | ([T] extends [string] ? [string] extends [T] ? "string" : never : never) | ([T] extends [Function & ((...args: any[]) => any)] ? [Function & ((...args: any[]) => any)] extends [T] ? "function" : never : never) | ([T] extends [any[]] ? [any[]] extends [T] ? "array" : never : never) | ([T] extends [Date] ? [Date] extends [T] ? "date" : never : never) | ([T] extends [RegExp] ? [RegExp] extends [T] ? "regexp" : never : never) | ([T] extends [Object & {
    [x: string]: any;
    [x: number]: any;
}] ? [Object & {
    [x: string]: any;
    [x: number]: any;
}] extends [T] ? "object" : never : never) | ([T] extends [bigint] ? [bigint] extends [T] ? "bigint" : never : never) | ([T] extends [symbol] ? [symbol] extends [T] ? "symbol" : never : never) | ([T] extends [null] ? [null] extends [T] ? "null" : never : never) | ([T] extends [undefined] ? [undefined] extends [T] ? "undefined" : never : never)>(obj: T) => N;
export declare const isTypeOf: <K extends "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "date" | "regexp" | "null" | Type>(obj: any, type: K) => obj is StringToTypeMap[K];
