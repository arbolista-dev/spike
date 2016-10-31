import StateManager from 'espina/client/state_manager';
import { MOCK_STORE, MOCK_LOCALSTORAGE } from 'espina/shared/test/mock/config.mock';
import { MOCK_REDUCER } from 'espina/shared/test/mock/reducer.mock';
(function () {
  mockClientStateManagerBehavior();
}());

export function mockClientStateManagerBehavior() {
  describe('client state manager behavior', () => {
  	let stateManager;
    it('initializes state manager', () => {
    	stateManager = new StateManager();
    	stateManager.initializeStore(MOCK_STORE, MOCK_REDUCER);
    });
    it('storage value', () => {
    	window.localStorage = MOCK_LOCALSTORAGE;
    	expect(stateManager.storageValue('token')).toEqual('123456');
    });
    it('storage json', () => {
    	window.localStorage = MOCK_LOCALSTORAGE;
    	expect(stateManager.storageParse('mockdata')).toEqual({ mockkey: 'mockvalue' });
    });
    it('try retrieve invalid key', () => {
      window.localStorage = MOCK_LOCALSTORAGE;
      window.sessionStorage = MOCK_LOCALSTORAGE;
      expect(stateManager.storageParse('mock')).toBe(null);
    });
    it('try without localStorage', () => {
      window.sessionStorage = MOCK_LOCALSTORAGE;
      expect(stateManager.storageParse('mockdata')).toEqual({ mockkey: 'mockvalue' });
    });
    it('try retrieve invalid key without sessionStorage', () => {
      window.localStorage = MOCK_LOCALSTORAGE;
      expect(stateManager.storageParse('mock')).toBe(null);
    });
  });
}
