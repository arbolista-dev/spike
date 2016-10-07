import StateManager from '../state_manager'
import Router from '../router'
import i18n from '../../shared/test/mock/i18nFactory.mock';
import {MOCK_STORE,MOCK_LOCALSTORAGE,MOCK_COOKIES,MOCK_PAYLOAD,MOCK_LOCATION,MOCK_ROUTES} from '../../shared/test/mock/config.mock'
import {MOCK_REDUCER} from '../../shared/test/mock/reducer.mock'
(function(){
  mockSharedStateManagerBehavior();
})();

export function mockSharedStateManagerBehavior(){

  describe('shared state manager behavior', ()=>{
  	var stateManager
    it('initializes state manager', ()=>{
    	stateManager = new StateManager();
    	stateManager.initializeStore(MOCK_STORE,MOCK_REDUCER);
    });
    it("initialState",() => {
      let state = stateManager.initialState(MOCK_PAYLOAD,MOCK_COOKIES);
      expect(state.session.get("token")).toEqual("123456");
      expect(state._id).toEqual("MockValue");	
    });
    it("parseInitialLocation",() => {
      let router = new Router(i18n,[MOCK_ROUTES]);
      let location_state = stateManager.parseInitialLocation(MOCK_LOCATION,router);
      expect(location_state.pathname).toEqual(MOCK_LOCATION.pathname);
      expect(location_state.query.mockQuery).toEqual("mockValue");
      expect(location_state.route_name).toEqual("MockRoute");
      expect(location_state.params.mock1).toEqual("mockValue1");
      expect(location_state.params.mock3).toEqual("mockValue2");
    });
  });
}