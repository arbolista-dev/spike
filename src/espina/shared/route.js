import * as S from 'underscore.string';
import queryString from 'query-string';
import pathToRegexp from 'path-to-regexp';
import path from 'path'
import fs from 'fs'
export default class Route {

  constructor(route_definition){
    let route = this;
    route.params = {};
    route.data = route_definition;
  }

  get key(){
    return S.underscored(this.name);
  }

  get name(){
    return this.data.name;
  }

  get path(){
    return this.data.path;
  }

  get component(){

    if(this.data.component) {
      return require(`${this.data.component}`);
    }

    return require(`../../../shared/components/layouts/${this.key}/${this.key}.component`);
  }

  matchesLocation(pathname){
    return this.getMatch(pathname)!=null;
  }
  //Match an array of paths or a single path
  getMatch(pathname) {
    let route = this;
    if (route.data.path instanceof Array) {
      var match=null;
      route.data.path.some((r) => {
        match= this.match(r,pathname);
        return match != null;
      });
      return match;
    }else {
      return this.match(route.data.path,pathname);
    }
  }
  //Match a single path
  match(path,pathname) {
      var keys=[];
      var token = pathToRegexp(path,keys).exec(pathname);
      return token == null ? null: {
        token:token,
        keys:keys
      }
  }

  // location is a React History location object.
  parseParams(location){
    let route = this;  
    var keys=[],params={};
    var tokens = this.getMatch(location.pathname);
    if (tokens && tokens.keys.length!=0){
      var i = 1;
      var keys = tokens.keys;
      keys.forEach((e) => params[e.name] = tokens.token[i++] );
    }
    this.params = params;
    return params;
  }

  // route should override if it must use state to generate url
  url(action,i18n,payload,params){
    if (this.data.url){
      return this.data.url.call(this, action, i18n,payload,params);
    } else {
      let route_path = i18n.t(this.key);
      return `${route_path}`;
    }
  }

}