/*global window NODE_ENV*/
import queryString from 'query-string';
import extend from 'extend';

import BaseRouter from 'espina/shared/router'
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

  initializeHistory(createHistory, store,fnChange) {
    let router = this;
    router.history = createHistory();
    router.history.listen(router.onLocationChange.bind(router, store));
    if (fnChange) router.history.listen(fnChange);
  }

  // Changing Route

  // this will cause onLocationChange to fire with
  // the new location.
  pushRoute(route_name, action, payload,params){
    let router = this,
        route = router.routes.findByName(route_name);

    action = {
      type: action ? action.getType() : updateLocation.getType(),
      payload: payload,
      no_scroll: payload ? payload.no_scroll : false
    };

    router.pushHistory({
      pathname: route.url(action , router.i18n, payload),
      search: queryString.stringify(params),
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
    let action = new_location.state || {};
    action.type =  action.type || 'UPDATE_LOCATION'
    if(!new_location.pathname.startsWith("/"))
      new_location.pathname = "/"+new_location.pathname;
    action.location = router.parseLocation(new_location);
    store.dispatch(action);
  }

  animateTransition(location){
    if (!location.state || !location.state.transition) return;
    let transition = location.state.transition
    if (transition === true) animateScroll({component:window,time:500});
    else animateScroll(transition);
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

  animateScroll(transition){
      let {component, time} = transition;
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
