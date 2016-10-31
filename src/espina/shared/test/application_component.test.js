import Component from 'espina/shared/test/mock/component.mock';
import ApplicationComponent from 'espina/shared/application_component';
import i18n from 'espina/shared/test/mock/i18nFactory.mock';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Router from 'espina/client/router'
import StateManager from 'espina/client/state_manager'
import {MOCK_ROUTES,MOCK_STORE} from 'espina/shared/test/mock/config.mock'
import {MOCK_REDUCER} from 'espina/shared/test/mock/reducer.mock'
import  createHistory  from 'history/createMemoryHistory';


(function(){
  mockSharedApplicationComponentBehavior();
})();

export function mockSharedApplicationComponentBehavior(){

	  describe('shared application component behavior', ()=>{
	     it('initializes ApplicationComponent', ()=>{
	    	var router = new Router(i18n,[MOCK_ROUTES]);
	    	var stateManager = new StateManager();
	    	stateManager.initializeStore(MOCK_STORE,MOCK_REDUCER);
			var element = React.createElement(ApplicationComponent,
			{
				i18n:i18n,
				router:router,
				state_manager:stateManager,
				rootComponent:Component,
				createHistory:createHistory
			});
			expect(() => {
				ReactTestUtils.renderIntoDocument(element)
			}).not.toThrow();

	    });
 	});
}