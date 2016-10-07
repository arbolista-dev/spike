/*global module*/

import React from 'react';

import template from './route_link.rt.html';
import SpikeComponent from 'shared/base_component';

class RouteLinkComponent extends SpikeComponent {


  get template(){
    return template;
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

  onRouteLinkClick(event){
    let route_link = this;
    event.preventDefault();
    route_link.pushRoute(route_link.route, route_link.action, this.props.payload);
  }

}

RouteLinkComponent.propTypes = {

};

module.exports = RouteLinkComponent;
