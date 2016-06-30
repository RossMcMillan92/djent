const watch      = require('node-watch');
const livereload = require('livereload');
const buildJS    = require('./tools/buildJS');
const buildCSS   = require('./tools/buildCSS');

const [ node, entryFile, task ] = process.argv;
const isBuild = task === 'build';

process.env.NODE_ENV = isBuild ? 'production' : 'development';

// Build JS
const jsSource     = './src/scripts';
const jsBuild      = './dist';
const inputJSPath  = `${jsSource}/app.js`;
const outputJSPath = `${jsBuild}/app.min.js`;
buildJS(inputJSPath, inputJSPath, outputJSPath, isBuild);

// Build CSS
const cssSource     = './src/styles';
const cssBuild      = './dist';
const inputCSSPath  = `${cssSource}/app.sass`;
const outputCSSPath = `${cssBuild}/app.css`;
buildCSS(inputCSSPath, inputCSSPath, outputCSSPath, isBuild);

if (isBuild) return;

// Watch
watch(jsSource, (filename) => buildJS(filename, inputJSPath, outputJSPath))
watch(cssSource, (filename) => buildCSS(filename, inputCSSPath, outputCSSPath))

// Livereload
const server = livereload.createServer();
server
    .watch([outputJSPath, outputCSSPath])
    .on('change', (filename) => {
        console.log(`Reloaded: ${filename}`)
    });;
