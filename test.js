// this is run via "npm test".

import Jasmine from 'jasmine'
import { argv } from 'yargs';
import jsdom from "jsdom";
import app from "app-module-path";

app.addPath(__dirname+"/src/")

var window = jsdom.jsdom('<html><head></head><body></body></html>').defaultView;

global.window = window;

global.document = window.document;
global.navigator = window.navigator;
const DEFAULT_FILES = [
    "src/espina/server/**/*.test.js",
    "src/espina/shared/**/*.test.js",
    "src/espina/client/**/*.test.js"
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
