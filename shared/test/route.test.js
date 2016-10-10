import Route from 'shared/route';
import i18n from 'shared/test/mock/i18nFactory.mock';
import {MOCK_ROUTES,MOCK_PAYLOAD,MOCK_PARAMS} from 'shared/test/mock/config.mock'
import {MOCK_ACTION_OK} from 'shared/test/mock/reducer.mock'

(function(){
  mockSharedRouteBehavior();
})();

export function mockSharedRouteBehavior(){

  describe('shared route behavior', ()=>{
  	var route;
    it('initializes route', ()=>{
		
		route = new Route(MOCK_ROUTES);
		expect(route.key).toEqual("mock_route");
		expect(route.name).toEqual("MockRoute");
		expect(route.path).toEqual("/:mock1?/mock2/:mock3?");
	 });
    it("test regex",() =>{
    	expect(route.matchesLocation("/mock1")).toBe(false);
		expect(route.matchesLocation("/mock2")).toBe(true);
    });
	it("test regex",() =>{
    	expect(route.matchesLocation("/mock1")).toBe(false);
		expect(route.matchesLocation("/mock2")).toBe(true);
		expect(route.matchesLocation("/mockValue/mock2/mockValue2")).toBe(true);
    });
    it("test parseParams",() => {
    	expect(route.parseParams({pathname:"/mockValue/mock2/mockValue2"})).toEqual({mock1:"mockValue",mock3:"mockValue2"});
    });
    it("test url generator",() => {
   		expect(route.url(MOCK_ACTION_OK,i18n,MOCK_PAYLOAD,MOCK_PARAMS)).toEqual("/MockRoute/MockValue/success?MockParam=MockParam");
    });


  });

}