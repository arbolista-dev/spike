import queryString from 'query-string';
import Route from 'espina/shared/route';

export default class BaseRouter {

  constructor(i18n, routes) {
    const router = this;

    router.i18n = i18n;
    router.routes = BaseRouter.includeHelpers(routes.map(definition => new Route(definition)));
  }

  get mainRoutes() {
    return this.routes.filter(route => route.name !== 'Missing');
  }

  findRouteByPath(location) {
    const router = this;
    return router.routes.find((route) => {
      const path = route.useHash ? (location.pathname + location.hash) : location.pathname;
      return route.matchesLocation(path);
    });
  }

  parseLocation(newLocation) {
    const route = this.findRouteByPath(newLocation);
    const location = {
      pathname: newLocation.pathname,
      query: queryString.parse(newLocation.search),
      hash: newLocation.hash,
    };
    location.routeName = route.name;
    location.params = route.parseParams(location);
    return location;
  }

  static includeHelpers(routes) {
    Object.defineProperty(routes, 'findByName', {
      value(name) {
        return this.find(route => route.name === name);
      },
      enumerable: false,
      configurable: false,
    });
    return routes;
  }

  urlForRoute(routeName, action, payload, params) {
    const router = this;
    const route = router.routes.findByName(routeName);

    if (!route) {
      // console.warn(`Could not find route "${route_name}.`);
      return undefined;
    }
    return route.url(action, this.i18n, payload, params);
  }

}
