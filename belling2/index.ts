if (typeof Promise.withResolvers !== "function") {
  Promise.withResolvers = function <T>(): PromiseWithResolvers<T> {
    let resolve, reject;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    // @ts-ignore
    return { promise, resolve, reject };
  };
}

class S<T> {
  #resolve?: (v: T) => void;
  #currentPromise?: Promise<T>;

  async *updates() {
    while (true) {
      let promise = this.#currentPromise;
      if (!promise) {
        let { promise, resolve } = Promise.withResolvers<T>();
        this.#resolve = resolve;
        this.#currentPromise = promise;
        yield await promise;
      } else {
        yield await promise;
      }
    }
  }

  update(v: T) {
    this.#resolve?.(v);
    this.#currentPromise = void 0;
  }
}

export function state<T>() {
  return new S<T>();
}
export type { S };
export * from "./components/view";
export * from "./components/forEach";
export * from "./components/elements";