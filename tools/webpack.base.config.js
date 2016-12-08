const path         = require('path');
const constants    = require('./constants');
const options      = require('minimist')(process.argv.slice(2), { default: { platform: 'generic' } });
const entryJSFile  = constants.entryJSFile;
const outputJSFile = constants.outputJSFile;
const buildDir     = constants.buildDir;
const cwd          = process.cwd();

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
            path.join(cwd, `/src/${options.platform}/`),
            path.join(cwd, `/src/${options.platform}/scripts/`),
            path.join(cwd, `/src/${options.platform}/scripts/app/`),
            path.join(cwd, `/src/${options.platform}/styles/styles/`),
        ],
        fallback: [
            path.join(cwd, '/src/generic/'),
            path.join(cwd, '/src/generic/scripts/'),
            path.join(cwd, '/src/generic/scripts/app/'),
            path.join(cwd, '/src/generic/styles/styles/'),
        ]
    }
};
