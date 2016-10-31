exports.command = 'generate <what>';
exports.desc = 'Generate a new component';
exports.builder = function (yargs) {
  return yargs.commandDir('./generate');
};
exports.handler = function (argv) {};
