const watch      = require('node-watch');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const fs         = require('fs');
const colors     = require('colors/safe');

const jsSource = './assets/js';
const jsBuild  = './assets/build';
const inputJS  = `${jsSource}/script.js`;
const outputJS = `${jsBuild}/app.js`;

const buildJS = (filename) => {
    const cleanup = (src) => {
        src.removeListener('finish', finish);
        src.removeListener('error', error);
    };
    const start = () => {
        console.log(colors.grey(`${filename} changed`));
    }
    const finish = () => {
        console.log(colors.green(`${colors.grey(filename)} finished`));
    }
    const error = (err, src) =>{
        cleanup(src);
        console.log(colors.red(`${colors.grey(filename)} ERROR: \n ${err}`));
    };

    start();

    const src = browserify(inputJS)
        .transform("babelify",
            {
                presets: ["es2015", "stage-0"],
                plugins: ["transform-runtime"],
            }
        )
        .bundle()
        .addListener('error', err => error(err, src))
        .pipe(fs.createWriteStream(outputJS))
        .addListener('finish', finish);

}
buildJS('init');
watch(jsSource, buildJS)
