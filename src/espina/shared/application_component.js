import React from 'react';
import { Provider } from 'react-redux';
import StateManager from 'espina/shared/state_manager';
import Router from 'espina/shared/router';

class ApplicationComponent extends React.Component {

  getChildContext() {
    return {
      stateManager: this.stateManager,
      router: this.router,
      i18n: this.props.i18n,
    };
  }
  componentDidMount() {
    const component = this;
    component.initializeHistory();
  }

  get stateManager() {
    return this.props.stateManager;
  }

  get router() {
    return this.props.router;
  }

  initializeHistory() {
    const component = this;
    component.router.initializeHistory(this.props.createHistory, component.stateManager.store);
  }

  render() {
    return React.createElement(Provider,
      {
        store: this.stateManager.store,
      },
    React.createElement(this.props.rootComponent, this.props.rootComponentProps || {}));
  }
}

ApplicationComponent.propTypes = {
  stateManager: React.PropTypes.instanceOf(StateManager).isRequired,
  router: React.PropTypes.instanceOf(Router).isRequired,
  i18n: React.PropTypes.object,
  // only required in browser
  createHistory: React.PropTypes.func,
  rootComponent: React.PropTypes.func.isRequired,
  rootComponentProps: React.PropTypes.object,
};

ApplicationComponent.childContextTypes = {
  stateManager: React.PropTypes.instanceOf(StateManager).isRequired,
  router: React.PropTypes.instanceOf(Router).isRequired,
  i18n: React.PropTypes.object,
};

export default ApplicationComponent;
