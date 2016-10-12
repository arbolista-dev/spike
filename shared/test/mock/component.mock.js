import React from 'react';
import BaseComponent from 'shared/base_component';
import { connect } from 'react-redux';
export default class Component extends BaseComponent {
	
  	get template() {
  		return () => (<div>Mock</div>);
  	}
}

Component.propTypes = {
	session: React.PropTypes.object,
	location: React.PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    session: state['session'],
    location: state['location']
  };
}

connect(
  mapStateToProps
)(Component);
