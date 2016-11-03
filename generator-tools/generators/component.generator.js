/* eslint no-console: 0*/
import yargs from 'yargs';
import { fnGenerate, getPath } from './commons.generator';
import generateHelper from '../generate_helper';

export default (done) => {
  // Name is the last parameter
  const name = yargs.argv._[yargs.argv._.length - 1];
  const style = yargs.argv.style;
  const test = yargs.argv.test;
  const template = yargs.argv['react-template'];
  console.log(`Generating component named ${name}...`);
  const destinationFolderName = generateHelper.data(name).componentNameLowerCase;
  const destination = yargs.argv.where || destinationFolderName;
  const modifiers = [
    {
      prefix: '.component.js',
      enable: true,
    },
    {
      prefix: '.scss',
      enable: style,
    },
    {
      prefix: '.test.js',
      enable: test,
    },
    {
      prefix: '.rt.html',
      enable: template,
    },
  ];
  fnGenerate(name, modifiers.map(value =>
    getPath('component', value.prefix, value.enable)
  ), `${process.env.PWD}/shared/components/layouts/${destination}`, 'COMPONENT_NAME');
  console.log('Done!');
  done();
};
