const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ENDPOINT: JSON.stringify('https://social.react.sh/api')
    },
    __DEV__: false
};

module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, '..', 'static'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'letters',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            navigateFallback: '/index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),
        new webpack.DefinePlugin(GLOBALS),
        new WebpackMd5Hash(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                comparisons: false
            },
            output: {
                comments: false,
                ascii_only: true
            },
            sourceMap: false
        }),
        new ExtractTextPlugin('styles.css')
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    { loader: 'css-loader', options: { importLoaders: 1, sourceMap: false } },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: 'url-loader?name=[name].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.ico$/,
                use: 'file-loader?name=[name].[ext]'
            }
        ]
    }
};
