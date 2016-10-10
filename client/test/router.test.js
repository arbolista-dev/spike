import i18n from 'shared/test/mock/i18nFactory.mock';
import Router from 'client/router'
import {MOCK_ROUTES,MOCK_STORE,MOCK_PAYLOAD} from 'shared/test/mock/config.mock'
import  createHistory  from 'history/createMemoryHistory';
import {MOCK_ACTION_OK,MOCK_REDUCER} from 'shared/test/mock/reducer.mock'
import StateManager from 'client/state_manager'


(function(){
  mockClientRouterBehavior();
})();

export function mockClientRouterBehavior(){
	  var mockObject = {
	  	mockFunction:() => {

	  	}
	  }

	  describe('client router behavior', ()=>{
	  	var router;
	  
		beforeEach(function() {
		  	router = new Router(i18n,[MOCK_ROUTES]);
		  	spyOn(router, 'onLocationChange');
		  	spyOn(mockObject,"mockFunction");
		});
		it("initializeHistory",() =>{
			expect(()=>{
				router.initializeHistory(createHistory);
			}).not.toThrow();
		});
	    it("push route fire onLocationChange",() =>{
	    	var stateManager = new StateManager();
	    	stateManager.initializeStore(MOCK_STORE,MOCK_REDUCER);
	    	router.initializeHistory(createHistory,stateManager.store,mockObject.mockFunction);
	    	router.pushRoute(MOCK_ROUTES.name,MOCK_ACTION_OK,MOCK_PAYLOAD);
	    	expect(router.onLocationChange).toHaveBeenCalled();
	    	expect(mockObject.mockFunction).toHaveBeenCalled();
	    });

 	});
}