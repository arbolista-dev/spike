import { fromJS } from 'immutable';
import ServerStateManager from '../server/state_manager';

export default class ClientStateManager extends ServerStateManager {

  // Check localStorage first. If not present check session storage.
  storageValue(key){
    let value = window.localStorage.getItem(key);
    if (!value) {
      value = window.sessionStorage.getItem(key);
    }
    return value;
  }

  storageParse(key){
    let value = this.storageValue(key);
    if (!value){
      return null;
    }
    return JSON.parse(value)
  }

  initialState(opts){
    return Object.assign({
      session: fromJS({ token: this.storageValue('token') })
    }, opts);
  }

  getInitialData(){
    let state_manager = this;
    // placeholder for initial data on client before rendering app.
    return Promise.resolve();
  }

}
