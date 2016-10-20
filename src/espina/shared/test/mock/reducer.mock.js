import { fromJS } from 'immutable';
import { createAction, createReducer } from 'redux-act';

export const MOCK_ACTION_OK = createAction('Mock Action');
export const MOCK_ACTION_FAIL = createAction('Mock Action');

const ACTIONS = {
	[MOCK_ACTION_OK]:() => {
		fromJS({ok:true});
	},
	[MOCK_ACTION_FAIL]:() => {
		fromJS({ok:false});
	}
};

export const MOCK_REDUCER = createReducer(ACTIONS,null);