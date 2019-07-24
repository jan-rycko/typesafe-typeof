import { ExtendedType, ExtendedTypeName } from './type.model';
export declare function isFilled<T extends ExtendedType, N extends ExtendedTypeName = ExtendedTypeName>(obj: ExtendedType, type: N): boolean;
