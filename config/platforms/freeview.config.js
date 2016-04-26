var autoprefixer = require('autoprefixer-core');
var cwd = process.cwd();

module.exports = {
    postcss: [ autoprefixer({ browsers: ['last 10 versions'] }) ],
    resolve: {
        root: [
            cwd + '/src/freeview/',
            cwd + '/src/freeview/js/',
            cwd + '/src/freeview/styles/',
            cwd + '/src/freeview/static/'
        ],
        fallback: [
            cwd + '/src/generic/',
            cwd + '/src/generic/js/',
            cwd + '/src/generic/styles/',
            cwd + '/src/generic/static/'
        ]
    }
}
