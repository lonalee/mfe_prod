const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output:{
    publicPath: 'http://localhost:8082/'
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard", // like a global variable
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
        // container에서 import문으로 접근하는 경로: 로드할 파일
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
  rules: [
    {
      test: /\.mdx?$/,
      use: [
        {
          loader: "@mdx-js/loader",
          options: {},
        },
      ],
    },
  ]}
};

module.exports = merge(commonConfig, devConfig);
