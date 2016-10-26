// this is run via "npm test".

import Jasmine from 'jasmine'
import { argv } from 'yargs';
import jsdom from "jsdom";
import "app-module-path/register";

var window = jsdom.jsdom('<html><head></head><body></body></html>').defaultView;

global.window = window;

global.document = window.document;
global.navigator = window.navigator;
const DEFAULT_FILES = [
    "server/**/*.test.js",
    "shared/**/*.test.js",
    "client/**/*.test.js"
];

var jasmine = new Jasmine(),
    files = argv.files ? interpretFiles(argv.files) : DEFAULT_FILES
jasmine.loadConfig({
    "spec_dir": "./",
    "spec_files": files,

});
jasmine.execute();


function interpretFiles(files){
  return argv.files.split(',').map((dir)=>{
    if (/\.test\.js$/.test(dir)){
      return dir;
    } else {
      return `${dir}/**/*.test.js`
    }
  })
}
