import { array, makeArr, Stop } from "./array";
import { root, h, ForEach, ForIn, dynNode, Ele } from "./dom";
export { root, h, ForEach, ForIn, dynNode, makeArr, Stop };
export type { array, Ele };

let caller: Compute<Any> | undefined;
function markAsDirty(n: signal) {
  const l = n._Consumer;
  for (const c of l) {
    if (typeof c == "number") continue;
    if (c == caller) throw new Error();
    if (c._Dirty) continue;
    c._Dirty = true;
    markAsDirty(c);
  }
  const w = n._Watchers;
  if (w)
    if (w instanceof Array) w.forEach((w) => w._Func?.(n));
    else w._Func?.(n);
}
export class State<T extends Any> {
  _Consumer: Compute<Any>[] = [];
  _Watchers?: Watcher | Watcher[];
  constructor(v: T) {
    this.#v = v;
    this.v = v;
  }
  #v: T;
  get v() {
    if (caller) caller._GetCallback(this);
    return this.#v;
  }
  set v(v) {
    if (this.#v == v) return;
    this.#v = v;
    try {
      markAsDirty(this);
    } catch {
      throw new Error("Detected cycle in computations.");
    }
  }
}
// const alreadyConnect = 1,
// visited = 2;
function update(c: Compute<Any>) {
  if (!(c instanceof Compute) || !c._Dirty) return;
  const l = c._Producer;
  l.length = 0;
  const pre = caller;
  caller = c;
  try {
    c._v = c._Func();
    c._Err = void 0;
  } catch (e) {
    c._Err = e as Error;
  }
  c._Dirty = false;
  /* recover */
  caller = pre;
}

type BasicType = number | string | boolean;
export type Any =
  | BasicType
  | object
  | undefined
  | void
  | null
  | BasicType[]
  | array<BasicType>;
export class Compute<T extends Any> {
  _Consumer: Compute<Any>[] = [];
  _Watchers?: Watcher | Watcher[];
  _Func: () => T;
  _Dirty = true;
  constructor(func: () => T) {
    this._Func = func;
  }
  _v?: T;
  _Err?: Error;
  _Producer: signal[] = [];
  _GetCallback(producer: signal) {
    let c = producer._Consumer;
    if (c.indexOf(this) < 0) {
      c.push(this);
      this._Producer.push(producer);
    }
  }
  get v() {
    if (caller) caller._GetCallback(this);
    update(this);
    if (this._Err) throw this._Err;
    return this._v as T;
  }
  get error() {
    return this._Err;
  }
  get computation() {
    return this._Func;
  }
}
export type Signal<T extends Any> = State<T> | Compute<T>;
type signal = State<Any> | Compute<Any>;
function disconnect(n: signal) {
  if (!(n instanceof Compute)) return;
  const l = n._Producer;
  for (const p of l) {
    let i = p._Consumer.indexOf(n);
    p._Consumer.splice(i, 1);
    if (n instanceof Compute && !p._Watchers && p._Consumer.length == 0)
      disconnect(p);
  }
  l.length = 0;
}
export class Watcher {
  _Func?: (n: signal) => void;
  watch(n: signal) {
    const w = n._Watchers;
    if (!w) n._Watchers = this;
    else if (w instanceof Array) {
      if (w.indexOf(this) > -1) return;
      w.push(this);
    } else if (w != this) n._Watchers = [this, w];
    if (n instanceof Compute) update(n);
  }
  unwatch(n: signal) {
    const w = n._Watchers;
    if (!w) return;
    if (w instanceof Array) {
      const i = w.indexOf(this);
      if (i > -1) w.splice(i, 1);
      if (w.length > 0) return;
    } else {
      n._Watchers = void 0;
    }
    disconnect(n);
  }
  set callback(v) {
    this._Func = typeof v == "function" ? v : void 0;
  }
  get callback() {
    return this._Func;
  }
}
// state can only be watched by one watcher
export function state<T extends Any>(v: T) {
  const s = new State<T>(v);
  return s;
}
export function compute<T extends Any>(f: () => T) {
  return new Compute<T>(f);
}
export function watcher(callback: ((n: signal) => void) | undefined) {
  const w = new Watcher();
  w.callback = callback;
  return w;
}
