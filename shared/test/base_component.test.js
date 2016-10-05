import Component from './mock/component.mock';
import i18n from './mock/i18nFactory.mock';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Router from '../../client/router'
import StateManager from '../../client/state_manager'
import {MORK_ROUTES,MOCK_STORE} from './mock/data.mock'
import {MOCK_REDUCER} from './mock/reducer.mock'
import createHistory  from 'history/createMemoryHistory';


(function(){
  mockSharedBaseComponentBehavior();
})();

export function mockSharedBaseComponentBehavior(){

  describe('shared base component behavior', ()=>{
    it('initializes component', ()=>{
    	var router = new Router(i18n,[MORK_ROUTES]);
    	var stateManager = new StateManager();
    	stateManager.initializeStore(MOCK_STORE,MOCK_REDUCER);
		var element = React.createElement(Component,
		{
			i18n:i18n,
			router:router,
			state_manager:stateManager
		});
		expect(() => {
			ReactTestUtils.renderIntoDocument(element)
		}).not.toThrow();
    });
  });

}