const watch      = require('node-watch');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const fs         = require('fs');

const jsSource = './assets/js';
const jsBuild  = './assets/build';
const inputJS  = `${jsSource}/script.js`;
const outputJS = `${jsBuild}/app.js`;

const buildJS = (filename) => {
    const src = browserify(inputJS)
        .transform("babelify",
            {
                presets: ["es2015", "stage-0"],
                plugins: ["transform-runtime"],
            }
        )
        .bundle()
        .pipe(fs.createWriteStream(outputJS));

        console.log(filename)

}
buildJS('init');
watch(jsSource, buildJS)
