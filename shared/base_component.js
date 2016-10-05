import React from 'react';
import StateManager from '../server/state_manager'
import Router from '../server/router'

export default class BaseComponent extends React.Component {
	//Must
	get state_manager(){
    	return this.context.state_manager;
  	}
  	get i18n(){
    	return this.context.i18n;
  	}

	get current_route(){
		return this.router.routes.getRoute(this.route_name);
	}

	get route_name() {
		return this.props.location.get('route_name');
	}
	pushRoute(route_name, action, payload){
		this.router.pushRoute(route_name, action, payload);
	}

	scrollTo(top=0){
		window.jQuery("html, body").animate({ scrollTop: top }, "slow");
	}

	get logged_in(){
		if(!this.props.session){
			return false;
		}
	  	console.log(this.props.session);
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
	get moment() {
		let i18n = this.context.i18n;
		if(i18n && i18n.language) {
			moment.locale(i18n.language);
		}
		return moment;
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
	session: React.PropTypes.object.isRequired,
	location: React.PropTypes.object.isRequired
}
