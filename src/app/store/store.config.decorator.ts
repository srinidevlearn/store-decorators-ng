import { Action, reduxExtension } from './redux.extension';

/**
 * @param  Object - arg:{storeName:string} *
 * @default Object - arg:{storeName:"@@FeatureStore@@"} *
 * This decorator is used  to add first level of prop to entire state, prop value by default to set null *
 * @example @StoreConfig({storeName:'abc'}) *
 * Now store would become {'abc':null}
 */
export function StoreConfig(
  arg: { storeName: string; action?: Action } = {
    storeName: '@@FeatureStore@@',
  }
) {
  return function (constructor: Function) {
    let { storeName,action } = arg;
    let currentState = constructor?.prototype?.datasource?.getValue();
    if (!currentState) console.error('Failed to add Store');
    else {
      constructor.prototype.datasource.next({
        ...currentState,
        ...(storeName && { [storeName]: null }),
      }); 
      if(action) action = {...action};
      else action =  { name: `[Storename ${storeName}] init with null` };
      reduxExtension.logActions(
        action,
        constructor?.prototype?.datasource?.getValue()
      );
    }
  };
}
