import { fromJS } from 'immutable';
import SharedStateManager from '../shared/state_manager';

export default class ClientStateManager extends SharedStateManager {

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

}
