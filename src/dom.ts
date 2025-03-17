import {
  compute,
  State,
  Compute,
  Watcher,
  Any,
  watcher,
  Signal,
  state,
} from "./index";
import { array } from "./array";

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
class ele {
  name: string;
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
  dom?: Element;
  children?: (ele | string | Signal<string> | (() => string))[];
  constructor(name: string, children?: ele["children"]) {
    this.name = name;
    this.children = children;
  }
  style(s: (typeof this)["_style"]) {
    this._style = s;
    return this;
  }
  attr(attr: (typeof this)["_attr"]) {
    this._attr = attr;
    return this;
  }
  on(on: typeof this._events) {
    this._events = on;
    return this;
  }
  ref(callback: (dom: Element) => void) {
    this._ref = callback;
    return this;
  }
  render(r: root): Element {
    const el = document.createElement(this.name);
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
  l.forEach((n) => n.v);
  f.forEach((n) => n());
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
export class root {
  dom: Element;
  #watcher = new Watcher();
  #stateList: Signal<Any>[] = [];
  _whenDestroy = [] as (() => void)[];
  constructor(parentDom: Element | undefined, n: ele) {
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
    this.#stateList.forEach((s) => this.#watcher.unwatch(s));
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
class ForEachNode<T> extends ele {
  list: Signal<T[] | array<T>>;
  f: (v: T) => ele;
  constructor(name: string, list: Signal<T[] | array<T>>, f: (v: T) => ele) {
    super(name);
    this.list = list;
    this.f = f;
  }
  #vIdx = new Map<T, number>();
  #roots = new Map<T, root>();
  render(r: root): Element {
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
          (roots.get(v) as root)._destroy();
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
      w.unwatch(list);
      this.#roots.forEach((r) => r._destroy());
    });
    return el;
  }
}
class node extends ele {
  _node;
  _ele: ele;
  _root?: root;
  _watcher;
  constructor(render: Signal<ele>) {
    super("");
    this._node = render;
    this._ele = render.v;
    const update = () => {
      const e = render.v;
      this._ele = e;
      this.name = e.name;
      this._events = e._events;
      this._attr = e._attr;
      this._style = e._style;
      this._ref = e._ref;
      this.children = e.children;
      this._root?._destroy();
      this._root = new root(void 0, e);
      if (this.dom) {
        const p = this.dom.parentNode;
        if (p) {
          p.replaceChild(this._root.dom, this.dom);
        }
      }
      this.dom = e.dom;
    };
    this._watcher = watcher(update);
    this._watcher.watch(render);
    update();
  }
  render(r: root) {
    r._addDestroyCallback(() => {
      this._root?._destroy();
      this._watcher.unwatch(this._node);
    });
    return this.dom as Element;
  }
}
export function h(
  name: string,
  ...children: (ele | string | Signal<string> | (() => string))[]
) {
  return new ele(name, children);
}
export function ForEach<T extends object>(
  name: string,
  list: Signal<T[] | array<T>>,
  f: (v: T) => ele
) {
  const e = new ForEachNode<T>(name, list, f);
  return e;
}
export function ForIn<T extends object>(
  name: string,
  list: Signal<T[] | array<T>>,
  f: (i: State<number>, v: T) => ele
) {
  let si = new WeakMap<T, State<number>>();
  const e = new ForEachNode<T>(
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
export type ForEach<T> = ForEachNode<T>;
// ！不要缓存并使用旧节点，当节点被移除时，会执行 destroy 回收节点！
export function dynNode(ele: Signal<ele> | (() => ele)) {
  if (typeof ele == "function") return new node(compute(ele));
  return new node(ele);
}
export type Ele = ele;
