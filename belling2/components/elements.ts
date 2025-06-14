import { S } from "../index";
import { Style } from "./utilTypes";
import { baseView } from "./view";

async function updateText(dom: HTMLSpanElement, s: S<string>) {
  for await (const str of s.updates()) {
    dom.textContent = str;
  }
}
export class text {
  dom = document.createElement('span');
  style = this.dom.style;
  constructor(str: string | S<string>) {
    if (typeof str == "string")
      this.dom.textContent = str;
    else
      updateText(this.dom, str);
  }
  addStyle(style: Style = {}): this {
    Object.assign(this.dom.style, style);
    return this;
  }
  bold() {
    this.style.fontWeight = "bold";
    return this;
  }
  italic() {
    this.style.fontStyle = "italic";
  }
}

export class input extends baseView<HTMLInputElement> {
  constructor() {
    super(document.createElement('input'));
  }
  onInput() {
    return this.on('input');
  }
  async *values() {
    for await (const _ of this.onInput()) {
      yield this.dom.value;
    }
  };
}

export function Text(str: string | S<string>) {
  return new text(str);
}
export function Input() {
  return new input();
}