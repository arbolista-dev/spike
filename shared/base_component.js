import React from 'react';
import StateManager from 'shared/state_manager'
import Router from 'shared/router'

export default class BaseComponent extends React.Component {
	constructor(props, context) {
 		super(props, context);
  		this.state = {};
 	}
	//Must
	get state_manager(){
    	return this.context.state_manager;
  	}
  	get i18n(){
    	return this.context.i18n;
  	}
  	get router() {
  		return this.context.router;
  	}

	get current_route(){
		return this.router.routes.findByName(this.route_name);
	}

	get route_name() {
		return this.props.location.get('route_name');
	}
	pushRoute(route_name, action, payload){
		this.router.pushRoute(route_name, action, payload);
	}

	get logged_in(){
		if(!this.props.session){
			return false;
		}
      	return !!this.props.session.get('token');
    }
    
    get authenticable() {
    	return false;
    }

    render(){
      let component = this;
      if (component.logged_in || !component.authenticable){
        return component.template.call(component);
      } else {
        return React.createElement(Login, {
          login: this.props.login
        });
      }
    }

	get t() {
		var i18n = this.context.i18n;
		if (!i18n) {
			// i18n not present - probably unit test
			return (key) => {
				// no translation - used for checking the keys
				return key;
			};
		} else {
			// TODO: implement language switching
			// FIXME: getFixedT not finding translations.
			//return i18n.getFixedT(i18n.language, 'translations');
			return i18n.t.bind(i18n);
		}
	}
}

BaseComponent.propTypes = {
	session: React.PropTypes.object,
	location: React.PropTypes.object
}
BaseComponent.contextTypes = {
	state_manager: React.PropTypes.instanceOf(StateManager),
	router: React.PropTypes.instanceOf(Router),
	i18n: React.PropTypes.object
}
