const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const nodeEnv = process.env.NODE_ENV
const isProduction = nodeEnv === 'production'

const sourceDir = '/src'
const buildDir = '/www'
const entryJSFile = `${sourceDir}/generic/scripts/app.js`
const outputJSFile = '[name].[chunkhash].js'
const outputJSFileDev = '[name].js'
const outputCSSFile = 'app.[contenthash].css'
const outputCSSFileDev = 'app.css'
const externalCSS = new ExtractTextPlugin({ filename: isProduction ? outputCSSFile : outputCSSFileDev, disable: false, allChunks: true })
const cwd = process.cwd()

const getModules = platform => [
    path.join(cwd, `/src/${platform}/`),
    path.join(cwd, `/src/${platform}/scripts/`),
    path.join(cwd, `/src/${platform}/scripts/app/`),
    path.join(cwd, `/src/${platform}/styles/styles/`),
]

const config = (env) => {
    const isPhoneGap = env.isPhoneGap === 'true'
    const assetPathPrepend = isPhoneGap
        ? ''
        : '/'

    return {
        entry: {
            main: [
                'react-hot-loader/patch',
                path.join(cwd, entryJSFile)
            ],
            vendorReact: ['react', 'react-dom', 'react-router', 'react-redux', 'redux'],
            vendor: ['immutable-ext', 'ramda-fantasy']
        },
        output: {
            filename: isProduction
                ? outputJSFile
                : outputJSFileDev,
            path: path.join(cwd, buildDir),
            publicPath: assetPathPrepend,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss'],
            alias: {
                react: path.join(cwd, 'node_modules/react'),
            },
            modules: [
                'node_modules',
                ...getModules(env.platform)
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    exclude: /.*node_modules((?!immutable-ext).)*$/,
                },
                {
                    test: /app.sass/,
                    use:  ["css-hot-loader"].concat(
                        externalCSS.extract({ use: 'css-loader!postcss-loader!sass-loader' })
                    ),
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
            compress: isProduction,
            port: 3002,
            host: '0.0.0.0',
            publicPath: '/',
            contentBase: path.join(cwd, buildDir),
            historyApiFallback: true,
            hot: true,
            inline: true,
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
            new webpack.NamedModulesPlugin(),
            new CopyWebpackPlugin([
                { from: 'src/generic/static/config.xml' },
                { from: 'src/generic/static/manifest.json' },
                { from: 'src/generic/scripts/sw.js' },
                { from: 'src/generic/assets', to: 'assets' },
                { from: 'node_modules/sw-toolbox/sw-toolbox.js', to: 'node_modules/sw-toolbox' },
            ]),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(nodeEnv),
                IS_PHONEGAP: JSON.stringify(isPhoneGap),
                'process.env': {
                    NODE_ENV: JSON.stringify(nodeEnv)
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
            new webpack.optimize.ModuleConcatenationPlugin(),
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
                absolutePath: assetPathPrepend,
                isProduction,
                isPhoneGap
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            externalCSS,
            // new BundleAnalyzerPlugin(),
        ],
    }
}
module.exports = config
