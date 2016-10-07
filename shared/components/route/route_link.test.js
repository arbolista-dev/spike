/*global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import React from 'react';
import  createHistory  from 'history/createMemoryHistory';
import RouteLink from './route_link.component';
import Router from 'client/router';
import StateManager from 'client/state_manager'
import ApplicationComponent from 'shared/application_component'
import i18n from 'shared/test/mock/i18nFactory.mock';
import {MOCK_ROUTES,MOCK_STORE,MOCK_PAYLOAD} from 'shared/test/mock/config.mock'
import {MOCK_REDUCER,MOCK_ACTION_OK} from 'shared/test/mock/reducer.mock'

describe('RouteLink component', ()=>{
  var router;
  it('renders without problems', (done)=>{
      let route_link =    TestUtils.renderIntoDocument(React.createElement(RouteLink) );
      expect(route_link.state).toEqual({});
      
      done();
  });
  beforeEach(function() {
		  	router = new Router(i18n,[MOCK_ROUTES]);
		  	spyOn(router, 'onLocationChange');
		  
  });
  it('renders inside application_component',()=>{
	var stateManager = new StateManager();
	stateManager.initializeStore(MOCK_STORE,MOCK_REDUCER);
	var element = React.createElement(ApplicationComponent,
	{
		i18n:i18n,
		router:router,
		state_manager:stateManager,
		rootComponent:RouteLink,
		rootComponentProps:{
			action:MOCK_ACTION_OK,
			route:MOCK_ROUTES.name,
			payload:MOCK_PAYLOAD
		},
		createHistory:createHistory
	});
	var doc;
	expect(() => {
		doc =TestUtils.renderIntoDocument(element)
	}).not.toThrow();
	var route_link;
	expect(() => {
		route_link = TestUtils.findRenderedDOMComponentWithTag(doc,"a");
	 }).not.toThrow();
	
	TestUtils.Simulate.click(route_link);
	//The click must fire pushRoute, pushRoute must fire onLocationChange
	expect(router.onLocationChange).toHaveBeenCalled();
  });
});
