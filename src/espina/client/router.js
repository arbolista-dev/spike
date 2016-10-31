/* global window NODE_ENV*/
import { stringify } from 'query-string';
import BaseRouter from 'espina/shared/router';
import Scroll from 'scroll-js';

export default class Router extends BaseRouter {

  get locale() {
    return Router.locale();
  }

  initializeHistory(createHistory, store, fnChange) {
    const router = this;
    router.history = createHistory();
    router.history.listen(router.onLocationChange.bind(router, store));
    if (fnChange) router.history.listen(fnChange);
  }

  // Changing Route

  // this will cause onLocationChange to fire with
  // the new location.
  pushRoute(route_name, action, payload, params, hash) {
    let router = this,
      route = router.routes.findByName(route_name);

    action = {
      type: action ? action.getType() : 'UPDATE_LOCATION',
      payload,
      no_scroll: payload ? payload.no_scroll : false,
      transition: true,
    };

    router.pushHistory({
      pathname: route.url(action, router.i18n, payload, hash),
      search: stringify(params),
      state: action,
      hash,
    });
  }

  pushHistory(location) {
    this.history.push(location);
  }

  onLocationChange(store, new_location) {
    const router = this;
    // NOTE: You can pass true to scrollTop property (ie Integer).
    router.animateTransition(new_location);
    const action = new_location.state || {};
    action.type = action.type || 'UPDATE_LOCATION';
    if (!new_location.pathname.startsWith('/')) {
      new_location.pathname = `/${new_location.pathname}`;
    }
    action.location = router.parseLocation(new_location);
    store.dispatch(action);
  }

  animateTransition(location) {
    const router = this;
    if (!location.state || !location.state.transition) return;
    const transition = location.state.transition;
    if (transition === true) {
      const component = document.getElementById(location.hash.replace('#', ''));
      router.animateScroll(component);
    } else router.animateScroll(transition);
  }

  animateScroll(component) {
    const router = this;
    const scroll = new Scroll(document.body);
    if (!component) {
      scroll.to(0, 0);
    } else {
      scroll.toElement(component);
    }
  }

  scrollForNewLocation(location) {
    return !location.state || !location.state.no_scroll;
  }

  // Use this when createHistory is a hash history.
  static currentHashLocation() {
    let hash = window.location.hash,
      match = hash.match(/^#([^\?]+)(\?.+)?/);
    return {
      pathname: match ? match[1] : '',
      query: match && match[2] ? match[2] : '',
    };
  }

  static locale() {
    let pathname = window.location.pathname,
      match = pathname.match(new RegExp('^\/?(\\w{2})(\/|$)'));

    if (!match) { return 'en'; }
    return match[1];
  }

}
