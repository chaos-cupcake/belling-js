import { forEach, input, list, S, state, text } from "../index";
import { ariaRole, Style } from "./utilTypes";

export type N = view | scrollView | list | input | text | forEach;
export type V = view | scrollView | list | input;
export class baseNode<T extends Node> {
  constructor(public dom: T) { }
}
type tss_events = { [k in keyof HTMLElementEventMap]?: S<HTMLElementEventMap[k]>; };
type tss_exist<T> = T extends void ? never : T;
function keyboardAccessible(dom: HTMLElement) {
  dom.addEventListener("keydown", () => dom.click());
}
export class baseView<T extends HTMLElement> extends baseNode<T> {
  style: CSSStyleDeclaration;
  constructor(dom: T) {
    super(dom);
    this.style = this.dom.style;
  }
  addStyle(style: Style = {}): this {
    Object.assign(this.dom.style, style);
    return this;
  }
  setAttr(attr: {
    [key: string]: string;
  } = {}): this {
    for (const k in attr) {
      this.dom.setAttribute(k, attr[k]);
    }
    return this;
  }
  private _events: tss_events = {};
  /** Better accessibility support, adding tabindex to make elements focusable, and triggering events when the Enter key is pressed. */
  onClick() {
    keyboardAccessible(this.dom);
    this.dom.setAttribute("tabindex", "0");
    return this.on("click");
  }
  on<T extends keyof tss_events>(event: T) {
    if (event in this._events) return this._events[event]!.updates();
    let s = state<HTMLElementEventMap[T]>() as tss_exist<tss_events[T]>;
    this.dom.addEventListener(event, (e) => { s.update(e); });
    this._events[event] = s;
    return s.updates();
  }
}
class view extends baseView<HTMLDivElement> {
  _scrollListener?: N[];
  constructor(...children: (N | string)[]) {
    super(document.createElement('div'));
    for (const ele of children) {
      if (typeof ele == 'string') {
        this.dom.appendChild(document.createTextNode(ele));
      } else {
        if ((ele instanceof view && ele._scrollListener) || ele instanceof forEach || ele instanceof list) {
          if (!this._scrollListener) this._scrollListener = [ele];
          else this._scrollListener.push(ele);
        }
        this.dom.appendChild(ele.dom);
      }
    }
  }
  role(v: ariaRole): this {
    this.dom.role = v;
    return this;
  }
  _whenScroll(s: scrollView) {
    this._scrollState?.update(s);
    this._scrollListener?.forEach(n => { if (!(n instanceof input || n instanceof text)) n._whenScroll(s); });
  }
  _scrollState?: S<scrollView>;
  onScroll() {
    if (!this._scrollState) this._scrollState = state();
    return this._scrollState.updates();
  }
}
async function whenScroll(s: scrollView) {
  for await (const _ of s.on("scroll")) {
    s._whenScroll(s);
  }
}
class scrollView extends view {
  constructor(...children: (N | string)[]) {
    super(...children);
    this.style.height = '100%';
    this.style.width = '100%';
    this.style.overflow = 'auto';
    if (this._scrollListener != void 0)
      whenScroll(this);
  }
  get scrollTop() {
    return this.dom.scrollTop;
  }
  get scrollLeft() {
    return this.dom.scrollLeft;
  }
  get scrollHeight() {
    return this.dom.scrollHeight;
  }
  get scrollWidth() {
    return this.dom.scrollWidth;
  }
}
export function View(...children: (N | string)[]) {
  return new view(...children);
}
export function ScrollView(...children: (N | string)[]) {
  return new scrollView(...children);
}
export { view, scrollView };