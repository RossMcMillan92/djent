const path              = require('path')
const constants         = require('./constants')
const webpack           = require('webpack')
const autoprefixer      = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base              = require('./webpack.base.config.js')

const outputCSSFile = constants.outputCSSFile
const cssExtractor = new ExtractTextPlugin({ filename: outputCSSFile, disable: false, allChunks: true })

const config = env =>
    Object.assign({}, base(env), {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /.*node_modules((?!immutable-ext).)*$/,
                },
                {
                    test: /\.sass$/,
                    loader: cssExtractor.extract({ loader: 'css-loader!postcss-loader!sass-loader' }),
                },
                {
                    test: /\.((?!scss|sass|js|json).)*$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        minimize: true,
                    }
                },
            ]
        },
        externals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/generic/static/manifest.json' },
                { from: 'src/generic/scripts/sw/sw.js' },
                { from: 'src/generic/assets', to: 'assets' },
                { from: 'node_modules/sw-toolbox/sw-toolbox.js', to: 'node_modules/sw-toolbox' },
            ]),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify('production'),
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
                options: {
                    postcss: [
                        autoprefixer({
                            browsers: ['last 2 version', 'iOS 8']
                        })
                    ]
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false
                },
            }),
            cssExtractor,
        ],
    })

module.exports = config
