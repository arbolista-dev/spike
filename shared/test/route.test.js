import Route from '../route';
import i18n from './mock/i18nFactory.mock';
import {MORK_ROUTES,MOCK_PAYLOAD} from './mock/data.mock'
(function(){
  mockSharedRouteBehavior();
})();

export function mockSharedRouteBehavior(){

  describe('shared route behavior', ()=>{
  	var route;
    it('initializes route', ()=>{
		
		route = new Route(MORK_ROUTES);
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
   		expect(route.url(MOCK_PAYLOAD,i18n)).toEqual("/MockRoute/MockValue/success");
    });


  });

}