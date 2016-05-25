const watch      = require('node-watch');
const livereload = require('livereload');
const buildJS    = require('./tools/buildJS');
const buildCSS   = require('./tools/buildCSS');

const [ node, entryFile, task ] = process.argv;

// Build JS
const jsSource     = './src/scripts';
const jsBuild      = './dist';
const inputJSPath  = `${jsSource}/app.js`;
const outputJSPath = `${jsBuild}/app.js`;
buildJS(inputJSPath, inputJSPath, outputJSPath);

// Build CSS
const cssSource     = './src/styles';
const cssBuild      = './dist';
const inputCSSPath  = `${cssSource}/app.sass`;
const outputCSSPath = `${cssBuild}/app.css`;
buildCSS(inputCSSPath, inputCSSPath, outputCSSPath);

if (task === 'build') return;

// Watch
watch(jsSource, (filename) => buildJS(filename, inputJSPath, outputJSPath))
watch(cssSource, (filename) => buildCSS(filename, inputCSSPath, outputCSSPath))

// Livereload
const server = livereload.createServer();
server.watch([outputJSPath, outputCSSPath]);
