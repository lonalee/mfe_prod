const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // 빌드 후 파일명 템플릿
    publicPath: "/container/latest/" // public/index.html 파일에서 main스크립트 참조 위치를 추가해준다
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
      },
      shared : packageJson.dependencies
    }),
  ],
};

module.exports = merge(commonConfig,prodConfig)