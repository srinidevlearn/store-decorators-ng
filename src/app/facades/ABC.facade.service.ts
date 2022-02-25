import { Injectable } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import {
  setStateByProp,
  setStateByMethod,
  Query,
  Store,
  StoreConfig,
  CreateAction,
} from '../store';

export namespace Action {
  export const insertName = CreateAction(`[ABC StoreFeatureModule] Add new names`);
  export const insertData = CreateAction(`[ABC StoreFeatureModule] Add new data1`);
  export const concatData = CreateAction(`[ABC StoreFeatureModule] Concat new data1`);
  export const insertData2 = CreateAction(`[ABC StoreFeatureModule] Insert new data2`);
  export const concatData2 = CreateAction(`[ABC StoreFeatureModule] Concat new data2`);
  export const insertDashboardConfig = CreateAction(
    `[ABC StoreFeatureModule] Add new Dashboard Config`
  );
  export const concatDashboardConfig = CreateAction(
    `[ABC StoreFeatureModule] Add new Dashboard Config`
  );
  export const insertListString = CreateAction(
    `[ABC StoreFeatureModule] Add new List Details`
  );
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ storeName: 'abc' })
@Store()
export class ABCFacadeService {
  @Query({ storeName: 'abc', select: 'data1.config' })
  abc$!: Observable<any>;

  @Query({ storeName: 'xyz' })
  xyz$!: Observable<any>;

  @Query({ storeName: 'abc', select: 'list' })
  lists$!: Observable<any>;


  @Query({ storeName: 'abc', select: 'data1.config2' })
  dashboard$!: Observable<any>;

  constructor() {}

  @setStateByProp({
    storeName: 'abc',
    key: 'name',
    action: Action.insertName,
  })
  name = [1, 2, 3];

  @setStateByProp({
    storeName: 'abc',
    key: 'data',
    action: Action.insertData,
  })
  data = new Array(10)
    .fill(10)
    .map((itm, ind) => ({ name: 'srini', age: ind + 1 }));

  @setStateByProp({
    storeName: 'abc',
    key: 'data',
    concat: true,
    action: Action.concatData,
  })
  temp1 = new Array(10)
    .fill(10)
    .map((itm, ind) => ({ name: 'srini', age: ind + 11 }));

  @setStateByProp({
    storeName: 'abc',
    key: 'data1',
    action: Action.insertData2,
  })
  data1 = { config: { dashboard: { tile: 'name' } } };




  @setStateByProp({
    storeName: 'abc',
    key: 'data1',
    concat: true,
    action: Action.concatData2,
  })
  data2 = { config2: { dashboard: { tile: 'name' } } };

  @setStateByMethod({
    storeName: 'abc',
    key: 'list',
    concat:true,
    action: Action.insertListString,
    useMethodResponse:true
  })
  updateLists(list: string) {
    let temp =  list;
    return [temp];
  }

  @setStateByMethod({
    storeName: 'abc',
    key: 'list2',
    action: Action.insertListString,
  })
  updateLists2(list: string) {
    let temp =  list;
    return [temp];
  }


}
