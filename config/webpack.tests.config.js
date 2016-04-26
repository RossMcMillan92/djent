/**
 * Webpack configuration for test bundling
 * -------------------------------------
 */

var webpack = require('webpack');
var cwd = process.cwd();
var path = require('path');
var TestRunnerPlugin = require('../tools/TestRunnerPlugin.js');


var config = {
    devtool: 'inline-source-map',
    entry: cwd + '/__tests__/index.js',
    output: {
        path: '__built_tests__',
        filename: 'tests.js'
    },
    resolve: {
        root: [
            cwd + '/__tests__/',
            cwd + '/src/generic/',
            cwd + '/src/generic/js/',
            cwd + '/src/generic/styles/',
            cwd + '/src/generic/static/'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader?optional[]=runtime&stage=0'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test: /\.((?!scss|js).)*$/,
                loader: 'file-loader?regExp=([^/]+)\\.(.*)$&name=[1].[ext]'
            }
        ]
    }
};

config.plugins = [
    new TestRunnerPlugin(),
    new webpack.DefinePlugin({
        DEBUG: true,
        VERSION: JSON.stringify(require('../package.json').version)
    })
];

module.exports = config;
