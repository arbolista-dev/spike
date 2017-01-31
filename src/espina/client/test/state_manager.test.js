/* eslint-env node, jasmine, browser */
import StateManager from 'espina/client/state_manager';
import { MOCK_STORE, MOCK_LOCALSTORAGE } from 'espina/shared/test/mock/config.mock';
import { MOCK_REDUCER } from 'espina/shared/test/mock/reducer.mock';


function mockClientStateManagerBehavior() {
  let stateManager;
  describe('client state manager behavior', () => {
    it('initializes state manager', () => {
      stateManager = new StateManager();
      stateManager.initializeStore(MOCK_STORE, MOCK_REDUCER);
    });
    it('storage value', () => {
      window.localStorage.setItem('token', MOCK_LOCALSTORAGE.token);
      expect(StateManager.storageValue('token')).toEqual('123456');
    });
    it('storage json', () => {
      window.localStorage.setItem('mockdata', MOCK_LOCALSTORAGE.mockdata);
      expect(StateManager.storageParse('mockdata')).toEqual({ mockkey: 'mockvalue' });
    });
    it('try retrieve invalid key', () => {
      window.sessionStorage.setItem('mockdata', MOCK_LOCALSTORAGE.mockdata);
      window.sessionStorage.setItem('token', MOCK_LOCALSTORAGE.token);
      expect(StateManager.storageParse('mock')).toBe(null);
    });
    it('try without localStorage', () => {
      window.sessionStorage.setItem('mockdata', MOCK_LOCALSTORAGE.mockdata);
      expect(StateManager.storageParse('mockdata')).toEqual({ mockkey: 'mockvalue' });
    });
    it('try retrieve invalid key without sessionStorage', () => {
      window.localStorage.setItem('mockdata', MOCK_LOCALSTORAGE.mockdata);
      window.localStorage.setItem('token', MOCK_LOCALSTORAGE.token);
      expect(StateManager.storageParse('mock')).toBe(null);
    });
  });
}

(() => mockClientStateManagerBehavior())();
