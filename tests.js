const register = require("babel-register")({
    presets: ["es2015", "stage-0"],
    plugins: ["transform-runtime"],
    babelrc: false
});
const Mocha = require('mocha');
const fs    = require("fs");
const glob  = require("glob");
const mocha = new Mocha({
    ui: 'bdd',
});

const startTests = (testSource, filename) => {
    const testFiles = (files) => {
        files.forEach((file) => mocha.addFile(file));
        mocha.run((failures) => process.exit(failures));
    }

    glob(`${testSource}/**/*.js`, null, (er, files) => testFiles(files));
}

const testSource = './src/scripts/app/test';
startTests(testSource);
