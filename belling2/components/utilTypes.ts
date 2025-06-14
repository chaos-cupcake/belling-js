import { text } from "./elements";
import { forEach } from "./forEach";
import { baseNode } from "./view";

export type Style = {
  [K in Exclude<
    keyof CSSStyleDeclaration, "setProperty" |
    "removeProperty" |
    "item" |
    "getPropertyValue" |
    "getPropertyPriority" |
    typeof Symbol.iterator |
    "length" |
    "parentRule"
  >]?: CSSStyleDeclaration[K];
};
/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Techniques)
 */
export type ariaRole =
  | "button"
  | "checkbox"
  | "gridcell"
  | "link"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "option"
  | "progressbar"
  | "radio"
  | "scrollbar"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "switch"
  | "tab"
  | "tabpanel"
  | "textbox"
  | "treeitem"
  | "combobox"
  | "grid"
  | "row"
  | "gridcell"
  | "rowheader"
  | "columnheader"
  | "listbox"
  | "option"
  | "menu"
  | "menubar"
  | "radiogroup"
  | "radio"
  | "tablist"
  | "tab"
  | "tabpanel"
  | "tree"
  | "treegrid"
  | "application"
  | "article"
  | "cell"
  | "columnheader"
  | "definition"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "group"
  | "heading"
  | "img"
  | "list"
  | "listitem"
  | "math"
  | "none"
  | "note"
  | "presentation"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "separator"
  | "table"
  | "term"
  | "toolbar"
  | "tooltip"
  | "banner"
  | "complementary"
  | "contentinfo"
  | "form"
  | "main"
  | "navigation"
  | "region"
  | "search"
  | "alert"
  | "log"
  | "marquee"
  | "status"
  | "timer"
  | "alertdialog"
  | "dialog";
export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<U>() => U extends Y ? 1 : 2)
  ? true
  : false;
export type StrictExclude<T, U> = Equals<T, U> extends true
  ? never
  : T;