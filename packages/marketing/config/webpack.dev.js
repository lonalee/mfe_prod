const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    devServer: {
        port:8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing', // like a global variable
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap' 
                // container에서 import문으로 접근하는 경로: 로드할 파일
            },
            shared: packageJson.dependencies

        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig,devConfig)