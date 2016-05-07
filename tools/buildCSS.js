'use strict';

const sass     = require('node-sass');
const fs       = require('fs');
const events   = require('./events');
const atImport = require('postcss-import')

const buildCSS = (filename, inputCSSPath, outputCSSPath) => {
    const startTime = events.onStart(filename);

    sass.render({
        file        : inputCSSPath,
        outFile     : outputCSSPath,
        outputStyle : 'nested',
    }, (error, result) => {
            if(!error){
                // No errors during the compilation, write this result on the disk
                return fs.writeFile(outputCSSPath, result.css, function(err){
                    if(!err){
                        return events.onFinish(filename, outputCSSPath, startTime);
                    }
                });
            }

            return events.onError(`File: ${error.file}:${error.line} \n ${error.message}`);
        }
    );
}

module.exports = buildCSS;
