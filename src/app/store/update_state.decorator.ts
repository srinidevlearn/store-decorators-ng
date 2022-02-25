import { STORE } from './store.core';
import { ISetState, updateStore } from './utility';
/**
 * @param  interface ISetState See {@link ISetState}
 *
 * use to update the store by class props
 * 
 * */
export function setStateByProp(params: ISetState) {
  let store = STORE.getInstance();
  return (target: {}, key: PropertyKey): any => {
    const descriptor = {
      set: (setterValue: any) =>
        updateStore({ store, setterValue, params }),
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(target, key, descriptor);
  };
}
