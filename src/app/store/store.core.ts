import { BehaviorSubject } from "rxjs";

export class STORE {
  private static instance: STORE;
  dataSource = new BehaviorSubject<{ [key: string]: any }>({});
  readonly state$ = this.dataSource.asObservable();
  get currentState() {
    return this.dataSource.getValue();
  }

  constructor() {}

  public static resetStore(){
    STORE.instance = new STORE();
  }

  public static getInstance() {
    if (!STORE.instance) {
      STORE.instance = new STORE();
    }
    return STORE.instance;
  }
}
