require('babel-register')({
  presets: ['es2015'],
});
const reducerGenerator = require('../../../generator-tools/generators/reducer.generator').default;

exports.command = 'reducer <name> [--where=where] [-t]';
exports.desc = 'Generate a new Redux Reducer';
exports.builder = {
  where: {
    demand: false,
    describe: 'Where the reducer must be created',
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
};
exports.handler = function (argv) {
  	reducerGenerator(() => {

  	});
};
