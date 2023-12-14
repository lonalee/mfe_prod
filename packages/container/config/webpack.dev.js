const {merge} = require('webpack-merge');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    devServer: {
        port:8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [

        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js' 
                // marketing 프로젝트의 webpack dev config에서 정의한 name- marketing
            },
            shared: packageJson.dependencies
        }),

    ]
}

module.exports = merge(commonConfig,devConfig)