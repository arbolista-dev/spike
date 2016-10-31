import i18n from 'espina/shared/test/mock/i18nFactory.mock';
import Router from 'espina/client/router';
import { MOCK_ROUTES, MOCK_STORE, MOCK_PAYLOAD } from 'espina/shared/test/mock/config.mock';
import createHistory from 'history/createMemoryHistory';
import { MOCK_ACTION_OK, MOCK_REDUCER } from 'espina/shared/test/mock/reducer.mock';
import StateManager from 'espina/client/state_manager';


(function () {
  mockClientRouterBehavior();
}());

export function mockClientRouterBehavior() {
	  const mockObject = {
	  	mockFunction: () => {

	  	},
	  };

	  describe('client router behavior', () => {
	  	let router;

    beforeEach(() => {
		  	router = new Router(i18n, [MOCK_ROUTES]);
		  	spyOn(router, 'onLocationChange');
		  	spyOn(mockObject, 'mockFunction');
    });
    it('initializeHistory', () => {
      expect(() => {
        router.initializeHistory(createHistory);
      }).not.toThrow();
    });
	    it('push route fire onLocationChange', () => {
	    	const stateManager = new StateManager();
	    	stateManager.initializeStore(MOCK_STORE, MOCK_REDUCER);
	    	router.initializeHistory(createHistory, stateManager.store, mockObject.mockFunction);
	    	router.pushRoute(MOCK_ROUTES.name, MOCK_ACTION_OK, MOCK_PAYLOAD);
	    	expect(router.onLocationChange).toHaveBeenCalled();
	    	expect(mockObject.mockFunction).toHaveBeenCalled();
	    });
 	});
}
