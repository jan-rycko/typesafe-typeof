import {
    EmptyTypeMap,
    ExtendedType,
    ExtendedTypeName, FilledTypeMap, Type, TypeMap,
} from './type.model';
import {isTypeOf, typeOf} from './typeof';
import {isEmptyCheck} from './empty';

export function isFilled(obj: TypeMap[keyof TypeMap]): boolean;
export function isFilled<N extends keyof FilledTypeMap | Type>(obj: TypeMap[keyof TypeMap], ...type: N[]): obj is (TypeMap & FilledTypeMap)[N];
export function isFilled<N extends keyof FilledTypeMap | Type>(obj: TypeMap[keyof TypeMap], ...type: N[]): obj is (TypeMap & FilledTypeMap)[N] {
    const typeOfObj = typeOf(obj);

    if (!type.includes(typeOfObj as N)) {
        return false;
    }

    if (typeOfObj) {
        return !isEmptyCheck(obj, typeOfObj);
    }

    return false;
}