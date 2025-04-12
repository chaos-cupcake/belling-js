import { array, makeArr, Stop } from "./array";
export { makeArr, Stop };
export type { array };

let caller: Compute<any> | undefined;
function markAsDirty(n: signal) {
  const l = n._Consumer;
  for (const c of l) {
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
type C = (Compute<any> | untrackCompute<any>)[];
export class State<T> {
  _Consumer: C = [];
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

function update(c: Compute<any>) {
  if (!(c instanceof Compute) || !c._Dirty) return;
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

export class Compute<T> {
  _Consumer: C = [];
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
export class untrackCompute<T> {
  _Consumer: C = [];
  _Producer: signal[];
  _Watchers?: Watcher | Watcher[];
  _Func: () => T;
  _Dirty = true;
  constructor(func: () => T, producer: signal[]) {
    this._Func = func;
    this._Producer = producer;
  }
  _v?: T;
  _Err?: Error;
  _tracking = false;
  get v() {
    if (caller instanceof Compute) caller._GetCallback(this);
    if (this._Dirty) {
      try {
        this._v = this._Func();
        this._Err = void 0;
      } catch (e) {
        this._Err = e as Error;
      }
      this._Dirty = false;
    }
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
export type Signal<T> = State<T> | Compute<T> | untrackCompute<T>;
type signal = Signal<any>;
function connect(c: untrackCompute<any>) {
  if (c._tracking) return;
  c._tracking = true;
  for (const n of c._Producer) n._Consumer.push(c);
}
function disconnect(n: signal) {
  if (!(n instanceof Compute || n instanceof untrackCompute)) return;
  const l = n._Producer;
  for (const p of l) {
    let i = p._Consumer.indexOf(n);
    p._Consumer.splice(i, 1);
    if (!p._Watchers && p._Consumer.length == 0) disconnect(p);
  }
  n._Dirty = true;
  if (n instanceof Compute) {
    l.length = 0;
  } else if (n instanceof untrackCompute) {
    n._tracking = false;
  }
}
export class Watcher {
  _Func?: (n: signal) => void;
  watchList = new Set<signal>();
  watch(...s: signal[]) {
    for (const n of s) {
      const w = n._Watchers;
      if (!w) {
        n._Watchers = this;
      } else if (w instanceof Array) {
        if (w.indexOf(this) > -1) continue;
        w.push(this);
      } else if (w != this) {
        n._Watchers = [this, w];
      }
      if (n instanceof Compute) update(n);
      if (n instanceof untrackCompute) {
        connect(n);
        n.v;
      }
      this.watchList.add(n);
    }
  }
  /**
    If no arguments are passed, it will stop watching all states.
   */
  unwatch(...s: signal[]) {
    for (const n of s.length > 0 ? s : this.watchList.values()) {
      const w = n._Watchers;
      if (!w) continue;
      this.watchList.delete(n);
      if (w instanceof Array) {
        const i = w.indexOf(this);
        if (i > -1) w.splice(i, 1);
        if (w.length > 0) continue;
      } else {
        n._Watchers = void 0;
      }
      disconnect(n);
    }
  }
  set callback(v) {
    this._Func = typeof v == "function" ? v : void 0;
  }
  get callback() {
    return this._Func;
  }
}
export function state<T>(v: T) {
  const s = new State<T>(v);
  return s;
}
export function compute<T>(f: () => T, ...dependencies: C) {
  if (dependencies.length > 0) return new untrackCompute(f, dependencies);
  else return new Compute<T>(f);
}
export function watcher(callback: ((n: signal) => void) | undefined) {
  const w = new Watcher();
  w.callback = callback;
  return w;
}
