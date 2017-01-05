const path         = require('path')
const constants    = require('./constants')
const entryJSFile  = constants.entryJSFile
const outputJSFile = constants.outputJSFile
const buildDir     = constants.buildDir
const cwd          = process.cwd()

module.exports = env => ({
    entry: path.join(cwd, entryJSFile),
    output: {
        path: path.join(cwd, buildDir),
        filename: outputJSFile
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            react: path.join(cwd, 'node_modules/react'),
        },
        modules: [
            'node_modules',
            path.join(cwd, `/src/${env.platform}/`),
            path.join(cwd, `/src/${env.platform}/scripts/`),
            path.join(cwd, `/src/${env.platform}/scripts/app/`),
            path.join(cwd, `/src/${env.platform}/styles/styles/`),
        ]
    }
})
