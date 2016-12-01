const path         = require('path');
const constants    = require('./constants');
const entryJSFile  = constants.entryJSFile;
const outputJSFile = constants.outputJSFile;
const buildDir     = constants.buildDir;

const cwd = process.cwd();

module.exports = {
    entry: path.join(cwd, entryJSFile),
    output: {
        path: path.join(cwd, buildDir),
        filename: outputJSFile
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        alias: {
            react: path.join(cwd, 'node_modules/react'),
        },
        root: [
            path.join(cwd, '/'),
            path.join(cwd, '/src/'),
            path.join(cwd, '/src/scripts/'),
            path.join(cwd, '/src/scripts/app/'),
            path.join(cwd, '/src/styles/styles/'),
        ]
    }
};
