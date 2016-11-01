/* eslint-env node, jasmine */
import StateManager from 'espina/shared/state_manager';
import Router from 'espina/shared/router';
import i18n from 'espina/shared/test/mock/i18nFactory.mock';
import { MOCK_STORE, MOCK_COOKIES, MOCK_PAYLOAD, MOCK_LOCATION, MOCK_ROUTES } from 'espina/shared/test/mock/config.mock';
import { MOCK_REDUCER } from './mock/reducer.mock';

function mockSharedStateManagerBehavior() {
  describe('shared state manager behavior', () => {
    let stateManager;
    it('initializes state manager', () => {
      stateManager = new StateManager();
      stateManager.initializeStore(MOCK_STORE, MOCK_REDUCER);
    });
    it('initialState', () => {
      const state = StateManager.initialState(MOCK_PAYLOAD, MOCK_COOKIES);
      expect(state.session.get('token')).toEqual('123456');
      expect(state.id).toEqual('MockValue');
    });
    it('parseInitialLocation', () => {
      const router = new Router(i18n, [MOCK_ROUTES]);
      const locationState = StateManager.parseInitialLocation(MOCK_LOCATION, router);
      expect(locationState.pathname).toEqual(MOCK_LOCATION.pathname);
      expect(locationState.query.mockQuery).toEqual('mockValue');
      expect(locationState.route_name).toEqual('MockRoute');
      expect(locationState.params.mock1).toEqual('mockValue1');
      expect(locationState.params.mock3).toEqual('mockValue2');
    });
  });
}

(() => mockSharedStateManagerBehavior())();
