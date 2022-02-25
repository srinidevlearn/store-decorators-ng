import { Action } from './redux.extension';
import { STORE } from './store.core';
import { ISetState, updateStore } from './utility';
/**
 * @param  interface ISetState See {@link ISetState}
 * This is useful when you want to update the state based on
 *
 * Either : method response
 *
 * Or : by using method params
 *
 * If you want to use method response then need to pass useMethodResponse as true
 */
export function setStateByMethod(params: ISetState) {
  let store = STORE.getInstance();
  let {useMethodResponse} = params;
  let updateConfig:any = {store,params};

  return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
    /**
     * use to take a copy of original method for safe purpose
     */
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      updateConfig['setterValue'] = useMethodResponse ? original(args[0]) : args[0]
      updateStore(updateConfig);
    };
    return descriptor;
  };
}
