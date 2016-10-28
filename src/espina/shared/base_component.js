import React from 'react';
import StateManager from 'espina/shared/state_manager'
import Router from 'espina/shared/router';

class SpikeComponent extends React.Component {

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
		pushRoute(route_name, action, payload,params,hash){
			this.router.pushRoute(route_name, action, payload,params,hash);
		}

		get logged_in(){
			if(this.props.session) 
	      		return !!this.props.session.get('token');
	      	return false;
	    }

	    render(){
	      let component = this;
	      return component.template.call(component);

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

SpikeComponent.contextTypes = {
	state_manager: React.PropTypes.instanceOf(StateManager),
	router: React.PropTypes.instanceOf(Router),
	i18n: React.PropTypes.object
}

export default SpikeComponent;
