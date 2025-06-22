import { N, baseNode, S, scrollView, view, View, E, input } from "../index";

function find<T>(
  arr: readonly T[],
  target: T,
): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

async function listUpdate<T, U extends baseNode<any>>(list: S<T[]>, f: (item: T) => U, nodes: U[], whenRemove?: (item: T, node: U) => void, d?: Comment, parentEle?: HTMLElement) {
  let mapIdx = new Map<T, number>();
  for await (const l of list.updates()) {
    update(l, mapIdx, f, nodes, whenRemove, d, parentEle);
  }
}
function update<T, U extends baseNode<any>>(l: T[], mapIdx: Map<T, number>, f: (item: T) => U, nodes: U[], whenRemove?: (item: T, node: U) => void, d?: Comment, parentEle?: HTMLElement) {
  let start = l.length;
  for (let i = 0, len = l.length; i < len; i++)
    if (mapIdx.get(l[i]) != i) {
      start = i;
      break;
    }

  let end = l.length;
  for (let i = l.length, j = nodes.length; i--;)
    if (mapIdx.get(l[i]) != j-- || i < start) {
      end = i + 1;
      break;
    }

  let seq: number[] = [];
  let pos: number[] = [];
  for (let i = start; i < end; i++) {
    const v = mapIdx.get(l[i]);
    if (v == void 0) continue;
    if (v < 0) throw new Error('Duplicate elements');
    mapIdx.set(l[i], -v - 1);

    let n = find(seq, v);
    seq[n] = v;
    pos[i] = n;
  }
  for (let i = pos.length, len = seq.length - 1; i--;) {
    if (pos[i] == len) {
      const _v = mapIdx.get(l[i])!;
      const v = _v < 0 ? -_v - 1 : _v;
      seq[len] = v;
      len--;
    }
  }
  let parentDom = parentEle || d!.parentNode;
  if (!parentDom) {
    console.warn('no parent node');
    return;
  };
  for (const key of mapIdx.keys()) {
    const i = mapIdx.get(key)!;
    if (i >= start) {
      mapIdx.delete(key);
      const n = nodes[i];
      if (whenRemove) whenRemove(key, n);
      parentDom.removeChild(n.dom);
    }
  }
  let newNodes: U[] = [];
  let j = 0, nextI = seq.length > 0 ? seq[j] : end;
  let next = seq.length > 0 ? nodes[seq[j]].dom : d;
  for (let i = start; i < end; i++) {
    const old = mapIdx.get(l[i]);
    if (old == void 0) {
      const n = f(l[i]);
      newNodes[i - start] = n;
      if (!next) parentDom.appendChild(n.dom);
      else parentDom.insertBefore(n.dom, next);
    } else {
      const k = -old - 1;
      if (k == nextI) {
        j++;
        newNodes[i - start] = nodes[k];
        if (j < seq.length) {
          nextI = seq[j];
          next = nodes[seq[j]].dom;
        } else {
          nextI = end;
          next = d;
        }
      } else {
        const n = nodes[k];
        newNodes[i - start] = n;
        if (!next) parentDom.appendChild(n.dom);
        else parentDom.insertBefore(n.dom, next);
      }
    }
  }
  let len = l.length;
  for (let i = start; i < len; i++) {
    mapIdx.set(l[i], i);
  }
  nodes.splice(start, (l.length - end + nodes.length) - start, ...newNodes);

}

/**
 * List elements cannot be duplicated!
 */
export class forEach extends baseNode<Comment> {
  _scrollListener: N[];
  constructor(public nodes: N[] = []) {
    super(document.createComment(""));
    this._scrollListener = nodes;
  }
  _whenScroll(s: scrollView) {
    this._scrollListener.forEach(n => {
      if (n instanceof view || n instanceof scrollView || n instanceof forEach)
        n._whenScroll(s);
    });
  }
}
export function ForEach<T>(list: S<T[]>, f: (item: T) => E, whenRemove?: ((item: T, node: N) => void)) {
  let n = new forEach();
  listUpdate(list, f, n.nodes, whenRemove, n.dom);
  return n;
}
export class list extends view {
  constructor(public nodes: E[] = []) {
    super();
    this._scrollListener = nodes;
  }
}
export function List<T>(l: S<T[]>, f: (item: T) => E, nodes: E[] = [], whenRemove?: ((item: T, node: N) => void)) {
  let n = new list(nodes);
  listUpdate(l, f, nodes, whenRemove, void 0, n.dom);
  return n;
}
export class indexedList<T extends E> extends view {
  constructor(public nodes: T[] = []) {
    super();
    this._scrollListener = nodes;
  }
}
export class listItem extends view {
  index = 0;
}
async function u<T, U extends listItem>(list: S<T[]>, f: (item: T) => U, nodes: U[], whenRemove?: (item: T, node: U) => void, parentEle?: HTMLElement) {
  let mapIdx = new Map<T, number>();
  for await (const l of list.updates()) {
    update(l, mapIdx, f, nodes, whenRemove, void 0, parentEle);
    for (let i = 0; i < nodes.length; i++)
      nodes[i].index = i;
  }
}
export function IndexedList<T, K extends listItem>(l: S<T[]>, f: (item: T) => K, nodes: K[] = [], whenRemove?: ((item: T, node: K) => void)) {
  let n = new indexedList(nodes);
  u(l, f, nodes, whenRemove, n.dom);
  return n;
}