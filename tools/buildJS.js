'use strict';

const browserify = require('browserify');
const fs         = require('fs');
const events    = require('./events');

const buildJS = (filename, inputJSPath, outputJSPath) => {
    const startTime = events.onStart(filename);

    const src = browserify(inputJSPath)
        .transform("babelify",
            {
                presets: ["es2015", "stage-0"],
                plugins: ["transform-runtime"],
            }
        )
        .bundle()
        .addListener('error', err => events.onError(err, src))
        .pipe(fs.createWriteStream(outputJSPath))
        .addListener('finish', () => events.onFinish(filename, outputJSPath, startTime));

}

module.exports = buildJS;
