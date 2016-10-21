const constants    = require('./constants');
const entryJSFile  = constants.entryJSFile;
const outputJSFile = constants.outputJSFile;
const buildDir     = constants.buildDir;

const cwd = process.cwd();

module.exports = {
    entry: `${cwd}${entryJSFile}`,
    output: {
        path: `${cwd}${buildDir}`,
        filename: outputJSFile
    },
    resolve: {
    	extensions: ['', '.js', '.jsx', '.scss'],
        alias: {
            'react': cwd + '/node_modules/react'
        },
        root: [
            // cwd + '/src/generic/',
            // cwd + '/src/generic/js/',
            // cwd + '/src/generic/styles/',
            // cwd + '/src/generic/static/'
        ]
    }
}
