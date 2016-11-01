/* global JS_ENV Map require*/

import { createStore } from 'redux';
import { install } from 'redux-loop';
import { fromJS } from 'immutable';

export default class SharedStateManager {

  initializeStore(initialState, reducer) {
    this.store = createStore(reducer, initialState, install());
  }

  // overridden in client state_manager.
  static initialState(opts, cookies) {
    return Object.assign({
      session: fromJS({ token: cookies.token || null }),
    }, opts);
  }

  static parseInitialLocation(initialLocation, router) {
    const locationState = router.parseLocation(initialLocation);
    return locationState;
  }

}

