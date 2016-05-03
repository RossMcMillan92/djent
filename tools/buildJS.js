'use strict';

const colors     = require('colors/safe');
const browserify = require('browserify');
const fs         = require('fs');

const buildJS = (filename, inputJSPath, outputJSPath) => {
    let startTime;
    let endTime;

    const cleanup = (src) => {
        src.removeListener('finish', finish);
        src.removeListener('error', error);
    };
    const start = () => {
        startTime = Date.now();
        console.log(colors.grey(`${filename} compiling`));
    }
    const finish = () => {
        endTime = Date.now();
        console.log(colors.green(`${colors.grey(filename)} finished: ${outputJSPath} in ${colors.blue(endTime - startTime + 'ms')}`));
    }
    const error = (err, src) =>{
        cleanup(src);
        console.log(colors.red(`${colors.grey(filename)} ERROR: \n ${err}`));
    };

    start();

    const src = browserify(inputJSPath)
        .transform("babelify",
            {
                presets: ["es2015", "stage-0"],
                plugins: ["transform-runtime"],
            }
        )
        .bundle()
        .addListener('error', err => error(err, src))
        .pipe(fs.createWriteStream(outputJSPath))
        .addListener('finish', finish);

}

module.exports = buildJS;
