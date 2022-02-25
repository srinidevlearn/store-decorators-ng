import { pluck, distinctUntilChanged } from 'rxjs';
import { STORE } from './store.core';
import { IQuery } from './utility';
/**
 * @param  interface IQuery See {@link IQuery}
 * @param params
 * For instance your state like
 * @example {
 *  abc:{
 *      a:{
 *          x:null
 *      }
 *   }
 * }
 * to access x u can use @Query('abc.a.x')
 * this will return null
 */

export function Query(params: IQuery) {
  if (!params.separator) params.separator = '.';
  let store = STORE.getInstance();
  let selector: any = params.select?.split(params.separator);
  selector = Array.isArray(selector)
    ? [params.storeName, ...selector]
    : [params.storeName];
  return function (target: Object, key: string) {
    Object.defineProperty(target, key, {
      value: store.state$.pipe(pluck(...selector), distinctUntilChanged()),
    });
  };
}
