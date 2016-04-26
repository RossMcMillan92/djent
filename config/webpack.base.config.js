var path = require('path');
var cwd = process.cwd();

module.exports = {
    entry: cwd + '/assets/js/script.js',
    output: {
        path: path.join(cwd, 'build'),
        filename: 'main.js'
    },
    resolve: {
    	extensions: ['', '.js', '.jsx', '.scss'],
        alias: {
            'react': cwd + '/node_modules/react'
        }
    }
}
