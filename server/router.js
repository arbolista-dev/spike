import queryString from 'query-string';
import Route from '../shared/route';
export default class ServerRouter {

  constructor(i18n, routes) {
    let router = this;

    router.i18n = i18n;
    router.routes = router.includeHelpers(routes.map((definition)=> new Route(definition)));
  }

  get main_routes(){
    return this.routes.filter((route)=>{ return route.route_name !== 'Missing'; })
  }

  findRoute(pathname) {
    let router = this;
    return router.routes.find((route) => {
      return route.matchesLocation(pathname);
    });
  }

  parseLocation(new_location){
    let route = this.findRoute(new_location.pathname),
        location = {
          pathname: new_location.pathname,
          query: queryString.parse(new_location.search)
        };
    location.route_name = route.route_name;
    location.params = route.parseParams(location);
    return location;
  }

  includeHelpers(routes){
    Object.defineProperty(routes, 'getRoute', {
      value: function(name){
        return this.find( route => route.name === name)
      },
      enumerable: false,
      configurable: false
    });
    return routes;
  }


}