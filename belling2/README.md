# belling

Compatibility requires that the browser support `promise`, `async`, `for await of`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) This feature is well established and works across many devices and browser versions. It’s been available across browsers since January 2020.

```typescript
import { forEach, state, View } from "belling";

const l = state<string[]>();

let button = View("+").role("button");
document.body.appendChild(View(
  forEach(l, (item) => View(item)),
  button
).dom);

let list = ["0", "1", "2", "3", "4", "5"];

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function a() {
  for await (const _event of button.onClick()) {
    l.update(shuffleArray(list));
  }
}
a();
```
