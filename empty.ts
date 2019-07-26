import {typeOf} from './typeof';
import {
    EmptyTypeMap,
    Type,
    TypeMap,
} from './type.model';

export function isEmpty(obj: TypeMap[keyof TypeMap]): boolean;
export function isEmpty<N extends keyof EmptyTypeMap | Type>(obj: TypeMap[keyof TypeMap], type: N, ...otherTypes: N[]): obj is (TypeMap & EmptyTypeMap)[N];
export function isEmpty<N extends keyof EmptyTypeMap | Type>(obj: TypeMap[keyof TypeMap], ...type: N[]): obj is (TypeMap & EmptyTypeMap)[N] {
    const typesToCheck: N[] = type;
    const typeOfObj = typeOf(obj);

    if (!typesToCheck.includes(typeOfObj as N)) {
        return false;
    }

    if (typeOfObj) {
        return isEmptyCheck(obj, typeOfObj);
    }

    return false;
}

const isObjectEmpty = (obj: TypeMap[Type.object]) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
};

const isFunctionEmpty = (obj: TypeMap[Type.function]) => {
    const nonArrowString = obj.toString().replace(/(\s|\n|=>)/g, '');

    return /^(function([a-zA-Z_$][0-9a-zA-Z_$]*)?)?\(\){}$/.test(nonArrowString);
};

export const isEmptyCheck = <N extends keyof TypeMap>(obj: any, type?: N): obj is EmptyTypeMap[N] => {
    switch (type) {
        case Type.array: return obj.length === 0;
        case Type.object: return isObjectEmpty(obj);
        case Type.string: return obj === '';
        case Type.regexp: return obj.toString() === new RegExp('').toString();
        case Type.function: return isFunctionEmpty(obj);
        case Type.error: return obj.message === '';
        case Type['undefined']:
        case Type.null:
        case Type.nan:
            return true;
    }

    return false;
};