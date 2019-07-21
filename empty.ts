import {NormalizedTypeName, StringToTypeMap, Type, typeOf} from './typeof';

export type EmptyRegExp = RegExp & {
    readonly source: '(?:)'
}

export interface StringToEmptyTypeMap extends StringToTypeMap {
    boolean: never
    number: never
    string: ''
    function: never
    array: []
    date: never
    regexp: EmptyRegExp
    object: { [I in string | number]?: never }
    bigint: never
    symbol: never
    null: null
    undefined: undefined
}

export const isEmpty = <K extends NormalizedTypeName>(obj: StringToTypeMap[K], type?: K): obj is StringToEmptyTypeMap[K] => {
    const typeToCheck = type || typeOf(obj) as unknown as K;

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

const isEmptyCheck = <K extends NormalizedTypeName | Type>(obj: any, type?: K): obj is StringToEmptyTypeMap[K] => {
    switch (type) {
        case Type.array: return obj.length === 0;
        case Type.object: return isObjectEmpty(obj);
        case Type.string: return obj === '';
        case Type.regexp: return obj.toString() === new RegExp('').toString();
        case Type.undefined:
        case Type.null:
            return true;
    }

    return false;
};