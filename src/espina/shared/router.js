import queryString from 'query-string';
import Route from 'espina/shared/route';
export default class BaseRouter {

  constructor(i18n, routes) {
    const router = this;

    router.i18n = i18n;
    router.routes = router.includeHelpers(routes.map(definition => new Route(definition)));
  }

  get main_routes() {
    return this.routes.filter(route => route.route_name !== 'Missing');
  }

  findRouteByPath(pathname) {
    const router = this;
    return router.routes.find(route =>
       route.matchesLocation(pathname)
    );
  }

  parseLocation(new_location) {
    let route = this.findRouteByPath(new_location.pathname),
      location = {
        pathname: new_location.pathname,
        query: queryString.parse(new_location.search),
      };
    location.route_name = route.name;
    location.params = route.parseParams(location);
    return location;
  }

  includeHelpers(routes) {
    Object.defineProperty(routes, 'findByName', {
      value(name) {
        return this.find(route => route.name === name);
      },
      enumerable: false,
      configurable: false,
    });
    return routes;
  }

  urlForRoute(route_name, action, payload, params) {
    let router = this,
      route = router.routes.findByName(route_name);

    if (!route) {
      console.warn(`Could not find route "${route_name}.`);
      return undefined;
    }
    return route.url(action, this.i18n, payload, params);
  }

}
