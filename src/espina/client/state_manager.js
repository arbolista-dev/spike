/* eslint-env node, browser */
import { fromJS } from 'immutable';
import SharedStateManager from 'espina/shared/state_manager';

export default class ClientStateManager extends SharedStateManager {

  // Check localStorage first. If not present check session storage.
  static storageValue(key) {
    let value = null;
    if (window.localStorage) {
      value = window.localStorage.getItem(key);
    }
    if (!value && window.sessionStorage) {
      value = window.sessionStorage.getItem(key);
    }
    return value;
  }

  static storageParse(key) {
    const value = ClientStateManager.storageValue(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  static initialState(opts) {
    return Object.assign({
      session: fromJS({ token: this.storageValue('token') }),
    }, opts);
  }

}
