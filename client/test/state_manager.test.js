import StateManager from '../state_manager'
import {MOCK_STORE,MOCK_LOCALSTORAGE} from '../../shared/test/mock/data.mock'
import {MOCK_REDUCER} from '../../shared/test/mock/reducer.mock'
(function(){
  mockClientStateManagerBehavior();
})();

export function mockClientStateManagerBehavior(){

  describe('client state manager behavior', ()=>{
  	var stateManager
    it('initializes state manager', ()=>{
    	stateManager = new StateManager();
    	stateManager.initializeStore(MOCK_STORE,MOCK_REDUCER);
    });
    it("storage value",() => {
    	window.localStorage = MOCK_LOCALSTORAGE;
    	expect(stateManager.storageValue("token")).toEqual("123456"); 		
    });
    it("storage json",() => {
    	window.localStorage = MOCK_LOCALSTORAGE;
    	expect(stateManager.storageParse("mockdata")).toEqual({mockkey:"mockvalue"}); 		
    });
    	
  });

}