import {TypeMap, Type} from './type.model';

export const typeOf = <N extends keyof TypeMap, T extends TypeMap[N]>(obj: T): N => {
    if (obj === null || obj === undefined) {
        return String(obj) as N;
    }

    const type = typeof obj;

    if (type === 'object') {
        return Object.prototype.toString.call(obj)
            .replace(/\[object (.*)]/, '$1')
            .toLowerCase();
    }

    if (type === 'number' && Number.isNaN(obj as number)) {
        return 'nan' as N;
    }

    return type as N;
};



export const isTypeOf = <N extends keyof TypeMap | Type>(
    obj: TypeMap[keyof TypeMap],
    type: N,
    ...otherTypes: N[]
): obj is TypeMap[N] => {
    const checkedType: Type = typeOf(obj);
    const typesToCheck: N[] = [type, ...otherTypes];

    return typesToCheck.reduce((acc, type) => {
        if (acc) {
            return acc;
        }

        if (type === Type.unset && [Type.nan, Type.null, Type['undefined']].includes(checkedType)) {
            return true;
        }

        return checkedType === type;
    }, false);
};