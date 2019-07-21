import { typeOf as nonTypedTypeof } from 'remedial';

interface StringToType {
    boolean: boolean
    number: number
    string: string
    function: (...args: any[]) => any
    array: any[]
    date: Date
    regexp: RegExp
    object: { [I in string | number]?: any }
    bigint: bigint
    symbol: symbol
    null: null
    undefined: undefined
}

type NormalizedType = keyof StringToType;

const typeOf: (obj: any) => NormalizedType = (obj) => {
    const type = nonTypedTypeof(obj);

    return type === 'object' ? typeof obj : type;
};

const isTypeOf = <K extends NormalizedType>(obj: any, type: K): obj is StringToType[K] => {
    return typeOf(obj) === type;
};

export {
    typeOf,
    isTypeOf,
};