/* eslint-env node, jasmine */

import i18n from 'espina/shared/test/mock/i18nFactory.mock';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Router from 'espina/client/router';
import StateManager from 'espina/client/state_manager';
import { MOCK_ROUTES, MOCK_STORE } from 'espina/shared/test/mock/config.mock';
import { MOCK_REDUCER } from 'espina/shared/test/mock/reducer.mock';
import Component from './mock/component.mock';

function mockSharedBaseComponentBehavior() {
  describe('shared base component behavior', () => {
    it('initializes component', () => {
      const router = new Router(i18n, [MOCK_ROUTES]);
      const stateManager = new StateManager();
      stateManager.initializeStore(MOCK_STORE, MOCK_REDUCER);
      const element = React.createElement(Component,
        {
          i18n,
          router,
          stateManager,
        });
      expect(() => {
        ReactTestUtils.renderIntoDocument(element);
      }).not.toThrow();
    });
  });
}

(() => mockSharedBaseComponentBehavior())();
