/*global module*/

import React from 'react';

import SpikeComponent from 'espina/shared/base_component';

class RouteLinkComponent extends SpikeComponent {


  get template(){
    return () => (
        <a className={[this.class]}
                  href={this.href}
                  role={this.role}
                  onClick={this.onRouteLinkClick.bind(this)}>{this.props.children}</a>
    );
  }
  get route(){
    return this.props.route;
  }

  get action(){
    return this.props.action || {};
  }

  get class(){
    return this.props.className;
  }
  get href(){
    let route_link = this;
    return this.router.urlForRoute(route_link.route, route_link.action, route_link.props.payload, route_link.props.params) || '#';
  }

  onRouteLinkClick(event){
    let route_link = this;
    event.preventDefault();
    route_link.pushRoute(route_link.route, route_link.action, this.props.payload);
  }

}

RouteLinkComponent.propTypes = {
  action: React.PropTypes.func.isRequired,
  className: React.PropTypes.object,
  route: React.PropTypes.string.isRequired,
  payload: React.PropTypes.object,
  params: React.PropTypes.object
};

export default RouteLinkComponent;
