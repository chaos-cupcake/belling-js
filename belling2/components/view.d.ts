import { forEach, input, list, S, text } from "../index";
import { ariaRole, Style } from "./utilTypes";
export type N = view | scrollView | list | input | text | forEach;
export type V = view | scrollView | list | input;
export declare class baseNode<T extends Node> {
    dom: T;
    constructor(dom: T);
}
type tss_events = {
    [k in keyof HTMLElementEventMap]?: S<HTMLElementEventMap[k]>;
};
export declare class baseView<T extends HTMLElement> extends baseNode<T> {
    style: CSSStyleDeclaration;
    constructor(dom: T);
    addStyle(style?: Style): this;
    setAttr(attr?: {
        [key: string]: string;
    }): this;
    private _events;
    /** Better accessibility support, adding tabindex to make elements focusable, and triggering events when the Enter key is pressed. */
    onClick(): AsyncGenerator<MouseEvent, void, unknown>;
    on<T extends keyof tss_events>(event: T): AsyncGenerator<Awaited<HTMLElementEventMap[T]>, void, unknown>;
}
declare class view extends baseView<HTMLDivElement> {
    _scrollListener?: N[];
    constructor(...children: (N | string)[]);
    role(v: ariaRole): this;
    _whenScroll(s: scrollView): void;
    _scrollState?: S<scrollView>;
    onScroll(): AsyncGenerator<scrollView, void, unknown>;
}
declare class scrollView extends view {
    constructor(...children: (N | string)[]);
    get scrollTop(): number;
    get scrollLeft(): number;
    get scrollHeight(): number;
    get scrollWidth(): number;
}
export declare function View(...children: (N | string)[]): view;
export declare function ScrollView(...children: (N | string)[]): scrollView;
export { view, scrollView };
