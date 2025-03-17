import { array, makeArr, Stop } from "./array";
import { root, h, ForEach, ForIn, dynNode, Ele } from "./dom";
export { root, h, ForEach, ForIn, dynNode, makeArr, Stop };
export type { array, Ele };
export declare class State<T extends Any> {
    #private;
    _Consumer: Compute<Any>[];
    _Watchers?: Watcher | Watcher[];
    constructor(v: T);
    get v(): T;
    set v(v: T);
}
type BasicType = number | string | boolean;
export type Any = BasicType | object | undefined | void | null | BasicType[] | array<BasicType>;
export declare class Compute<T extends Any> {
    _Consumer: Compute<Any>[];
    _Watchers?: Watcher | Watcher[];
    _Func: () => T;
    _Dirty: boolean;
    constructor(func: () => T);
    _v?: T;
    _Err?: Error;
    _Producer: signal[];
    _GetCallback(producer: signal): void;
    get v(): T;
    get error(): Error | undefined;
    get computation(): () => T;
}
export type Signal<T extends Any> = State<T> | Compute<T>;
type signal = State<Any> | Compute<Any>;
export declare class Watcher {
    _Func?: (n: signal) => void;
    watch(n: signal): void;
    unwatch(n: signal): void;
    set callback(v: ((n: signal) => void) | undefined);
    get callback(): ((n: signal) => void) | undefined;
}
export declare function state<T extends Any>(v: T): State<T>;
export declare function compute<T extends Any>(f: () => T): Compute<T>;
export declare function watcher(callback: ((n: signal) => void) | undefined): Watcher;
