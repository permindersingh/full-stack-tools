const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

let webpackOptions = {
  entry: "./src/react-hot/index.js",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack React with Babel Hot Module Replacement Integration",
      template: "./src/react-hot/index.ejs",
    }),
  ],
  output: {
    // filename is declared based on development mode in webpack options function
    path: path.resolve(__dirname, "dist"),
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
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

// webpack options function
const getWebpackOptions = () => {
  const mode = process.env.NODE_ENV || "development";
  const chunk = mode === "production" ? "[chunkhash]" : "[hash]";

  webpackOptions.mode = mode;
  webpackOptions.output.filename = `[name].${chunk}.bundle.js`;

  console.log("------------------------------------");
  console.log(`MODE: ${mode}\nFILENAME: ${webpackOptions.output.filename} \n`);
  console.log("------------------------------------");

  return webpackOptions;
};

module.exports = getWebpackOptions;
