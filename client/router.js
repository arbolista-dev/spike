/*global window NODE_ENV*/
import queryString from 'query-string';
import extend from 'extend';

import BaseRouter from 'shared/router'
import { createAction } from 'redux-act';

const updateLocation = createAction('Default action for updating url.');

export { updateLocation };


const DEFAULT_UPDATE_LOCATION_ACTION = {
  type: updateLocation.getType(),
  payload: {}
};

export default class Router extends BaseRouter {

  get locale(){
    return Router.locale();
  }

  initializeHistory(createHistory, store) {
    let router = this;
    router.history = createHistory();
    router.history.listen(router.onLocationChange.bind(router, store));
  }

  // Changing Route

  // this will cause onLocationChange to fire with
  // the new location.
  pushRoute(route_name, action, payload){
    let router = this,
        route = router.routes.getRoute(route_name);

    action = {
      type: action ? action.getType() : updateLocation.getType(),
      payload: payload,
      no_scroll: payload ? payload.no_scroll : false
    };

    router.pushHistory({
      pathname: route.url(action, router.i18n),
      state: action
    });
  }

  pushHistory(location){
    this.history.push(location);
  }

  onLocationChange(store, new_location){
    let router = this;
    // NOTE: You can pass true to scrollTop property (ie Integer).
    router.animateTransition(new_location);
    let action = new_location.state || {},
      query = queryString.parse(new_location.search),
      route = router.findRouteByPath(new_location.pathname);

    action.type =  action.type || 'UPDATE_LOCATION'
    action.location = {
      pathname: new_location.pathname,
      query: query,
      route_name: route.name
    };
    action.location.params = route.setParams(action.location);
    store.dispatch(action);
  }

  animateTransition(location){
    if (!location.state || !location.state.transition) return;
    let transition = location.state.transition
    if (transition === true) animateScroll(window,500);
  }

  scrollTop(component, nextStep){
      if(nextStep == null) {
          return component.scrollY != null ? component.scrollY : component.scrollTop;
      } else if(nextStep <= 0) {
          component.scrollTo ? component.scrollTo(0, 0):component.scrollTop = 0;
          return 0;
      } else {
          component.scrollTo ? component.scrollTo(0, nextStep) : component.scrollTop = nextStep;
          return nextStep;
      }
  };

  animateScroll(component, time){
      var DEFAULT_TIME = 1000;
      if(time == null) {
          time = DEFAULT_TIME;
      }
      var originY = scrollTop(component);
      var currentY = originY;
      var originSpeed = originY / (time / 60);
      var currentSpeed;
      (function operate(){
          currentSpeed = originSpeed;
          currentY -= currentSpeed;
          if(scrollTop(component, currentY) !== 0) {
               window.requestAnimationFrame.call(window, operate);
          }
      })();
  };

  get default_update_location_action(){
    return extend(true, {}, DEFAULT_UPDATE_LOCATION_ACTION);
  }

  scrollForNewLocation(location){
    return !location.state || !location.state.no_scroll
  }

  // Use this when createHistory is a hash history.
  static currentHashLocation(){
    let hash = window.location.hash,
        match = hash.match(/^#([^\?]+)(\?.+)?/);
    return {
      pathname: match ? match[1] : '',
      query: match && match[2] ? match[2] : ''
    }
  }

  static locale(){
    let pathname = window.location.pathname,
        match = pathname.match(new RegExp('^\/?(\\w{2})(\/|$)'));

    if (!match){ return 'en'; }
    return match[1];
  }

}
