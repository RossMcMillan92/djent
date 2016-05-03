'use strict';

const postcss    = require('postcss');
const fs         = require('fs');
const events    = require('./events');

const buildCSS = (filename, inputCSSPath, outputCSSPath) => {
    const startTime = events.onStart(filename);

    const rr = fs.createReadStream(inputCSSPath);
    rr.on('readable', () => {
        const css = rr.read();
        if(!css) return;
        startBuild(css.toString());
    });

    const startBuild = (cssString) => {
        const src = postcss([ require('postcss-cssnext') ])
            .process(cssString, { from: inputCSSPath, to: outputCSSPath })
            .then(function (result) {
                fs.writeFileSync(outputCSSPath, result.css);
                if ( result.map ) fs.writeFileSync('app.css.map', result.map);
                events.onFinish(filename, outputCSSPath, startTime);
            })
            .catch('error', err => events.onError(err, src))

    }
}

module.exports = buildCSS;
