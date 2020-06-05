const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

let webpackOptions = {
  entry: "./src/babel/index.js",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack Babel Integration",
    }),
  ],
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: "hashed",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
};

const getWebpackOptions = (env) => {
  const mode = env && env.production ? "production" : "development";

  webpackOptions.mode = mode;

  return webpackOptions;
};

module.exports = getWebpackOptions;
