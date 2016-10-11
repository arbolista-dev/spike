import * as Immutable from 'immutable';
import { loop, Effects } from 'redux-loop';
import { createReducer } from 'redux-act';

import {
  ensure<%= componentNameCamelCase %>,
  doEnsure<%= componentNameCamelCase %>,
  <%= componentNameCamelCaseDecapitalized %>Retrieved,
  <%= componentNameCamelCaseDecapitalized %>RetrievalError
} from 'shared/reducers/<%= componentNameLowerCase %>/<%= componentNameLowerCase %>.actions';

export const INITIAL = Immutable.fromJS({
  data: undefined,
  loading: false,
  load_error: false
});


const ACTIONS = {

  // Load latest <%= componentNameCamelCase %>
  [ensure<%= componentNameCamelCase %>]: (data)=>{
    if (!data.get('loading') && data.get('data') === undefined){
      return loop(
        data
          .set('loading', true)
          .set('load_error', false),
        Effects.promise(doEnsure<%= componentNameCamelCase %>)
      )
    }
    return data;
  },

  // <%= componentNameCamelCase %> from API response.
  [<%= componentNameCamelCaseDecapitalized %>Retrieved]: (data, res)=>{
    return data
          .set('data', Immutable.fromJS(res))
          .set('loading', false)
          .set('load_error', false);
  },

  [<%= componentNameCamelCaseDecapitalized %>RetrievalError]: (data, _res)=>{
    return data
          .set('loading', false)
          .set('load_error', true);
  }

};

const REDUCER = createReducer(ACTIONS, INITIAL);

export default REDUCER;
