import i18n from '../../shared/test/mock/i18nFactory.mock';
import Router from '../router'
import {MORK_ROUTES} from '../../shared/test/mock/data.mock'
import  createHistory  from 'history/createMemoryHistory';
import {MOCK_ACTION,MOCK_PAYLOAD} from '../../shared/test/mock/reducer.mock'


(function(){
  mockClientRouterBehavior();
})();

export function mockClientRouterBehavior(){

	  describe('client router behavior', ()=>{
	  	var router;
	  
		beforeEach(function() {
		  	router = new Router(i18n,[MORK_ROUTES]);
		  	spyOn(router, 'onLocationChange');
		  
		});
		it("initializeHistory",() =>{
			expect(()=>{
				router.initializeHistory(createHistory);
			}).not.toThrow();
		});
	    it("push route fire onLocationChange",() =>{
	    	router.initializeHistory(createHistory);
	    	router.pushRoute(MORK_ROUTES.name,MOCK_ACTION,MOCK_PAYLOAD);
	    	expect(router.onLocationChange).toHaveBeenCalled();
	    });

 	});
}