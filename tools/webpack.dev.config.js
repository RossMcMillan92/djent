const autoprefixer               = require('autoprefixer')
const path                       = require('path')
const constants                  = require('./constants')
const webpack                    = require('webpack')
const ExtractTextPlugin          = require('extract-text-webpack-plugin')
const CopyWebpackPlugin          = require('copy-webpack-plugin')
const base                       = require('./webpack.base.config.js')
const HtmlWebpackPlugin          = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const outputCSSFile = constants.outputCSSFile
const buildDir      = constants.buildDir

const cwd = process.cwd()
const cssExtractor = new ExtractTextPlugin(outputCSSFile)

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
        devServer: {
            inline: false,
            compress: false,
            port: 3002,
            host: '0.0.0.0',
            publicPath: '/',
            contentBase: path.join(cwd, buildDir),
            historyApiFallback: true,
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                }
            },
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/generic/static/manifest.json' },
                { from: 'src/generic/scripts/sw/sw.js' },
                { from: 'src/generic/assets', to: 'assets' },
                { from: 'node_modules/sw-toolbox/sw-toolbox.js', to: 'node_modules/sw-toolbox/assets' },
            ]),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify('development'),
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [
                        autoprefixer({
                            browsers: ['last 2 version', 'iOS 8']
                        })
                    ]
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'vendorReact', 'manifest']
            }),
            new HtmlWebpackPlugin({
                template: './src/generic/static/index.ejs',
                inject: 'body',
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            cssExtractor,
        ],
    })

module.exports = config
