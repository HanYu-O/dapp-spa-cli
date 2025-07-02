const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { resolve, join } = require("path");

module.exports = {
  output: {
    path: join(__dirname, "../dist"),
    publicPath: "/",
    filename: "scripts/[name].[contenthash:5].bundle.js",
    assetModuleFilename: "images/[name].[contenthash:5][ext]",
  },

  // 打包体积限制
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: "warning", // 超出限制时只给出警告
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "{{PROJECT_NAME}}",
      filename: "index.html",
      template: resolve(__dirname, "../public/index.html"),
      favicon: resolve(__dirname, "../public/favicon.ico"),
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
          chunks: "all",
        },
      },
    },
  },
};
