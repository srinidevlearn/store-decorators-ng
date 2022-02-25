import { STORE } from "./store.core";
/**
 * This decorator is used to inherit the store
 * @Store()
 */
export function Store() {
    return function (constructor: Function) {
      constructor.prototype.datasource = STORE.getInstance().dataSource;
      constructor.prototype.state$ = STORE.getInstance().state$;
    };
  }
  