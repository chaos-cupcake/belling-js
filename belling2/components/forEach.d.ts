import { N, baseNode, S, scrollView, view, V } from "../index";
/**
 * List elements cannot be duplicated!
 */
export declare class forEach extends baseNode<Comment> {
    nodes: N[];
    _scrollListener: N[];
    constructor(nodes?: N[]);
    _whenScroll(s: scrollView): void;
}
export declare function ForEach<T>(list: S<T[]>, f: (item: T) => N, whenRemove?: ((item: T, node: N) => void)): forEach;
export declare class list extends view {
    nodes: V[];
    constructor(nodes?: V[]);
}
export declare function List<T>(l: S<T[]>, f: (item: T) => N, nodes?: V[], whenRemove?: ((item: T, node: N) => void)): list;
export declare class indexedList<T extends V> extends view {
    nodes: T[];
    constructor(nodes?: T[]);
}
export declare class listItem extends view {
    index: number;
}
export declare function IndexedList<T, K extends listItem>(l: S<T[]>, f: (item: T) => K, nodes?: K[], whenRemove?: ((item: T, node: K) => void)): indexedList<K>;
