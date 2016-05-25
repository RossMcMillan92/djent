const watch      = require('node-watch');
const livereload = require('livereload');
const buildJS    = require('./tools/buildJS');
const buildCSS   = require('./tools/buildCSS');

const register = require("babel-register")({
    presets: ["es2015", "stage-0"],
    plugins: ["transform-runtime"],
    babelrc: false
})

const [ node, entryFile, task ] = process.argv;

// // Build JS
// const jsSource     = './src/scripts';
// const jsBuild      = './dist';
// const inputJSPath  = `${jsSource}/app.js`;
// const outputJSPath = `${jsBuild}/app.js`;
// buildJS(inputJSPath, inputJSPath, outputJSPath);
//
// // Build CSS
const cssSource     = './src/styles';
// const cssBuild      = './dist';
// const inputCSSPath  = `${cssSource}/app.sass`;
// const outputCSSPath = `${cssBuild}/app.css`;
// buildCSS(inputCSSPath, inputCSSPath, outputCSSPath);

if (task === 'build') return;

// Tests
const Mocha =  require('mocha');
const fs = require("fs")
const glob = require("glob")
const mocha = new Mocha({
    ui: 'bdd',
});
var testSource = './src/scripts/app/test'

const startTests = (testSource, filename) => {
    const testFiles = (files) => {
        console.log('FILES', files)
        files.forEach((file) => {
            mocha.addFile(file)
        })
        // Run the tests.
        mocha.run(function(failures){
          process.on('exit', function () {
            process.exit(failures);  // exit with non-zero status if there were failures
          });
        });
    }

    if (filename) {
        testFiles([filename]);
        return
    }

    glob(`${testSource}/**/*.js`, null, (er, files) => testFiles(files))
}

// startTests(testSource)

// Watch
// watch(jsSource, (filename) => buildJS(filename, inputJSPath, outputJSPath))
// watch(cssSource, (filename) => buildCSS(filename, inputCSSPath, outputCSSPath))
watch(cssSource, (filename) => startTests(null, filename))

// Livereload
const server = livereload.createServer();
server.watch([outputJSPath, outputCSSPath]);
