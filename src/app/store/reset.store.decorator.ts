import { reduxExtension } from "./redux.extension";
import { STORE } from "./store.core";

export function resetStore() {
    STORE.resetStore();
    reduxExtension.logActions({name:`[RESET STORE] Store Reset`},{})
}