import {
    ExtendedType,
    ExtendedTypeName,
} from './type.model';
import {isTypeOf, typeOf} from './typeof';
import {isEmptyCheck} from './empty';

export function isFilled<T extends ExtendedType, N extends ExtendedTypeName = ExtendedTypeName>(obj: ExtendedType, type: N): boolean {
    if (type && !isTypeOf(obj, type)) {
        return false;
    }

    const typeToCheck: N = type || typeOf(obj);

    if (typeToCheck) {
        return !isEmptyCheck(obj, typeToCheck);
    }

    return false;
}