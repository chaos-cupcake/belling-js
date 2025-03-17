import { State, Watcher, Any, Signal } from "./index";
import { array } from "./array";
interface Kv<V> {
    [key: string]: V;
}
type Style = {
    [K in Exclude<keyof CSSStyleDeclaration, "setProperty" | "removeProperty" | "item" | "getPropertyValue" | "getPropertyPriority" | typeof Symbol.iterator | "length" | "parentRule">]?: CSSStyleDeclaration[K];
};
declare class ele {
    name: string;
    _events?: {
        [K in keyof GlobalEventHandlersEventMap]?: (e: GlobalEventHandlersEventMap[K]) => void;
    } | {
        unmount?: () => void;
    };
    _attr?: Kv<string | Signal<string> | (() => string)>;
    _style?: {
        [k in keyof Style]?: string | Signal<string> | (() => string);
    };
    _ref?: (dom: Element) => void;
    dom?: Element;
    children?: (ele | string | Signal<string> | (() => string))[];
    constructor(name: string, children?: ele["children"]);
    style(s: (typeof this)["_style"]): this;
    attr(attr: (typeof this)["_attr"]): this;
    on(on: typeof this._events): this;
    ref(callback: (dom: Element) => void): this;
    render(r: root): Element;
}
export declare class root {
    #private;
    dom: Element;
    _whenDestroy: (() => void)[];
    constructor(parentDom: Element | undefined, n: ele);
    _watch(s: Signal<Any>): void;
    _addDestroyCallback(f: () => void): void;
    _destroy(): void;
}
/**
 * 列表中的元素不能重复!
 * 推荐对象作为列表元素（signal[], object[]）
 */
declare class ForEachNode<T> extends ele {
    #private;
    list: Signal<T[] | array<T>>;
    f: (v: T) => ele;
    constructor(name: string, list: Signal<T[] | array<T>>, f: (v: T) => ele);
    render(r: root): Element;
}
declare class node extends ele {
    _node: Signal<ele>;
    _ele: ele;
    _root?: root;
    _watcher: Watcher;
    constructor(render: Signal<ele>);
    render(r: root): Element;
}
export declare function h(name: string, ...children: (ele | string | Signal<string> | (() => string))[]): ele;
export declare function ForEach<T extends object>(name: string, list: Signal<T[] | array<T>>, f: (v: T) => ele): ForEachNode<T>;
export declare function ForIn<T extends object>(name: string, list: Signal<T[] | array<T>>, f: (i: State<number>, v: T) => ele): ForEachNode<T>;
export type ForEach<T> = ForEachNode<T>;
export declare function dynNode(ele: Signal<ele> | (() => ele)): node;
export type Ele = ele;
export {};
