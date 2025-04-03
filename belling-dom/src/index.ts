import {
  compute,
  State,
  Compute,
  Watcher,
  watcher,
  Signal,
  state,
  array,
} from "belling";

interface Kv<V> {
  [key: string]: V;
}
type Style = {
  [K in Exclude<
    keyof CSSStyleDeclaration,
    | "setProperty"
    | "removeProperty"
    | "item"
    | "getPropertyValue"
    | "getPropertyPriority"
    | typeof Symbol.iterator
    | "length"
    | "parentRule"
  >]?: CSSStyleDeclaration[K];
};
interface ElementEventMap {
  audio: HTMLMediaElementEventMap;
  media: HTMLMediaElementEventMap;
  video: HTMLVideoElementEventMap;
}
type EventMap<T extends keyof HTMLElementTagNameMap> =
  T extends keyof ElementEventMap ? ElementEventMap[T] : HTMLElementEventMap;
class Ele<T extends keyof HTMLElementTagNameMap> {
  name: T;
  _events?: {
    [K in keyof EventMap<T>]?: (e: EventMap<T>[K]) => void;
  } & { unmount?: () => void };
  _attr?: Kv<string | Signal<string> | (() => string)>;
  _style?: { [k in keyof Style]?: string | Signal<string> | (() => string) };
  _ref?: (dom: Element) => void;
  dom?: HTMLElementTagNameMap[T];
  children?: children;
  constructor(name: T, children?: children) {
    this.name = name;
    this.children = children;
  }
  style(s: typeof this._style) {
    if (this._style) Object.assign(this._style, s);
    else this._style = s;
    return this;
  }
  styles(...s: (typeof this._style)[]) {
    let _ = this._style || {};
    for (const S of s) {
      Object.assign(_, S);
    }
    this._style = _;
    return this;
  }
  attr(attr: typeof this._attr) {
    if (this._attr) Object.assign(this._attr, attr);
    else this._attr = attr;
    return this;
  }
  on(on: typeof this._events) {
    if (this._events) Object.assign(this._events, on);
    else this._events = on;
    return this;
  }
  ref(callback: (dom: Element) => void) {
    this._ref = callback;
    return this;
  }
  render(r: root<any>, _el = document.createElement<T>(this.name)) {
    const el = _el;
    this.dom = el;
    if (this._events)
      for (const e in this._events) {
        // @ts-ignore
        const f = this._events[e];
        // @ts-ignore
        if (e === "unmount") r._addDestroyCallback(this._events.unmount);
        else el.addEventListener(e, f);
      }
    if (this._attr)
      for (const a in this._attr) {
        const v = this._attr[a];
        if (typeof v == "function") {
          r._watch(
            compute(() => {
              el.setAttribute(a, v());
            })
          );
        } else if (v instanceof Compute || v instanceof State) {
          r._watch(
            compute(() => {
              el.setAttribute(a, v.v);
            })
          );
        } else {
          el.setAttribute(a, v);
        }
      }
    if (this._style)
      for (const n0 in this._style) {
        const n = n0 as keyof typeof this._style;
        const v = this._style[n];
        if (typeof v == "function") {
          r._watch(
            compute(() => {
              el.style[n] = v();
            })
          );
        } else if (v instanceof Compute || v instanceof State) {
          r._watch(
            compute(() => {
              el.style[n] = v.v;
            })
          );
        } else {
          el.style[n] = v as string;
        }
      }
    if (this.children)
      for (const n of this.children) {
        if (typeof n == "string") {
          const t = document.createTextNode(n);
          el.appendChild(t);
        } else if (typeof n == "function") {
          const t = document.createTextNode("");
          r._watch(
            compute(() => {
              t.nodeValue = n();
            })
          );
          el.appendChild(t);
        } else if (n instanceof State || n instanceof Compute) {
          const t = document.createTextNode("");
          r._watch(
            compute(() => {
              t.nodeValue = n.v;
            })
          );
          el.appendChild(t);
        } else {
          el.appendChild(n.render(r));
        }
      }
    this._ref?.(el);
    return el;
  }
}
const l = new Set<Signal<any>>();
const f = new Set<() => void>();
let req = false;

function update() {
  f.forEach((n) => n());
  l.forEach((n) => n.v);
  l.clear();
  f.clear();
  req = false;
}
function willUpdate(n: Signal<any> | (() => void)) {
  if (!req) {
    req = true;
    requestAnimationFrame(update);
  }
  if (typeof n == "function") f.add(n);
  else l.add(n);
}
export class root<T extends keyof HTMLElementTagNameMap> {
  dom: Element;
  #watcher = new Watcher();
  #stateList: Signal<any>[] = [];
  _whenDestroy = [] as (() => void)[];
  constructor(parentDom: Element | undefined, n: Ele<T>) {
    this.#watcher.callback = willUpdate;
    this.dom = n.render(this);
    parentDom?.appendChild(this.dom);
  }
  _watch(s: Signal<any>) {
    this.#stateList.push(s);
    this.#watcher.watch(s);
  }
  _addDestroyCallback(f: () => void) {
    this._whenDestroy.push(f);
  }
  _destroy() {
    this.#watcher.unwatch();
    this._whenDestroy.forEach((f) => f());
  }
}
function increaseSeq(arr: number[], prev: number[], res: number[]) {
  res.length = 0;
  prev.length = 0;
  if (arr.length < 1) return res;
  function set(i: number, v: number) {
    for (let j = prev.length; j < i; j++) prev.push(-1);
    prev[i] = v;
  }
  let i = 0;
  const len = arr.length;
  for (; i < len && arr[i] == -1; i++);
  res[0] = i;
  for (; i < len; i++) {
    const v = arr[i];
    if (v == -1) continue;
    const j = res[res.length - 1];
    if (arr[j] < v) {
      set(i, j);
      res.push(i);
      continue;
    }
    let start = 0;
    let end = res.length - 1;
    let mid: number;
    while (start < end) {
      mid = (start + end) >> 1;
      if (arr[res[mid]] < v) start = mid + 1;
      else end = mid;
    }
    const k = start;
    if (v < arr[res[k]]) {
      if (k > 0) set(i, res[k - 1]);
      res[k] = i;
    }
  }
  i = res.length;
  let pre = res[res.length - 1];
  if (pre > arr.length) {
    return res;
  }
  while (i-- > 0) {
    res[i] = arr[pre];
    pre = prev[pre];
  }
  return res;
}
const tmp1: number[] = [],
  tmp2: number[] = [],
  tmp3: number[] = [];
const tmp5: ChildNode[] = [];
/**
 * When there are duplicate items in a list, the components rendered for those identical items cannot be reused during diff updates due to the inability to determine a stable mapping relationship.
 */
class ForEachNode<
  T,
  K extends keyof HTMLElementTagNameMap,
  L extends keyof HTMLElementTagNameMap
> extends Ele<K> {
  list: Signal<T[] | array<T>>;
  f: (v: T) => Ele<L>;
  constructor(name: K, list: Signal<T[] | array<T>>, f: (v: T) => Ele<L>) {
    super(name);
    this.list = list;
    this.f = f;
  }
  #vIdx = new Map<T, number>();
  #roots = new Map<T, root<L>>();
  render(r: root<any>, _el?: HTMLElementTagNameMap[K]) {
    const el = super.render(r, _el);
    const list = this.list,
      vi = this.#vIdx,
      mapFn = this.f,
      roots = this.#roots;
    const repeatedItems: root<L>[] = [];
    function update(): void {
      const new2old = tmp1;
      new2old.length = 0;
      const l = list.v;
      l.forEach((item) => {
        const i = vi.get(item);
        if (typeof i == "number") {
          vi.set(item, -1);
          new2old.push(i);
        } else {
          new2old.push(-1);
        }
      });
      const oldDomList = tmp5;
      el.childNodes.forEach((v) => oldDomList.push(v));
      repeatedItems.forEach((r) => {
        r._destroy();
        el.removeChild(r.dom);
      });
      repeatedItems.length = 0;
      vi.forEach((i, v) => {
        if (i != -1) {
          (roots.get(v) as root<L>)._destroy();
          roots.delete(v);
          vi.delete(v);
          el.removeChild(oldDomList[i]);
        }
      });
      const res = increaseSeq(new2old, tmp2, tmp3);
      let j = 0;
      l.forEach((v, i) => {
        const old = new2old[i],
          next = res[j];
        if (old == -1) {
          const n = new root(void 0, mapFn(v));
          if (i == l.length - 1) el.appendChild(n.dom);
          else el.insertBefore(n.dom, oldDomList[next]);
          if (vi.has(v)) {
            repeatedItems.push(n);
            return;
          }
          roots.set(v, n);
        } else if (old == next) {
          j++;
        } else {
          el.insertBefore(oldDomList[old], oldDomList[next]);
        }
        vi.set(v, i);
      });
      tmp1.length = tmp2.length = tmp3.length = tmp5.length = 0;
    }
    const w = watcher(() => {
      willUpdate(update);
    });
    w.watch(list);
    r._addDestroyCallback(() => {
      w.unwatch();
      this.#roots.forEach((r) => r._destroy());
    });
    update();
    return el;
  }
}
class DynNode<T extends keyof HTMLElementTagNameMap> extends Ele<"div"> {
  _node;
  _ele?: Ele<T>;
  _root?: root<T>;
  _watcher;
  dynDom?: HTMLElementTagNameMap[T];
  dom = void 0;
  constructor(render: Signal<Ele<T>>) {
    super("div");
    this._node = render;
    const update = () => {
      const e = render.v;
      this._ele = e;
      this._events = e._events;
      this._attr = e._attr;
      this._style = e._style;
      this._ref = e._ref;
      this.children = e.children;
      this._root?._destroy();
      this._root = new root(void 0, e);
      if (this.dynDom) {
        const p = this.dynDom.parentNode;
        if (p) {
          p.replaceChild(this._root.dom, this.dynDom);
        }
      }
      this.dynDom = e.dom;
    };
    this._watcher = watcher(update);
  }
  render(r: root<any>) {
    const render = this._node;
    this._ele = render.v;
    this._watcher.watch(render);
    (this._watcher.callback as () => void)();
    r._addDestroyCallback(() => {
      this._root?._destroy();
      this._watcher.unwatch();
    });
    return this.dynDom as HTMLDivElement;
  }
}
type children = (Ele<any> | string | Signal<string> | (() => string))[];
export function h(name: keyof HTMLElementTagNameMap, ...children: children) {
  return new Ele(name, children);
}
export function ForEach<
  T,
  K extends keyof HTMLElementTagNameMap,
  L extends keyof HTMLElementTagNameMap
>(name: K, list: Signal<T[] | array<T>>, f: (v: T) => Ele<L>) {
  const e = new ForEachNode<T, K, L>(name, list, f);
  return e;
}
export function ForIn<
  T extends object,
  K extends keyof HTMLElementTagNameMap,
  L extends keyof HTMLElementTagNameMap
>(
  name: K,
  list: Signal<T[] | array<T>>,
  f: (i: State<number>, v: T) => Ele<L>
) {
  let si = new WeakMap<T, State<number>>();
  const e = new ForEachNode<T, K, L>(
    name,
    compute(() => {
      let l = list.v;
      l.forEach((v, i) => {
        let s = si.get(v);
        if (s) s.v = i;
        else si.set(v, state(i));
      });
      return l;
    }),
    (v: T) => {
      return f(si.get(v) as State<number>, v);
    }
  );
  return e;
}
export type ForEach<
  T,
  K extends keyof HTMLElementTagNameMap,
  L extends keyof HTMLElementTagNameMap
> = ForEachNode<T, K, L>;

/** Do not cache and reuse old nodes; when a node is removed, destroy will be executed to recycle the node! */
export function dynNode<T extends keyof HTMLElementTagNameMap>(
  ele: Signal<Ele<T>> | (() => Ele<T>)
) {
  if (typeof ele == "function") return new DynNode(compute(ele));
  return new DynNode(ele);
}

class Input<T extends "input" | "textarea"> extends Ele<T> {
  value?: State<string>;
  constructor(name: T) {
    super(name);
  }
  bind(value: State<string>) {
    this.value = value;
    return this;
  }
  render(r: root<any>, _el = document.createElement<T>(this.name)) {
    if (this.value) {
      r._watch(
        compute(() => {
          _el.value = this.value!.v;
        })
      );
      _el.addEventListener("input", () => {
        this.value!.v = _el.value;
      });
    }
    super.render(r, _el);
    return _el;
  }
}

export type { Ele, DynNode, Input };

// html5 elements

export function address(...children: children) {
  return new Ele("address", children);
}
export function article(...children: children) {
  return new Ele("article", children);
}
export function aside(...children: children) {
  return new Ele("aside", children);
}
export function footer(...children: children) {
  return new Ele("footer", children);
}
export function header(...children: children) {
  return new Ele("header", children);
}
export function h1(...children: children) {
  return new Ele("h1", children);
}
export function h2(...children: children) {
  return new Ele("h2", children);
}
export function h3(...children: children) {
  return new Ele("h3", children);
}
export function h4(...children: children) {
  return new Ele("h4", children);
}
export function h5(...children: children) {
  return new Ele("h5", children);
}
export function h6(...children: children) {
  return new Ele("h6", children);
}
export function main(...children: children) {
  return new Ele("main", children);
}
export function nav(...children: children) {
  return new Ele("nav", children);
}
export function section(...children: children) {
  return new Ele("section", children);
}
export function blockquote(...children: children) {
  return new Ele("blockquote", children);
}
export function dd(...children: children) {
  return new Ele("dd", children);
}
export function div(...children: children) {
  return new Ele("div", children);
}
export function dl(...children: children) {
  return new Ele("dl", children);
}
export function dt(...children: children) {
  return new Ele("dt", children);
}
export function figcaption(...children: children) {
  return new Ele("figcaption", children);
}
export function figure(...children: children) {
  return new Ele("figure", children);
}
export function hr() {
  return new Ele("hr");
}
export function li(...children: children) {
  return new Ele("li", children);
}
export function menu(...children: children) {
  return new Ele("menu", children);
}
export function ol(...children: children) {
  return new Ele("ol", children);
}
export function p(...children: children) {
  return new Ele("p", children);
}
export function pre(...children: children) {
  return new Ele("pre", children);
}
export function ul(...children: children) {
  return new Ele("ul", children);
}
export function a(...children: children) {
  return new Ele("a", children);
}
export function abbr(...children: children) {
  return new Ele("abbr", children);
}
export function b(...children: children) {
  return new Ele("b", children);
}
export function bdi(...children: children) {
  return new Ele("bdi", children);
}
export function bdo(...children: children) {
  return new Ele("bdo", children);
}
export function br() {
  return new Ele("br");
}
export function cite(...children: children) {
  return new Ele("cite", children);
}
export function code(...children: children) {
  return new Ele("code", children);
}
export function data(...children: children) {
  return new Ele("data", children);
}
export function dfn(...children: children) {
  return new Ele("dfn", children);
}
export function em(...children: children) {
  return new Ele("em", children);
}
export function i(...children: children) {
  return new Ele("i", children);
}
export function kbd(...children: children) {
  return new Ele("kbd", children);
}
export function mark(...children: children) {
  return new Ele("mark", children);
}
export function q(...children: children) {
  return new Ele("q", children);
}
export function rp(...children: children) {
  return new Ele("rp", children);
}
export function rt(...children: children) {
  return new Ele("rt", children);
}
export function ruby(...children: children) {
  return new Ele("ruby", children);
}
export function s(...children: children) {
  return new Ele("s", children);
}
export function samp(...children: children) {
  return new Ele("samp", children);
}
export function small(...children: children) {
  return new Ele("small", children);
}
export function span(...children: children) {
  return new Ele("span", children);
}
export function strong(...children: children) {
  return new Ele("strong", children);
}
export function sub(...children: children) {
  return new Ele("sub", children);
}
export function sup(...children: children) {
  return new Ele("sup", children);
}
export function time(...children: children) {
  return new Ele("time", children);
}
export function u(...children: children) {
  return new Ele("u", children);
}
export function Var(...children: children) {
  return new Ele("var", children);
}
export function wbr() {
  return new Ele("wbr");
}
export function area() {
  return new Ele("area");
}
export function audio(...children: children) {
  return new Ele("audio", children);
}
export function img() {
  return new Ele("img");
}
export function map(...children: children) {
  return new Ele("map", children);
}
export function track() {
  return new Ele("track");
}
export function video(...children: children) {
  return new Ele("video", children);
}
export function embed() {
  return new Ele("embed");
}
export function iframe(...children: children) {
  return new Ele("iframe", children);
}
export function object(...children: children) {
  return new Ele("object", children);
}
export function picture(...children: children) {
  return new Ele("picture", children);
}
s;
export function source() {
  return new Ele("source");
}
export function canvas(...children: children) {
  return new Ele("canvas", children);
}
export function ins(...children: children) {
  return new Ele("ins", children);
}
export function del(...children: children) {
  return new Ele("del", children);
}
export function caption(...children: children) {
  return new Ele("caption", children);
}
export function col() {
  return new Ele("col");
}
export function colgroup(...children: children) {
  return new Ele("colgroup", children);
}
export function table(...children: children) {
  return new Ele("table", children);
}
export function tbody(...children: children) {
  return new Ele("tbody", children);
}
export function td(...children: children) {
  return new Ele("td", children);
}
export function tfoot(...children: children) {
  return new Ele("tfoot", children);
}
export function th(...children: children) {
  return new Ele("th", children);
}
export function thead(...children: children) {
  return new Ele("thead", children);
}
export function tr(...children: children) {
  return new Ele("tr", children);
}
export function button(...children: children) {
  return new Ele("button", children);
}
export function datalist(...children: children) {
  return new Ele("datalist", children);
}
export function fieldset(...children: children) {
  return new Ele("fieldset", children);
}
export function form(...children: children) {
  return new Ele("form", children);
}
export function input() {
  return new Input("input");
}
export function label(...children: children) {
  return new Ele("label", children);
}
export function legend(...children: children) {
  return new Ele("legend", children);
}
export function meter(...children: children) {
  return new Ele("meter", children);
}
export function optgroup(...children: children) {
  return new Ele("optgroup", children);
}
export function option(...children: children) {
  return new Ele("option", children);
}
export function output(...children: children) {
  return new Ele("output", children);
}
export function progress(...children: children) {
  return new Ele("progress", children);
}
export function select(...children: children) {
  return new Ele("select", children);
}
export function textarea() {
  return new Input("textarea");
}
export function details(...children: children) {
  return new Ele("details", children);
}
export function dialog(...children: children) {
  return new Ele("dialog", children);
}
export function summary(...children: children) {
  return new Ele("summary", children);
}
export function slot(...children: children) {
  return new Ele("slot", children);
}
export function template(...children: children) {
  return new Ele("template", children);
}
