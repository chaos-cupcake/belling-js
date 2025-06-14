import { S } from "../index";
import { Style } from "./utilTypes";
import { baseView } from "./view";
export declare class text {
    dom: HTMLSpanElement;
    style: CSSStyleDeclaration;
    constructor(str: string | S<string>);
    addStyle(style?: Style): this;
    bold(): this;
    italic(): void;
}
export declare class input extends baseView<HTMLInputElement> {
    constructor();
    onInput(): AsyncGenerator<Event, void, unknown>;
    values(): AsyncGenerator<string, void, unknown>;
}
export declare function Text(str: string | S<string>): text;
export declare function Input(): input;
