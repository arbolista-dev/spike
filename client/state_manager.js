import { fromJS } from 'immutable';
import SharedStateManager from 'shared/state_manager';

export default class ClientStateManager extends SharedStateManager {

  // Check localStorage first. If not present check session storage.
  storageValue(key){
    let value=null;;
    if(window.localStorage)
      value = window.localStorage.getItem(key);
    if (!value && window.sessionStorage) {
      value = window.sessionStorage.getItem(key);
    }
    return value;
  }

  storageParse(key){
    let value = this.storageValue(key);
    if (!value){
      return null;
    }
    try {
      return JSON.parse(value)
    }catch(e){
      return null;
    }
  }

  initialState(opts){
    return Object.assign({
      session: fromJS({ token: this.storageValue('token') })
    }, opts);
  }

}
