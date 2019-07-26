import { TypeMap, Type } from './type.model';
export declare const typeOf: <N extends "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "date" | "error" | "nan" | "null" | "promise" | "regexp" | "unset", T extends TypeMap[N]>(obj: T) => N;
export declare const isTypeOf: <N extends "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "date" | "error" | "nan" | "null" | "promise" | "regexp" | "unset" | Type>(obj: string | number | bigint | boolean | symbol | RegExp | any[] | (Object & {
    [x: string]: any;
    [x: number]: any;
}) | ((...args: any[]) => any) | Date | Error | Promise<any> | null | undefined, type: N, ...otherTypes: N[]) => obj is TypeMap[N];
