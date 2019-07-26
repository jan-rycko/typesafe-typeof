import { FilledTypeMap, Type, TypeMap } from './type.model';
export declare function isFilled<N extends keyof FilledTypeMap | Type>(obj: TypeMap[keyof TypeMap], ...type: N[]): obj is (TypeMap & FilledTypeMap)[N];
