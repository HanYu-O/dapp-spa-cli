const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";

const isDevelopment = _mode === "development";

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename:
      "scripts/" + (isDevelopment ? "[name].js" : "[name].[contenthash].js"),
    assetModuleFilename: "images/[name].[ext]",
    clean: true,
    publicPath: "/",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: path.resolve(__dirname, "./public/favicon.ico"),
      template: path.resolve(__dirname, "./public/index.html"),
      title: "{{PROJECT_NAME}}",
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? "css/[name].css"
        : "css/[name].[contenthash:8].css",
      chunkFilename: isDevelopment
        ? "css/[name].css"
        : "css/[name].[contenthash:8].css",
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
  ],

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true,
  },

  devtool: isDevelopment ? "eval-source-map" : "source-map",
};
