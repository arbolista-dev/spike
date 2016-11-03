/* eslint  import/no-dynamic-require: 0 ,global-require:0 */
import * as S from 'underscore.string';
import pathToRegexp from 'path-to-regexp';

export default class Route {

  constructor(routeDefinition) {
    const route = this;
    route.params = {};
    route.data = routeDefinition;
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
    if (this.data.component && this.data.component instanceof String) {
      return require(`../../../shared/components/layouts/${this.data.component}/${this.data.component}.component`);
    } else if (this.data.component) {
      return this.data.component;
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
        match = Route.match(r, pathname);
        return match != null;
      });
      return match;
    }
    return Route.match(route.data.path, pathname);
  }
  // Match a single path
  static match(path, pathname) {
    const keys = [];
    if (path instanceof RegExp) {
      const match = pathname.match(path);
      return !match ? null : {
        token: match,
        keys: [],
      };
    }
    const token = pathToRegexp(path, keys).exec(pathname);
    return token == null ? null : {
      token,
      keys,
    };
  }

  // location is a React History location object.
  parseParams(location) {
    const route = this;
    const params = {};
    const tokens = route.getMatch(location.pathname);
    if (tokens && tokens.keys.length !== 0) {
      let i = 1;
      tokens.keys.forEach((e) => { params[e.name] = tokens.token[i]; i += 1; });
    }
    this.params = params;
    return params;
  }

  // route should override if it must use state to generate url
  url(action, i18n, payload, params, hash) {
    if (this.data.url) {
      return this.data.url.call(this, action, i18n, payload, params, hash);
    }
    const routePath = i18n.t(this.key);
    return `/${i18n.language}/${routePath}`;
  }

}
