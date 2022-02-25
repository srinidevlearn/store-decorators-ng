import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { StoreConfig } from '../store/store.config.decorator';
import { Query, Store } from '../store';

@Injectable({
  providedIn: 'root'
})
@StoreConfig({storeName:"xyz"})
@Store()
export class XYZFacadeService{

  @Query({storeName:"xyz"})
  dashboard$!:Observable<any>

  constructor() { 
  }


}
