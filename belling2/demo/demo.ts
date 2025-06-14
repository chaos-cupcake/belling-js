import { ForEach, state, View } from "../index";
// esbuild ./demo.ts --bundle --outfile=./demo.js --minify --sourcemap --format=esm --watch
const l = state<string[]>();

let d = View("+").role("button");
document.body.appendChild(View(
  ForEach(l, (item) => {
    return View(item);
  }),
  d
).dom);
let todoList = ["0", "1", "2", "3", "4", "5"];
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    let j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function a() {
  for await (const _ of d.onClick()) {
    shuffleArray(todoList);
    todoList.pop();
    l.update(todoList);
  }
}
a();