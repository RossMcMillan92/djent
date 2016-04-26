var autoprefixer = require('autoprefixer-core');
var cwd = process.cwd();

module.exports = {
    postcss: [ autoprefixer({ browsers: ['Chrome >= 24'] }) ],
    resolve: {
        root: [
            cwd + '/src/youview/',
            cwd + '/src/youview/js/',
            cwd + '/src/youview/styles/',
            cwd + '/src/youview/static/'
        ],
        fallback: [
            cwd + '/src/generic/',
            cwd + '/src/generic/js/',
            cwd + '/src/generic/styles/',
            cwd + '/src/generic/static/'
        ]
    }
}
