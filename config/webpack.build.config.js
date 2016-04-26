/**
 * Webpack configuration for production
 * ------------------------------------
 *
 * This config file is used when running `npm run build`. It does not start a
 * development server, and instead creates two output files:
 * - /build/main.js
 * - /build/main.css
 */

var path = require('path');
var merge = require('deep-extend');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var base = require('./webpack.base.config.js');
var platform = require('./platform-config.js');

var cwd = process.cwd();
var cssExtractor = new ExtractTextPlugin('main.css');

var config = merge(base, platform, {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader?optional[]=runtime&stage=0'],
                include: path.join(cwd, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: cssExtractor.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            },
            {
                test: /\.((?!scss|js).)*$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.json$/,
                loader: "json"
            },
        ]
    }
});

config.plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    cssExtractor,
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('../package.json').version),
        "process.env": {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
];

module.exports = config;
