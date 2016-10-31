import { fnGenerate, getPath } from './commons.generator.js';
import gulp from 'gulp';
import generateHelper from '../generate_helper';
import yargs from 'yargs';

export default (done) => {
  // Name is the last parameter
  const name = yargs.argv._[yargs.argv._.length - 1];
  const test = yargs.argv.test;
  console.log(`Generating reducer named ${name}...`);
  const destinationFolderName = generateHelper.data(name).componentNameLowerCase;
  const destination = yargs.argv.where || destinationFolderName;
  const modifiers = [
    {
      prefix: '.actions.js',
      enable: true,
    },
    {
      prefix: '.reducer.js',
      enable: true,
    },
    {
      prefix: '.test.js',
      enable: test,
    },
  ];
  fnGenerate(name, modifiers.map(value =>
    getPath('reducer', value.prefix, value.enable)
  ), `${process.env.PWD}/shared/reducers/${destination}`, 'REDUCER_NAME');
  console.log('Done!');
 	done();
};
