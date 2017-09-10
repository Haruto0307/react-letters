const { join } = require('path');
const webpack = require('webpack');
const uuid = require('uuid/v4');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
    'process.env': {
        NODE_ENV: JSON.stringify('development'),
        ENDPOINT: JSON.stringify('http://localhost:3500'),
        RIA_SENTRY_APP: JSON.stringify('https://23f0e00b78a24ac88450c8261b59ed7c@sentry.io/212515'),
        GOOGLE_API_KEY: JSON.stringify('AIzaSyDBosKGKi-BI9Z8vftAwkBRQlSDDNE8PvM'),
        FIREBASE_AUTH_DOMAIN: JSON.stringify('letters-social.firebaseapp.com'),
        MAPBOX_API_TOKEN: JSON.stringify(
            'pk.eyJ1IjoibWFya3RoZXRob21hcyIsImEiOiJHa3JyZFFjIn0.MwCj8OA5q4dqdll1s2kMiw'
        )
    }
};

module.exports = {
    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,
        compress: true,
        port: 3000,
        // open: true,
        overlay: true
    },
    devtool: 'source-map',
    entry: ['./src/index'],
    cache: true,
    target: 'web',
    output: {
        path: `${__dirname}/lib`,
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            // Create HTML file that includes references to bundled CSS and JS.
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(eot|svg|woff|woff2|otf|ttf)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.js$/,
                include: join(__dirname, '../', 'src'),
                loader: 'babel-loader'
            },
            { test: /\.(jpe?g|png|gif)$/i, loaders: ['file-loader'] },
            { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /(\.css|\.scss)$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    }
};
