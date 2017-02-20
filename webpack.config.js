const path                       = require('path')
const webpack                    = require('webpack')
const autoprefixer               = require('autoprefixer')
const ExtractTextPlugin          = require('extract-text-webpack-plugin')
const CopyWebpackPlugin          = require('copy-webpack-plugin')
const HtmlWebpackPlugin          = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const LiveReloadPlugin           = require('webpack-livereload-plugin');

const sourceDir     = '/src'
const buildDir      = '/www'
const entryJSFile   = `${sourceDir}/generic/scripts/app.js`
const outputCSSFile = 'app.[contenthash].css'

const cssExtractor  = new ExtractTextPlugin({ filename: outputCSSFile, disable: false, allChunks: true })
const cwd           = process.cwd()

const config = (env) => {
    const isPhoneGap = env.isPhoneGap === 'true'
    const isProduction = env.isProduction === 'true'
    const environment = isProduction
        ? 'production'
        : 'development'

    return Object.assign({}, {
        entry: {
            main: path.join(cwd, entryJSFile),
            vendorReact: ['react', 'react-dom', 'react-router', 'react-redux', 'redux'],
            vendor: ['immutable-ext', 'ramda-fantasy']
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.join(cwd, buildDir),
            publicPath: isPhoneGap ? '' : '/',
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
        },
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
                { from: 'src/generic/static/config.xml' },
                { from: 'src/generic/static/manifest.json' },
                { from: 'src/generic/scripts/sw.js' },
                { from: 'src/generic/assets', to: 'assets' },
                { from: 'node_modules/sw-toolbox/sw-toolbox.js', to: 'node_modules/sw-toolbox' },
            ]),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(environment),
                'process.env': {
                    NODE_ENV: JSON.stringify(environment)
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: !isProduction,
                options: {
                    postcss: [
                        autoprefixer({
                            browsers: ['last 2 version', 'iOS 8']
                        })
                    ]
                }
            }),
            isProduction
                ? new webpack.optimize.UglifyJsPlugin({
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
                })
                : x => x,
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'vendorReact', 'manifest']
            }),
            new HtmlWebpackPlugin({
                template: './src/generic/static/index.ejs',
                inject: 'body',
                absolutePath: isPhoneGap ? '' : '/',
                isProduction,
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new LiveReloadPlugin({
                appendScriptTag: true
            }),
            cssExtractor,
        ],
    })
}
module.exports = config
