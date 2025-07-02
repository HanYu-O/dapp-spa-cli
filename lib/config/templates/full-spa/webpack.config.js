const { merge } = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDevelopment = _mode === "development";

// 基础 webpack 配置
const webpackBaseConfig = {
  entry: {
    main: resolve(__dirname, "src/index.tsx"),
  },

  output: {
    path: resolve(__dirname, "dist"),
    clean: true,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@pages": resolve(__dirname, "src/pages"),
      "@routes": resolve(__dirname, "src/routes"),
      "@store": resolve(__dirname, "src/store"),
      "@types": resolve(__dirname, "src/types"),
      "@utils": resolve(__dirname, "src/utils"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx", ".css"],
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
          // {{POSTCSS_LOADER}} - PostCSS加载器位置（TailwindCSS需要）
        ],
      },
    ],
  },

  plugins: [
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
    // {{PROGRESS_BAR_PLUGIN}} - 构建进度显示插件位置
    // {{BUNDLE_ANALYZER_PLUGIN}} - Bundle分析插件位置
  ],

  devtool: isDevelopment ? "eval-source-map" : "source-map",
};

module.exports = merge(webpackBaseConfig, _mergeConfig);
