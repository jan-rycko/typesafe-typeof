import { typeOf as nonTypedTypeof } from 'remedial';
import {PickByValueExact} from 'utility-types';
import {ExtendedType, ExtendedTypeName, StringToTypeMap, Type, TypeNameByType} from './type.model';

export const typeOf = <T extends ExtendedType, N extends keyof PickByValueExact<StringToTypeMap, T>>(obj: T): N => {
    const type = nonTypedTypeof(obj); // supports array, date, regexp and null type but defaults to object for some reason

    return type === 'object' ?
        typeof obj // fix for bigint, symbol and any future type defaulting to object by remedial
        : type;
};

export const isTypeOf = <K extends ExtendedTypeName | Type>(obj: any, type: K | K[]): obj is StringToTypeMap[K] => {
    const checkedType: Type = typeOf(obj);
    const typesToCheck: K[] = typeof type === 'string' ? [type] : type;

    return typesToCheck.reduce((acc, type) => {
        if (acc) {
            return acc;
        }

        if (type === Type.unset && [Type.null, Type.undefined].includes(checkedType)) {
            return true;
        }

        return checkedType === type;
    }, false);
};