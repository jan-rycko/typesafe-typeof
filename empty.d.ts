import { EmptyTypeMap, Type, TypeMap } from './type.model';
export declare function isEmpty<N extends keyof EmptyTypeMap | Type>(obj: TypeMap[keyof TypeMap], type: N, ...otherTypes: N[]): obj is (TypeMap & EmptyTypeMap)[N];
export declare const isEmptyCheck: <N extends "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "date" | "error" | "null" | "nan" | "promise" | "regexp" | "unset">(obj: any, type?: N | undefined) => obj is EmptyTypeMap[N];
