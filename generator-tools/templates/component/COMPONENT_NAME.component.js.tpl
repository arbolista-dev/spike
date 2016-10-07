/*global module*/

import React from 'react';

import template from './<%= componentNameLowerCase %>.rt.html';
import SpikeComponent from 'spike/shared/base_component';

class <%=  componentNameCamelCase %>Component extends SpikeComponent {

  get template(){
    return template;
  }

}

<%=  componentNameCamelCase %>Component.propTypes = {

};

module.exports = <%=  componentNameCamelCase %>Component;
