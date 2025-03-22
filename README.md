# belling js

Efficient, Concise, and Out-of-the-Box Frontend Framework

The size of `index.js` is only 9.6 KB.

Near-native performance with built-in immutable data structures.

demo: [tic-tac-toe](https://codesandbox.io/p/sandbox/cjp53l)

中文版在下方

## Signal  

```typescript
import { state, compute, watcher } from "belling";
const a = state(0 as number);
const b = compute(() => a.v + 'px');
const w = watcher((s) => {
  // The callback is automatically triggered when state.v or compute.v changes.
  // The compute function won't execute immediately during callback; it only executes and caches results when compute.v is accessed.
  s.v;
});
w.watch(b);
a.v = 2; // Update state and trigger the callback
```

- `compute(f)` requires `f` to be a pure function (mathematical function) where outputs depend solely on inputs. This reduces code errors.
- State updates use `if (v === v)` to check for value changes. For example, `state([]).v.push(0)` won't trigger updates because the array reference remains unchanged.
- Watchers trigger when dependencies update, regardless of actual value changes. Compare old/new values manually if needed.

## DOM  

```typescript
import { h, root } from "belling";
// Create DOM
h("div", 
  h("span", "width:"), 
  b, 
  () => a.v + "px"
)
/* Auto-update when b.v changes. Function children update when internal states change */
.on({
  unmount() {
    // Execute when element is destroyed
  },
  click() {
    a.v += 1;
  },
})
.attr({
  "data-a": () => a.v.toString(),
})
.style({
  paddingLeft: b,
});
// Render
new root(document.getElementById("App"), h("div"));
```

### Lists  

```typescript
const l = state(makeArr(0, 1, 2));
ForEach("div", l, (v) => h("div", v.toString()));
ForIn("div", l, (i, v) => h("div", () => i.v + ":", v.toString()));
```

- Performs diff updates when `l` changes, adding new elements and removing old ones.
- Since keys or UUIDs are not required, each item in the array must be unique to enable fine-grained updates.

### Dynamic Nodes  

```typescript
const show = state(true as boolean);
dynNode(() => {
  if (show.v) return h("input");
  else return h("div");
});
```

Achieves functionality similar to Vue's `v-if` and supports complex logic.

## Immutable Arrays  

```typescript
import { makeArr, Stop } from "belling";
// Create array
const l = makeArr(0, 1, 2);
// All operations return new arrays
const l2 = l.push(0);
l2.forEach(() => {
  // Stop iteration
  return Stop;
});
```

- Immutable arrays use tree structures:  
  - O(logN) for insertion/deletion/lookup.
  - O(N) for traversal.
- For large arrays, the library's immutable arrays outperform native JavaScript Arrays in modification performance.
- This implementation demonstrates significantly better performance than immer.js and immutable.js in most scenarios.

## JSX/TSX  

No compilation is required for basic usage. For JSX/TSX syntax, implement Babel plugins to compile projects.

---

demo: [tic-tac-toe](https://codesandbox.io/p/sandbox/cjp53l)

高效，简洁，开箱即用的前端框架。

index.js大小仅为9.6kb。

性能接近原生，内置不可变数据结构。

## 信号

```typescript
import { state, compute, watcher } from "belling";

const a = state(0 as number)
const b = compute(() => a.v + 'px')

const w = watcher((s) => {
 // 当state.v或compute.v改变时，会自动触发回调函数。
 // 触发回调时compute并不会真正执行，只有获取compute.v时才会真正执行且缓存结果。
 s.v;
})
w.watch(b)
a.v = 2; // 此时会触发回调函数。
```

compute(f)，f应为纯函数，即数学中的函数。函数输入的参数是其中的所有状态，确定的输入对应唯一的输出值。这可以降低代码出错的可能性。

请注意修改state后会通过if(v==v)判断内容是否更新。
例如 state([]).v.push(0) 不会触发更新。

由于watcher不会真正运行compute，它并不知道观察的状态是否真正更新（函数不同的输入，输出可以相同），当compute所依赖的状态更新时，便会触发回调。若您需要知道某个状态是否真正更新，您可以记录旧的值并与新的值进行比较，确认状态是否真正更新。

## dom

```typescript
import { h，root } from "belling"

// 创建dom
h("div", h("span", "width:"), b, () => a.v + "px")
 /* 当b.v改变，视图会自动更新。若子节点传入函数，当函数内的状态改变时，也会更新视图 */
 .on({
  unmount() {
   // 当元素被销毁时执行
  },
  click() {
   a.v += 1;
  },
 })
 .attr({
  "data-a": () => a.v.toString(),
 })
 .style({
  paddingLeft: b,
 });

// 渲染
new root(document.getElementById("App"), h("div"));
```

### 列表

```typescript
const l = state(makeArr(0, 1, 2))
ForEach("div", l, (v) => h("div", v.toString()));
ForIn("div", l, (i, v) => h("div", () => i.v + ":", v.toString()));
```

当'l'改变时列表会进行diff更新，diff更新会添加新增内容，销毁被移除的内容。

由于不需要提供key或uuid，数组中每一项都不能相同，以便进行细粒度更新。

### 动态节点

```typescript
const show = state(true as boolean);
dynNode(() => {
  if (show.v) return h("input");
  else return h("div");
});
```

可以实现vue中v-if的功能，也可以实现其他更复杂功能。

## 不可变数组

```typescript
import { makeArr, Stop } from "belling"

// 创建数组
const l = makeArr(0, 1, 2)
// 对数组的所有操作都会返回一个新数组
const l2 = l.push(0)

l2.forEach(() => {
  // 停止遍历
  return Stop
})
```

不可变数组使用树实现，插入删除和查询的时间复杂度为O(logN)，遍历时间复杂度为O(N)，当数组很大时，相比js原生Array，使用库中的不可变数组进行更改的性能更好。该实现在大多数场景性能明显优于immer.js与immutable.js。

## jsx、tsx

使用本库无需编译文件。但若要使用jsx或tsx的扩展语法，则需实现Babel等编译器的插件，编译项目。
