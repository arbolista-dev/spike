/*global JS_ENV Map require*/

import { createStore } from 'redux';
import { install } from 'redux-loop';
import { fromJS } from 'immutable';

export default class  SharedStateManager{

  initializeStore(initial_state,reducer){
    this.store = createStore(reducer, initial_state, install());
  }

  // overridden in client state_manager.
  initialState(opts, cookies){
    return Object.assign({
      session: fromJS({ token: cookies.token || null })
    }, opts);
  }

  parseInitialLocation(initial_location, router){
    let location_state = router.parseLocation(initial_location);
    return location_state;
  }

}

