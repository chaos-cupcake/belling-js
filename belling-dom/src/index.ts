import {
  compute,
  State,
  Compute,
  Watcher,
  Any,
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
class ele<T extends keyof HTMLElementTagNameMap> {
  name: T;
  _events?:
    | {
        [K in keyof GlobalEventHandlersEventMap]?: (
          e: GlobalEventHandlersEventMap[K]
        ) => void;
      }
    | { unmount?: () => void };
  _attr?: Kv<string | Signal<string> | (() => string)>;
  _style?: { [k in keyof Style]?: string | Signal<string> | (() => string) };
  _ref?: (dom: Element) => void;
  dom?: HTMLElementTagNameMap[T];
  children?: children;
  constructor(name: T, children?: children) {
    type t = ReturnType<typeof document.createElement>;
    this.name = name;
    this.children = children;
  }
  style(s: typeof this._style) {
    if (this._style) Object.assign(this._style, s);
    else this._style = s;
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
  render(r: root<any>, _el = document.createElement<T>(this.name)): Element {
    const el = _el;
    this.dom = el;
    if (this._events)
      for (const e in this._events) {
        const f = this._events[e as keyof typeof this._events];
        if (e === "unmount") r._addDestroyCallback(f);
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
          r._watch(compute(() => (t.nodeValue = n())));
          el.appendChild(t);
        } else if (n instanceof State || n instanceof Compute) {
          const t = document.createTextNode("");
          r._watch(compute(() => (t.nodeValue = n.v)));
          el.appendChild(t);
        } else {
          el.appendChild(n.render(r));
        }
      }
    this._ref?.(el);
    return el;
  }
}
const l = new Set<Signal<Any>>();
const f = new Set<() => void>();
let req = false;

function update() {
  f.forEach((n) => n());
  l.forEach((n) => n.v);
  l.clear();
  f.clear();
  req = false;
}
function willUpdate(n: Signal<Any> | (() => void)) {
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
  #stateList: Signal<Any>[] = [];
  _whenDestroy = [] as (() => void)[];
  constructor(parentDom: Element | undefined, n: ele<T>) {
    this.#watcher.callback = willUpdate;
    this.dom = n.render(this);
    parentDom?.appendChild(this.dom);
  }
  _watch(s: Signal<Any>) {
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
const tmp4: ChildNode[] = [];
/**
 * 列表中的元素不能重复!
 * 推荐对象作为列表元素（signal[], object[]）
 */
class ForEachNode<
  T,
  K extends keyof HTMLElementTagNameMap,
  L extends keyof HTMLElementTagNameMap
> extends ele<K> {
  list: Signal<T[] | array<T>>;
  f: (v: T) => ele<L>;
  constructor(name: K, list: Signal<T[] | array<T>>, f: (v: T) => ele<L>) {
    super(name);
    this.list = list;
    this.f = f;
  }
  #vIdx = new Map<T, number>();
  #roots = new Map<T, root<L>>();
  render(r: root<any>): Element {
    const el = super.render(r);
    const list = this.list,
      vi = this.#vIdx,
      mapFn = this.f,
      roots = this.#roots;
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
      tmp4.length = 0;
      const oldDomList = tmp4;
      el.childNodes.forEach((v) => oldDomList.push(v));
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
          roots.set(v, n);
          if (i == l.length - 1) el.appendChild(n.dom);
          else el.insertBefore(n.dom, oldDomList[next]);
        } else if (old == next) j++;
        else el.insertBefore(oldDomList[old], oldDomList[next]);
        vi.set(v, i);
      });
      tmp1.length = 0;
      tmp2.length = 0;
      tmp3.length = 0;
      tmp4.length = 0;
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
class node<T extends keyof HTMLElementTagNameMap> extends ele<"div"> {
  _node;
  _ele?: ele<T>;
  _root?: root<T>;
  _watcher?: Watcher;
  dynDom?: HTMLElementTagNameMap[T];
  dom = void 0;
  constructor(render: Signal<ele<T>>) {
    super("div");
    this._node = render;
  }
  render(r: root<any>) {
    const render = this._node;
    this._ele = render.v;
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
    this._watcher.watch(render);
    update();
    r._addDestroyCallback(() => {
      this._root?._destroy();
      (this._watcher as Watcher).unwatch();
    });
    return this.dynDom as Element;
  }
}
type children = (ele<any> | string | Signal<string> | (() => string))[];
export function h(name: keyof HTMLElementTagNameMap, ...children: children) {
  return new ele(name, children);
}
export function ForEach<
  T,
  K extends keyof HTMLElementTagNameMap,
  L extends keyof HTMLElementTagNameMap
>(name: K, list: Signal<T[] | array<T>>, f: (v: T) => ele<L>) {
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
  f: (i: State<number>, v: T) => ele<L>
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
document.createElement("br");
export type ForEach<
  T,
  K extends keyof HTMLElementTagNameMap,
  L extends keyof HTMLElementTagNameMap
> = ForEachNode<T, K, L>;
// ！不要缓存并使用旧节点，当节点被移除时，会执行 destroy 回收节点！
export function dynNode<T extends keyof HTMLElementTagNameMap>(
  ele: Signal<ele<T>> | (() => ele<T>)
) {
  if (typeof ele == "function") return new node(compute(ele));
  return new node(ele);
}
export type Ele<T extends keyof HTMLElementTagNameMap> = ele<T>;

// html5 elements

export function address(...children: children) {
  return new ele("address", children);
}
export function article(...children: children) {
  return new ele("article", children);
}
export function aside(...children: children) {
  return new ele("aside", children);
}
export function footer(...children: children) {
  return new ele("footer", children);
}
export function header(...children: children) {
  return new ele("header", children);
}
export function h1(...children: children) {
  return new ele("h1", children);
}
export function h2(...children: children) {
  return new ele("h2", children);
}
export function h3(...children: children) {
  return new ele("h3", children);
}
export function h4(...children: children) {
  return new ele("h4", children);
}
export function h5(...children: children) {
  return new ele("h5", children);
}
export function h6(...children: children) {
  return new ele("h6", children);
}
export function main(...children: children) {
  return new ele("main", children);
}
export function nav(...children: children) {
  return new ele("nav", children);
}
export function section(...children: children) {
  return new ele("section", children);
}
export function blockquote(...children: children) {
  return new ele("blockquote", children);
}
export function dd(...children: children) {
  return new ele("dd", children);
}
export function div(...children: children) {
  return new ele("div", children);
}
export function dl(...children: children) {
  return new ele("dl", children);
}
export function dt(...children: children) {
  return new ele("dt", children);
}
export function figcaption(...children: children) {
  return new ele("figcaption", children);
}
export function figure(...children: children) {
  return new ele("figure", children);
}
export function hr(...children: children) {
  return new ele("hr", children);
}
export function li(...children: children) {
  return new ele("li", children);
}
export function menu(...children: children) {
  return new ele("menu", children);
}
export function ol(...children: children) {
  return new ele("ol", children);
}
export function p(...children: children) {
  return new ele("p", children);
}
export function pre(...children: children) {
  return new ele("pre", children);
}
export function ul(...children: children) {
  return new ele("ul", children);
}
export function a(...children: children) {
  return new ele("a", children);
}
export function abbr(...children: children) {
  return new ele("abbr", children);
}
export function b(...children: children) {
  return new ele("b", children);
}
export function bdi(...children: children) {
  return new ele("bdi", children);
}
export function bdo(...children: children) {
  return new ele("bdo", children);
}
export function br(...children: children) {
  return new ele("br", children);
}
export function cite(...children: children) {
  return new ele("cite", children);
}
export function code(...children: children) {
  return new ele("code", children);
}
export function data(...children: children) {
  return new ele("data", children);
}
export function dfn(...children: children) {
  return new ele("dfn", children);
}
export function em(...children: children) {
  return new ele("em", children);
}
export function i(...children: children) {
  return new ele("i", children);
}
export function kbd(...children: children) {
  return new ele("kbd", children);
}
export function mark(...children: children) {
  return new ele("mark", children);
}
export function q(...children: children) {
  return new ele("q", children);
}
export function rp(...children: children) {
  return new ele("rp", children);
}
export function rt(...children: children) {
  return new ele("rt", children);
}
export function ruby(...children: children) {
  return new ele("ruby", children);
}
export function s(...children: children) {
  return new ele("s", children);
}
export function samp(...children: children) {
  return new ele("samp", children);
}
export function small(...children: children) {
  return new ele("small", children);
}
export function span(...children: children) {
  return new ele("span", children);
}
export function strong(...children: children) {
  return new ele("strong", children);
}
export function sub(...children: children) {
  return new ele("sub", children);
}
export function sup(...children: children) {
  return new ele("sup", children);
}
export function time(...children: children) {
  return new ele("time", children);
}
export function u(...children: children) {
  return new ele("u", children);
}
export function Var(...children: children) {
  return new ele("var", children);
}
export function wbr(...children: children) {
  return new ele("wbr", children);
}
export function area(...children: children) {
  return new ele("area", children);
}
export function audio(...children: children) {
  return new ele("audio", children);
}
export function img(...children: children) {
  return new ele("img", children);
}
export function map(...children: children) {
  return new ele("map", children);
}
export function track(...children: children) {
  return new ele("track", children);
}
export function video(...children: children) {
  return new ele("video", children);
}
export function embed(...children: children) {
  return new ele("embed", children);
}
export function iframe(...children: children) {
  return new ele("iframe", children);
}
export function object(...children: children) {
  return new ele("object", children);
}
export function picture(...children: children) {
  return new ele("picture", children);
}
s;
export function source(...children: children) {
  return new ele("source", children);
}
export function canvas(...children: children) {
  return new ele("canvas", children);
}
export function ins(...children: children) {
  return new ele("ins", children);
}
export function del(...children: children) {
  return new ele("del", children);
}
export function caption(...children: children) {
  return new ele("caption", children);
}
export function col(...children: children) {
  return new ele("col", children);
}
export function colgroup(...children: children) {
  return new ele("colgroup", children);
}
export function table(...children: children) {
  return new ele("table", children);
}
export function tbody(...children: children) {
  return new ele("tbody", children);
}
export function td(...children: children) {
  return new ele("td", children);
}
export function tfoot(...children: children) {
  return new ele("tfoot", children);
}
export function th(...children: children) {
  return new ele("th", children);
}
export function thead(...children: children) {
  return new ele("thead", children);
}
export function tr(...children: children) {
  return new ele("tr", children);
}
export function button(...children: children) {
  return new ele("button", children);
}
export function datalist(...children: children) {
  return new ele("datalist", children);
}
export function fieldset(...children: children) {
  return new ele("fieldset", children);
}
export function form(...children: children) {
  return new ele("form", children);
}
export function input(...children: children) {
  return new ele("input", children);
}
export function label(...children: children) {
  return new ele("label", children);
}
export function legend(...children: children) {
  return new ele("legend", children);
}
export function meter(...children: children) {
  return new ele("meter", children);
}
export function optgroup(...children: children) {
  return new ele("optgroup", children);
}
export function option(...children: children) {
  return new ele("option", children);
}
export function output(...children: children) {
  return new ele("output", children);
}
export function progress(...children: children) {
  return new ele("progress", children);
}
export function select(...children: children) {
  return new ele("select", children);
}
export function textarea(...children: children) {
  return new ele("textarea", children);
}
export function details(...children: children) {
  return new ele("details", children);
}
export function dialog(...children: children) {
  return new ele("dialog", children);
}
export function summary(...children: children) {
  return new ele("summary", children);
}
export function slot(...children: children) {
  return new ele("slot", children);
}
export function template(...children: children) {
  return new ele("template", children);
}
