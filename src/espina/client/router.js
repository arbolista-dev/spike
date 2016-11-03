/* eslint-env node, browser */
import { stringify } from 'query-string';
import BaseRouter from 'espina/shared/router';
import smoothScroll from 'smooth-scroll';

export default class Router extends BaseRouter {

  initializeHistory(createHistory, store, fnChange) {
    const router = this;
    router.history = createHistory();
    router.history.listen(router.onLocationChange.bind(router, store));
    if (fnChange) router.history.listen(fnChange);
  }

  // Changing Route

  // this will cause onLocationChange to fire with
  // the new location.
  pushRoute(routeName, action, payload, params, hash) {
    const router = this;
    const route = router.routes.findByName(routeName);
    let type;
    if (action && action.getType instanceof Function) { type = action.getType(); } else if (action && action instanceof String) { type = action; } else { type = 'UPDATE_LOCATION'; }
    const newAction = {
      type,
      payload,
      no_scroll: payload ? payload.no_scroll : false,
      transition: true,
    };

    router.pushHistory({
      pathname: route.url(newAction, router.i18n, payload, hash),
      search: stringify(params),
      state: newAction,
      hash,
    });
  }

  pushHistory(location) {
    this.history.push(location);
  }

  onLocationChange(store, location) {
    const router = this;
    const newLocation = location;
    // NOTE: You can pass true to scrollTop property (ie Integer).
    Router.animateTransition(newLocation);
    const action = newLocation.state || {};
    action.type = action.type || 'UPDATE_LOCATION';
    if (!newLocation.pathname.startsWith('/')) {
      newLocation.pathname = `/${newLocation.pathname}`;
    }
    action.location = router.parseLocation(newLocation);
    store.dispatch(action);
  }

  static animateTransition(location) {
    if (!location.state || !location.state.transition) return;
    const transition = location.state.transition;
    if (transition === true) {
      const component = document.getElementById(location.hash.replace('#', ''));
      Router.animateScroll(component);
    } else Router.animateScroll(transition);
  }

  static animateScroll(component) {
    smoothScroll.init();
    if (!component) {
      smoothScroll.animateScroll(0);
    } else {
      smoothScroll.animateScroll(component);
    }
  }

  // Use this when createHistory is a hash history.
  static currentHashLocation() {
    const hash = window.location.hash;
    const match = hash.match(/^#([^\\?]+)(\?.+)?/);
    return {
      pathname: match ? match[1] : '',
      query: match && match[2] ? match[2] : '',
    };
  }

  static locale() {
    const pathname = window.location.pathname;
    const match = pathname.match(new RegExp('^/?(\\w{2})(/|$)'));

    if (!match) { return 'en'; }
    return match[1];
  }

}
