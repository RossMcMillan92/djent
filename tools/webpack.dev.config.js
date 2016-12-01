const path          = require('path');
const constants     = require('./constants');
const outputCSSFile = constants.outputCSSFile;
const buildDir      = constants.buildDir;
const sourceDir     = constants.sourceDir;

const cwd = process.cwd();

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssExtractor = new ExtractTextPlugin(outputCSSFile);
const CopyWebpackPlugin = require('copy-webpack-plugin');

const base = require('./webpack.base.config.js');

const config = Object.assign({}, base, {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.join(cwd, sourceDir),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-react-jsx', 'external-helpers', 'transform-runtime']
                }
            },
            {
                test: /\.sass$/,
                loader: cssExtractor.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.((?!scss|sass|js|json).)*$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]'
                }
            },
        ]
    },
    devServer: {
        inline: true,
        port: 3002,
        host: '0.0.0.0',
        publicPath: '/',
        contentBase: path.join(cwd, buildDir),
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/scripts/sw/sw.js' },
            { from: 'src/assets', to: 'assets' },
            { from: 'node_modules/sw-toolbox/sw-toolbox.js', to: 'node_modules/sw-toolbox/assets' },
        ]),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development')
        }),
        cssExtractor,
    ],
    postcss: [
        autoprefixer({ browsers: 'last 2 versions, iOS 8' })
    ],
});

module.exports = config;
