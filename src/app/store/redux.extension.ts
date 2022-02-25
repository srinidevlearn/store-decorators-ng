class ReduxExtension {
  private get extensionHandle() {
    return (<any>window).__REDUX_DEVTOOLS_EXTENSION__;
  }
  private state: { [key: string]: any } = {};

  public logActions(action: Action,  value: any) {
    let actions:{type:string}={type:action.name};
    this.extensionHandle.send(actions,value);
  }
}
export const reduxExtension = new ReduxExtension();
export interface Action {
  name: string;
}
