/*global JS_ENV Map require*/

import { createStore } from 'redux';
import { install } from 'redux-loop';
import { fromJS } from 'immutable';

export default class ServerStateManager {

  initializeStore(initial_state,reducer){
    this.store = createStore(reducer, initial_state, install());
  }

  // overridden in client state_manager.
  initialState(opts, cookies){
    return Object.assign({
      session: fromJS({ token: cookies.token || null })
    }, opts);
  }

  getInitialData(){
    return Promise.resolve();
  }

}

