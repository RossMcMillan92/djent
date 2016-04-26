/**
 * Webpack configuration for development
 * -------------------------------------
 *
 * This config file is used when running `npm run develop`, and enables features
 * like a development server and hot reloading of both Javascript and Sass
 */

var path = require('path');
var merge = require('deep-extend');
var webpack = require('webpack');

var base = require('./webpack.base.config.js');
var generic = require('./platforms/generic.config.js');

var cwd = process.cwd();

var config = merge(base, generic, {
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot-loader', 'babel'],
                include: path.join(cwd, 'assets'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test: /\.((?!scss|js).)*$/,
                loader: 'file-loader?regExp=([^/]+)\\.(.*)$&name=[1].[ext]'
            },
            {
                test: /\.json$/,
                loader: "json"
            },
        ]
    },
    devServer: {
        inline: true,
        port: 3123,
        publicPath: '/'
    }
});

config.plugins = [
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
