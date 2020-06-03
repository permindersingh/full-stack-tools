const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

let webpackOptions = {
  // entry: {
  //   app: "./src/index.js",
  //   print: "./src/print.js",
  // },
  entry: "./src/index.js",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Html Webpack Plugin",
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
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, "src"),
        loader: "file-loader",
        options: {
          outputPath: "fonts",
        },
      },
      {
        test: /\.(csv|tsv)$/,
        include: path.resolve(__dirname, "src"),
        use: ["csv-loader"],
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

// This method simplifies manipulating options based on environment properties
const getWebpackOptions = (env) => {
  const mode = env && env.production ? "production" : "development";

  webpackOptions.mode = mode;

  return webpackOptions;
};

module.exports = getWebpackOptions;
