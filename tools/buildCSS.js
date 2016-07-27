'use strict';

const sass     = require('node-sass');
const postcss  = require('postcss');
const fs       = require('fs');
const events   = require('./events');
const atImport = require('postcss-import')

const buildCSS = (filename, inputCSSPath, outputCSSPath, isMinified) => {
    const startTime = events.onStart(filename);

    sass.render({
        file        : inputCSSPath,
        outFile     : outputCSSPath,
        outputStyle : isMinified ? 'compressed' : 'nested',
    }, (error, result) => {
            if(!error){
                // No errors during the compilation, write this result on the disk
                return startPostCSS(result.css);
            }

            return events.onError(`File: ${error.file}:${error.line} \n ${error.message}`);
        }
    );

    const startPostCSS = (cssString) => {
        const src = postcss([ require('postcss-cssnext')({ browsers: 'last 2 versions, iOS 8' }) ])
            .process(cssString, { from: inputCSSPath, to: outputCSSPath, browsers: 'last 2 versions, iOS 8' })
            .then(function (result) {
                fs.writeFileSync(outputCSSPath, result.css);
                if ( result.map ) fs.writeFileSync('app.css.map', result.map);
                events.onFinish(filename, outputCSSPath, startTime);
            })
            .catch('error', err => events.onError(err, src))
    }
}

module.exports = buildCSS;
