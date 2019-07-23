import {isTypeOf, typeOf} from 'typeof';
import {ExtendedTypeName, StringToEmptyTypeMap, Type, StringToTypeMap, ExtendedType, TypeNameByType} from 'type.model';

export const isEmpty = <T extends ExtendedType, N extends TypeNameByType<T> = TypeNameByType<T>>(obj: ExtendedType, type?: N): obj is StringToEmptyTypeMap[N] => {
    if (type && !isTypeOf(obj, type)) {
        return false;
    }

    const typeToCheck: N = type || typeOf(obj);

    if (typeToCheck) {
        return isEmptyCheck(obj, typeToCheck);
    }

    return false;
};

const isObjectEmpty = (obj: StringToTypeMap[Type.object]) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
};

const isFunctionEmpty = (obj: StringToTypeMap[Type.function]) => {
    const nonArrowString = obj.toString().replace(/(\s|\n|=>)/g, '');

    return /^(function)?([a-zA-Z_$][0-9a-zA-Z_$]*)?\(\){}$/.test(nonArrowString);
};

const isEmptyCheck = <K extends ExtendedTypeName | Type>(obj: any, type?: K): obj is StringToEmptyTypeMap[K] => {
    switch (type) {
        case Type.array: return obj.length === 0;
        case Type.object: return isObjectEmpty(obj);
        case Type.string: return obj === '';
        case Type.regexp: return obj.toString() === new RegExp('').toString();
        case Type.function: return isFunctionEmpty(obj);
        case Type.undefined:
        case Type.null:
            return true;
    }

    return false;
};