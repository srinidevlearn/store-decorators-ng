import { Action, reduxExtension } from './redux.extension';

export function updateStore(data: {
  store: any;
  setterValue: any;
  params: ISetState;
}) {
  try {
    let { store, setterValue, params }: any = data;
    let { key, concat, storeName,action } = params;
    let { currentState } = store;
    let cloned = JSON.parse(JSON.stringify(currentState));
    let featureStoreModule = currentState[storeName] ?? Object.create(null);
    // now need to add dynamically added keys to feature module and initialize with null values
    featureStoreModule[key] = null;
    let dataType: string = typeof setterValue;
    if (Array.isArray(setterValue)) dataType = 'array';

    /**
     * start logic for updated logics
     */

    switch (true) {
      case dataType == 'undefined' || dataType === null:
        featureStoreModule[key] = setterValue;
        break;

      case dataType === 'number' ||
        dataType === 'string' ||
        dataType === 'boolean':
        featureStoreModule[key] = setterValue;
        break;

      case dataType === 'array':
        featureStoreModule[key] = [...setterValue];
        if (concat && currentState[storeName][key]) {
          featureStoreModule[key] = [
            ...cloned[storeName][key],
            ...featureStoreModule[key],
          ];
        }
        break;

      case dataType === 'object':
        featureStoreModule[key] = {};
        if (concat && currentState[storeName][key]) {
          featureStoreModule[key] = {
            ...cloned[storeName][key],
            ...setterValue,
          };
        } else {
          featureStoreModule[key] = { ...setterValue };
        }
        break;

      default:
        break;
    }

    /**
     * end logic for updated logics
     **/

    currentState[storeName] = featureStoreModule;
    store.dataSource.next({ ...store.currentState });
    //responsible for showing update status on redux dev tools
    let actions = action?.name ? {...action} : {name:`[Storename ${ storeName}] to ${[key]}`}
    reduxExtension.logActions(actions, store.currentState);
  } catch (e) {
    console.log(e)
  }
}

export const CreateAction = function (str: string) {
  return { name: str };
};
/**
 * @interface ISetState
 */
export interface ISetState {
  storeName: string;
  key: string;
  action?: Action;
  concat?: boolean;
  useMethodResponse?: boolean;
}
/**
 * @interface IQuery
 */
export interface IQuery {
  storeName: string;
  select?: string;
  deepNested?: boolean;
  separator?: string;
}
