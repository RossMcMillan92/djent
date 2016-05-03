const colors     = require('colors/safe');
const postcss    = require('postcss');
const fs         = require('fs');

const buildCSS = (filename, inputCSSPath, outputCSSPath) => {
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
        console.log(colors.green(`${colors.grey(filename)} finished: ${outputCSSPath} in ${colors.blue(endTime - startTime + 'ms')}`));
    }
    const error = (err, src) =>{
        cleanup(src);
        console.log(colors.red(`${colors.grey(filename)} ERROR: \n ${err}`));
    };

    start();

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
                finish();
            })
            .catch('error', err => error(err, src))

    }
}

module.exports = buildCSS;
