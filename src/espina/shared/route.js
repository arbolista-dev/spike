import * as S from 'underscore.string';
import queryString from 'query-string';
import pathToRegexp from 'path-to-regexp';
import path from 'path';
import fs from 'fs';
export default class Route {

  constructor(route_definition) {
    const route = this;
    route.params = {};
    route.data = route_definition;
  }

  get key() {
    return S.underscored(this.name);
  }

  get name() {
    return this.data.name;
  }

  get path() {
    return this.data.path;
  }

  get component() {
    if (this.data.component) {
      return require(`${this.data.component}`);
    }

    return require(`../../../shared/components/layouts/${this.key}/${this.key}.component`);
  }

  matchesLocation(pathname) {
    return this.getMatch(pathname) != null;
  }
  // Match an array of paths or a single path
  getMatch(pathname) {
    const route = this;
    if (route.data.path instanceof Array) {
      let match = null;
      route.data.path.some((r) => {
        match = this.match(r, pathname);
        return match != null;
      });
      return match;
    } else {
      return this.match(route.data.path, pathname);
    }
  }
  // Match a single path
  match(path, pathname) {
    const keys = [];
    if (path instanceof RegExp) {
      const match = pathname.match(path);
      return !match ? null : {
        token: match,
        keys: [],
      };
    } else {
      const token = pathToRegexp(path, keys).exec(pathname);
      return token == null ? null : {
        token,
        keys,
      };
    }
  }

  // location is a React History location object.
  parseParams(location) {
    const route = this;
    var keys = [],
      params = {};
    const tokens = this.getMatch(location.pathname);
    if (tokens && tokens.keys.length != 0) {
      let i = 1;
      var keys = tokens.keys;
      keys.forEach(e => params[e.name] = tokens.token[i++]);
    }
    this.params = params;
    return params;
  }

  // route should override if it must use state to generate url
  url(action, i18n, payload, params, hash) {
    if (this.data.url) {
      return this.data.url.call(this, action, i18n, payload, params);
    } else {
      const route_path = i18n.t(this.key);
      return `/${i18n.language}/${route_path}`;
    }
  }

}
