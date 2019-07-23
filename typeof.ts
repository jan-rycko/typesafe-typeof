import { typeOf as nonTypedTypeof } from 'remedial';
import {PickByValueExact} from 'utility-types';
import { ExtendedType, ExtendedTypeName, StringToTypeMap, Type } from 'type.model';

export const typeOf = <T extends ExtendedType, N extends keyof PickByValueExact<StringToTypeMap, T>>(obj: T): N => {
    const type = nonTypedTypeof(obj); // supports array, date, regexp and null type but defaults to object for some reason

    return type === 'object' ?
        typeof obj // fix for bigint, symbol and any future type defaulting to object by remedial
        : type;
};

export const isTypeOf = <K extends ExtendedTypeName | Type>(obj: any, type: K): obj is StringToTypeMap[K] => {
    return typeOf(obj) === type;
};