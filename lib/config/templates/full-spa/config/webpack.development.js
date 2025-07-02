const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const port = 3000;

module.exports = {
  output: {
    publicPath: "/",
    filename: "scripts/[name].bundle.js",
    assetModuleFilename: "images/[name].[ext]",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: resolve(__dirname, "../public/favicon.ico"),
      template: resolve(__dirname, "../public/index.html"),
    }),
    // {{FRIENDLY_ERRORS_PLUGIN}} - 友好错误提示插件位置
  ],

  devServer: {
    historyApiFallback: true, // 解决 react-router 404 问题，当路由匹配不到时，会返回 index.html 文件
    static: {
      directory: resolve(__dirname, "../dist"),
    },
    hot: true, // 热更新
    port,
  },
};
