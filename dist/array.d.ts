export declare function makeArr<T>(...v: T[]): arr<T>;
declare class arr<T> {
    left?: arr<T>;
    right?: arr<T>;
    data?: T[];
    length: number;
    off: number;
    subarray(i: number, len: number): arr<T>;
    unshift(...item: T[]): arr<T>;
    push(...item: T[]): arr<T>;
    concat(n: arr<T>): arr<T>;
    insert(i: number, ...item: T[]): arr<T>;
    delete(i: number, len: number): arr<T>;
    splice(i: number, delLen: number, ...item: T[]): arr<T>;
    set(i: number, v: T): arr<T>;
    at(i: number): T | undefined;
    forEach(fn: (v: T, i: number) => void): void;
    every(fn: (v: T, i: number) => boolean): boolean;
    forEachInRange(start: number, len: number, fn: (v: T, i: number) => void | symbol): void;
    forEachInRangeReversed(end: number, len: number, fn: (v: T, i: number) => void | symbol): void;
    map<R>(fn: (v: T, i: number) => R): arr<R>;
    flat(): arr<T>;
    sort(fn: ((a: T, b: T) => number) | undefined): arr<T>;
}
export type array<T> = arr<T>;
export declare const Stop: unique symbol;
export {};
