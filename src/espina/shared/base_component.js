import React from 'react';
import StateManager from 'espina/shared/state_manager';
import Router from 'espina/shared/router';

class SpikeComponent extends React.Component {

  // Must
  get stateManager() {
    return this.context.stateManager;
  }
  get i18n() {
    return this.context.i18n;
  }
  get router() {
    return this.context.router;
  }

  get currentRoute() {
    return this.router.routes.findByName(this.routeName);
  }

  get routeName() {
    return this.props.location.get('routeName');
  }
  pushRoute(routeName, action, payload, params, hash) {
    this.router.pushRoute(routeName, action, payload, params, hash);
  }

  get loggedIn() {
    if (this.props.session) {
      return !!this.props.session.get('token');
    }
    return false;
  }

  get t() {
    const i18n = this.context.i18n;
    if (!i18n) {
      // i18n not present - probably unit test
      // no translation - used for checking the keys
      return key => key;
    }
    // TODO: implement language switching
    // FIXME: getFixedT not finding translations.
    // return i18n.getFixedT(i18n.language, 'translations');
    return i18n.t.bind(i18n);
  }

  render() {
    const component = this;
    return component.template.call(component);
  }

}

SpikeComponent.contextTypes = {
  stateManager: React.PropTypes.instanceOf(StateManager),
  router: React.PropTypes.instanceOf(Router),
  i18n: React.PropTypes.object,
};

SpikeComponent.propTypes = {
  session: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default SpikeComponent;
