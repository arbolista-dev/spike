/* global describe it expect console*/

import TestUtils from 'react-addons-test-utils';
import React from 'react';
import createHistory from 'history/createMemoryHistory';
import RouteLink from './route_link.component';
import Router from 'espina/client/router';
import StateManager from 'espina/client/state_manager';
import ApplicationComponent from 'espina/shared/application_component';
import i18n from 'espina/shared/test/mock/i18nFactory.mock';
import { MOCK_ROUTES, MOCK_STORE, MOCK_PAYLOAD } from 'espina/shared/test/mock/config.mock';
import { MOCK_REDUCER, MOCK_ACTION_OK } from 'espina/shared/test/mock/reducer.mock';

describe('RouteLink component', () => {
  let router;
  it('can not be render without application_component', (done) => {
  	expect(() => {
  		const route_link = TestUtils.renderIntoDocument(React.createElement(RouteLink, {
  			action: MOCK_ACTION_OK,
    route: MOCK_ROUTES.name,
    payload: MOCK_PAYLOAD,
  		}));
  	}).toThrow();
  	done();
  });
  beforeEach(() => {
		  	router = new Router(i18n, [MOCK_ROUTES]);
		  	spyOn(router, 'onLocationChange');
  });
  it('renders inside application_component', () => {
    const stateManager = new StateManager();
    stateManager.initializeStore(MOCK_STORE, MOCK_REDUCER);
    const element = React.createElement(ApplicationComponent,
      {
        i18n,
        router,
        state_manager: stateManager,
        rootComponent: RouteLink,
        rootComponentProps: {
          action: MOCK_ACTION_OK,
          route: MOCK_ROUTES.name,
          payload: MOCK_PAYLOAD,
        },
        createHistory,
      });
    let doc;
    expect(() => {
      doc = TestUtils.renderIntoDocument(element);
    }).not.toThrow();
    let route_link;
    expect(() => {
      route_link = TestUtils.findRenderedDOMComponentWithTag(doc, 'a');
	 }).not.toThrow();

    TestUtils.Simulate.click(route_link);
	// The click must fire pushRoute, pushRoute must fire onLocationChange
    expect(router.onLocationChange).toHaveBeenCalled();
  });
});
