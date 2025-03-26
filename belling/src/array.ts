const { max, min } = Math;

function at(i: number, len: number) {
  return min(i < 0 ? max(0, len + i) : i, len - 1);
}
function subarray<T>(A: arr<T>, i: number, len: number): arr<T> {
  if (A.length == 0) return A;
  if (i == 0 && len == A.length) return A;
  if (A.data) {
    const a = new arr<T>();
    a.off = i + A.off;
    a.length = len;
    a.data = A.data;
    Object.freeze(a);
    return a;
  } else {
    const { left, right } = A;
    if (!(left instanceof arr && right instanceof arr)) throw new TypeError();
    if (i > left.length) return subarray(right, i - left.length, len);
    if (i + len < left.length) return subarray(left, i, len);
    const n = new arr<T>();
    const l1 = left.length - i;
    n.left = subarray(left, i, l1);
    n.right = subarray(right, 0, len - l1);
    n.length = len;
    return n;
  }
}
function concat<T>(l: arr<T>, r: arr<T>) {
  const n = new arr<T>();
  n.left = l;
  n.right = r;
  n.length = r.length + l.length;
  return n;
}
export function makeArr<T>(...v: T[]) {
  const n = new arr<T>();
  n.data = v;
  n.length = v.length;
  return n;
}
class arr<T> {
  left?: arr<T>;
  right?: arr<T>;
  data?: T[];
  length = 0;
  off = 0;
  subarray(i: number, len: number) {
    i = at(i, this.length);
    len = min(this.length - i, len);
    return subarray(this, i, len);
  }
  unshift(...item: T[]) {
    if (item.length <= 0) return this;
    return makeArr(...item).concat(this);
  }
  push(...item: T[]) {
    if (item.length <= 0) return this;
    return this.concat(makeArr(...item));
  }
  concat(n: arr<T>) {
    return concat(this, n);
  }
  insert(i: number, ...item: T[]): arr<T> {
    i = at(i, this.length);
    if (i == 0) return this.unshift(...item);
    if (i == this.length) return this.push(...item);
    return subarray(this, 0, i).concat(
      subarray(this, i, this.length - i).unshift(...item)
    );
  }
  delete(i: number, len: number): arr<T> {
    i = at(i, this.length);
    const end = i + len;
    const s = i == 0,
      e = end >= this.length;
    if (s && e) return nil as arr<T>;
    if (s) return subarray(this, end, this.length - end);
    if (e) return subarray(this, 0, i);
    return subarray(this, 0, i).concat(subarray(this, end, this.length - end));
  }
  splice(i: number, delLen: number, ...item: T[]): arr<T> {
    i = at(i, this.length);
    const end = i + delLen;
    const s = i == 0,
      e = end >= this.length;
    if (s && e) return nil as arr<T>;
    if (s) return subarray(this, end, this.length - end).unshift(...item);
    if (e) return subarray(this, 0, i).push(...item);
    return subarray(this, 0, i)
      .push(...item)
      .concat(subarray(this, end, this.length - end));
  }
  set(i: number, v: T) {
    return this.splice(i, 1, v);
  }
  at(i: number) {
    let p = this as arr<T>;
    if (i < 0) {
      i += p.length;
      if (i < 0) return;
    } else {
      if (i >= p.length) return;
    }
    while (p.left instanceof arr) {
      const { left, right } = p;
      if (left.length > i) p = left as arr<T>;
      else {
        p = right as arr<T>;
        i -= left.length;
      }
    }
    if (!p.data) throw new Error();
    return p.data[i + p.off];
  }
  forEach(fn: (v: T, i: number) => void) {
    let j = 0;
    function f(p: arr<T>) {
      if (p.data) {
        for (let i = p.off, e = i + p.length; i < e; i++) {
          fn(p.data[i], j++);
        }
      } else {
        if (!(p.left instanceof arr && p.right instanceof arr))
          throw new TypeError();
        f(p.left);
        f(p.right);
      }
    }
    f(this);
  }
  // 判断每个元素是否满足要求，如果有一个不满足则停止遍历返回false
  every(fn: (v: T, i: number) => boolean) {
    let j = 0;
    let stop = false;
    function f(p: arr<T>) {
      if (p.data) {
        for (let i = p.off, e = i + p.length; i < e; i++) {
          if (fn(p.data[i], j++) == false) {
            stop = true;
            return;
          }
        }
      } else {
        if (!(p.left instanceof arr && p.right instanceof arr))
          throw new TypeError();
        f(p.left);
        if (!stop) f(p.right);
      }
    }
    f(this);
    return !stop;
  }
  forEachInRange(
    start: number,
    len: number,
    fn: (v: T, i: number) => void | symbol
  ) {
    start = at(start, this.length);
    len = min(this.length - start, len);
    let j = start;
    let stop = false;
    function f(p: arr<T>, s: number, e: number) {
      if (s == e) return;
      if (p.data) {
        let i = p.off;
        const E = i + e;
        i += s;
        for (; i < E; i++)
          if (fn(p.data[i], j++) == Stop) {
            stop = true;
            return;
          }
      } else {
        if (!(p.left instanceof arr && p.right instanceof arr))
          throw new TypeError();
        const l = p.left,
          r = p.right,
          len = l.length;
        if (s >= len) f(r, s - len, e - len);
        else if (e <= len) f(l, s, e);
        else {
          f(l, s, len);
          if (!stop) f(r, 0, e - len);
        }
      }
    }
    f(this, start, start + len);
  }
  forEachInRangeReversed(
    end: number,
    len: number,
    fn: (v: T, i: number) => void | symbol
  ) {
    end = at(end, this.length) + 1;
    const start = max(end - len, 0);
    let j = end;
    let stop = false;
    function f(p: arr<T>, s: number, e: number) {
      if (s == e) return;
      if (p.data) {
        s += p.off;
        e += p.off - 1;
        for (; e >= s; e--)
          if (fn(p.data[e], j--) == Stop) {
            stop = true;
            return;
          }
      } else {
        if (!(p.left instanceof arr && p.right instanceof arr))
          throw new TypeError();
        const l = p.left,
          r = p.right,
          len = l.length;
        if (s >= len) f(r, s - len, e - len);
        else if (e <= len) f(l, s, e);
        else {
          f(r, 0, e - len);
          if (!stop) f(l, s, len);
        }
      }
    }
    f(this, start, end);
  }
  map<R>(fn: (v: T, i: number) => R): arr<R> {
    const r: R[] = [];
    r.length = this.length;
    let j = 0;
    function f(p: arr<T>) {
      if (p.data) {
        for (let i = p.off, e = i + p.length; i < e; i++)
          r[j++] = fn(p.data[i], i);
      } else {
        if (!(p.left instanceof arr && p.right instanceof arr))
          throw new TypeError();
        f(p.left);
        f(p.right);
      }
    }
    f(this);
    return makeArr(...r);
  }
  flat(): arr<T> {
    const r: T[] = [];
    r.length = this.length;
    let j = 0;
    function f(p: arr<T>) {
      if (p.data) {
        for (let i = p.off, e = i + p.length; i < e; i++) r[j++] = p.data[i];
      } else {
        if (!(p.left instanceof arr && p.right instanceof arr))
          throw new TypeError();
        f(p.left);
        f(p.right);
      }
    }
    f(this);
    return makeArr(...r);
  }
  sort(fn: ((a: T, b: T) => number) | undefined) {
    const r = this.flat();
    (r.data as T[]).sort(fn);
    return r;
  }
}
const nil = makeArr<any>();
export type array<T> = arr<T>;
export const Stop = Symbol("Stop");
