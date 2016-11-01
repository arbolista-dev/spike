/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
// this is run via "npm test".

import Jasmine from 'jasmine';
import { argv } from 'yargs';
import jsdom from 'jsdom';
import app from 'app-module-path';

app.addPath(`${__dirname}/src/`);

const window = jsdom.jsdom('<html><head></head><body></body></html>').defaultView;

global.window = window;

global.document = window.document;
global.navigator = window.navigator;
const DEFAULT_FILES = [
  'src/espina/server/**/*.test.js',
  'src/espina/shared/**/*.test.js',
  'src/espina/client/**/*.test.js',
];

function interpretFiles(ifiles) {
  return ifiles.split(',').map((dir) => {
    if (/\.test\.js$/.test(dir)) {
      return dir;
    }
    return `${dir}/**/*.test.js`;
  });
}

const jasmine = new Jasmine();
const files = argv.files ? interpretFiles(argv.files) : DEFAULT_FILES;
jasmine.loadConfig({
  spec_dir: './',
  spec_files: files,

});
jasmine.execute();
