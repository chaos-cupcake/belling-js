declare class S<T> {
    #private;
    updates(): AsyncGenerator<Awaited<T>, void, unknown>;
    update(v: T): void;
}
export declare function state<T>(): S<T>;
export type { S };
export * from "./components/view";
export * from "./components/forEach";
export * from "./components/elements";
