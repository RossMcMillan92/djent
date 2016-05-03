const watch      = require('node-watch');
const source     = require('vinyl-source-stream');
const fs         = require('fs');
const colors     = require('colors/safe');
const livereload = require('livereload');
const server     = livereload.createServer();

// Build JS
const buildJS  = require('./tools/buildJS');
const jsSource = './assets/js';
const jsBuild  = './assets/build';
const inputJSPath  = `${jsSource}/script.js`;
const outputJSPath = `${jsBuild}/app.js`;
buildJS(inputJSPath, inputJSPath, outputJSPath);
watch(jsSource, (filename) => buildJS(filename, inputJSPath, outputJSPath))

// Build CSS
const buildCSS  = require('./tools/buildCSS');
const cssSource = './assets/src/styles';
const cssBuild  = './assets/build';
const inputCSSPath  = `${cssSource}/app.css`;
const outputCSSPath = `${cssBuild}/app.css`;
buildCSS(inputCSSPath, inputCSSPath, outputCSSPath);
watch(cssSource, (filename) => buildCSS(filename, inputCSSPath, outputCSSPath))

// Livereload
server.watch([outputJSPath, outputCSSPath]);
