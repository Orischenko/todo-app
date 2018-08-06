const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
    entry: './packages/app/src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    devServer: {
        overlay: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node-modules/',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './packages/app/src/index.html'
        })
        // new webpack.ProvidePlugin({
        //     'Promise': 'bluebird',
        //     'fetch': 'bluebird'
        // })
    ]
};

module.exports = (env, options) => {
    const prod = options.mode === 'production';
    conf.devtool = prod ? 'source-map' : 'eval-source-map';
    return conf;
};