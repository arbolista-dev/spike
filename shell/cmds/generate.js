exports.command = 'generate <what>';
exports.desc = 'Generate a new component';
exports.builder = yargs =>
   yargs.commandDir('./generate')
;
exports.handler = () => {};
