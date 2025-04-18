# belling.js

```typescript
import { div, span, root } from "belling-dom";
// Create DOM
div(
  span("width:"), 
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
}).ref((dom)=>{
  // get dom node
});
// Render
new root(document.getElementById("App"), div());
```

## Lists

```typescript
const l = state(makeArr(0, 1, 2));
ForEach("div", l, (v) => div(v.toString()));
ForIn("div", l, (i, v) => div(() => i.v + ":", v.toString()));
```

- Performs diff updates when `l` changes, adding new elements and removing old ones.
- When there are duplicate items in a list, the components rendered for those identical items cannot be reused during diff updates due to the inability to determine a stable mapping relationship.

## Ele

## Dynamic Nodes

```typescript
const show = state(true as boolean);
dynNode(() => {
  if (show.v) return input();
  else return div();
});
```

Achieves functionality similar to Vue's `v-if` and supports complex logic.

## 中文版

```typescript
import { div, span，root } from "belling-dom"

// 创建dom
div(span("width:"), b, () => a.v + "px")
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
new root(document.getElementById("App"), div());
```

### 列表

```typescript
const l = state(makeArr(0, 1, 2))
ForEach("div", l, (v) => div(, v.toString()));
ForIn("div", l, (i, v) => div(() => i.v + ":", v.toString()));
```

当'l'改变时列表会进行diff更新，diff更新会添加新增内容，销毁被移除的内容。

当列表中存在相同项时，由于无法确定映射关系，相同项所渲染的组件在diff更新中无法复用。

### 动态节点

```typescript
const show = state(true as boolean);
dynNode(() => {
  if (show.v) return input();
  else return div();
});
```

可以实现vue中v-if的功能，也可以实现其他更复杂功能。
