require('babel-register')({
  presets: ['es2015'],
});
const componentGenerator = require('../../../generator-tools/generators/component.generator').default;
exports.command = 'component <name> [--where=where] [-t] [-s] [--rt]';
exports.desc = 'Generate a new React Component';
exports.builder = {
  where: {
    demand: false,
    describe: 'Where the component must be created',
    type: 'string',
  },
  test: {
    alias: 't',
    demand: false,
    describe: 'Include Jasmine test',
    default: false,
    boolean: true,
    type: 'boolean',
  },
  style: {
    alias: 's',
    demand: false,
    describe: 'Include scss styles',
    default: false,
    boolean: true,
    type: 'boolean',
  },
  'react-template': {
    alias: 'rt',
    demand: false,
    describe: 'Include react-template file',
    default: false,
    boolean: true,
    type: 'boolean',
  },
};
exports.handler = function (argv) {
  	componentGenerator(() => {

  	});
};
