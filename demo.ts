import { compute, state, watcher } from "./belling/src";
const a = state(0);
const b = compute(() => {
  a.v++;
});

watcher((b) => {
  b.v; // err: detect cycle
}).watch(b);
a.v = 10;
