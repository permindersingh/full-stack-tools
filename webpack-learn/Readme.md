# Webpack usage
This project covers most of the webpack features.

### Following is covered under this project
- *Basic Webpack Installation and Configuration*
  - *Installation and default execution*
    - Add webpack to a project
  
      `npm install webpack webpack-cli --save-dev`
    - Running webpack from command line
      
      `npx webpack`
    - Running webpack with a configuration file from command line
      
      ```
      // contents of webpack.config.js 
      const path = require('path');

      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'main.js',
          path: path.resolve(__dirname, 'dist'),
        },
      };
      ```
      if we are using webpack.config.js name for config file then we do not need to give `--config` parameter
      
      `npx webpack --config webpack.config.js` 
  - *Running from npm with entry in `package.json`*
    - Add and entry in `package.json`
        ```
        "scripts": {
            "build": "webpack --config webpack.config.js"
        },
        ```
    - Run using npm
      
      `npm run build`
- *Loaders* ([All available loaders](https://webpack.js.org/loaders/json-loader/#install))
  - Loading CSS
    - Install loaders (Style and CSS)

      `npm install --save-dev style-loader css-loader`
    - Add entry in config file for loaders (Yes, we need to use config file if we are using loaders or else it has to be done through command line)

      ```
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      ```
  - Loading Images
    - Install loader

      `npm install --save-dev file-loader`
    - Add entry in config file under module -> rules array

      ```
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader',
         ],
      },
      ```
  - Loading Fonts
    - Install loader (Same file-loader is used as used for images so refer installtion step above)
    - Add entry in config file under module -> rules array (you can add the file extensions in image rule but it is better to create a separate rule for readability)

      ```
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader',
         ],
      },
      ```
  - Loading Data (JSON Files, CSVs, TSVs, and XML)
    - Install loader (Taking example of CSVs. For JSON starting Webpack 2.x we do not need a loader they are automatically parsed)

      `npm install --save-dev csv-loader`
    - Add entry in config file under module -> rules array

      ```
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ]
      }
      ```
- [*Customizing Output*](https://webpack.js.org/guides/output-management/)
  - *Generating Multiple Bundles*
    - Add aliases in `entry` property in `webpack.config.js`

      ```
      entry: {
        app: "./src/index.js",
        print: "./src/print.js",
      },
      ```
    - Change output `filename` based on the alias

      ```
      output: {
        filename: '[name].bundle.js', // This entry is changed where [name] will be replaced with "app" and "print" while generating bundles
        path: path.resolve(__dirname, "dist"),
      },
      ```
  - *Auto Generating index.html*
    - Installing HtmlWebpackPlugin

      `npm install --save-dev html-webpack-plugin`
    - Adding entries in `webpack.config.js`

      ```
      // import plugin
      const HtmlWebpackPlugin = require('html-webpack-plugin');

      // Add a plugins entry
      module.exports = {
        entry: {
          app: './src/index.js',
          print: './src/print.js',
        },
        plugins: [ // This is the entry which needs to be done
          new HtmlWebpackPlugin({
            title: 'Output Management',
          }),
        ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist'),
        },
      };
      ```
  - *Cleanup `/dist/` folder*
    - Install Plugin

      `npm install --save-dev clean-webpack-plugin`
    - Adding entries in `webpack.config.js`

      ```
      // import plugin
      const { CleanWebpackPlugin } = require('clean-webpack-plugin');

      // Add a plugins entry
      module.exports = {
        entry: {
          app: './src/index.js',
          print: './src/print.js',
        },
        plugins: [ 
          new CleanWebpackPlugin(), // This is the entry which needs to be done
          new HtmlWebpackPlugin({
            title: 'Output Management',
          }),
        ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist'),
        },
      };
      ```
- *Development Settings*
  - *Setting Mode (Development/Production)*

    ```
    module.exports = {
      mode: 'development', // if this mode is skipped then default is 'production'
      entry: {
        app: './src/index.js',
        print: './src/print.js',
      },
    ```
  - *Using source maps for debugging*

    ```
    module.exports = {
      mode: 'development', 
      devtool: 'inline-source-map', // if this option is skipped then source maps will not get generated
      entry: {
        app: './src/index.js',
        print: './src/print.js',
      },
    ```
  - *Using Watch Mode while running webpack(But, this requires a browser page refresh after a change in any file)*

    - Change `package.json`
      ```
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "watch": "webpack --config webpack.config.js --watch",
        "build": "webpack --config webpack.config.js"
      },
      ```
      *Note: if you do not want to regenerate index.html each time then add `cleanStaleWebpackAssets: false` to CleanWebpackPlugin*

      `new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),`
  - *Using webpack-dev-server (This refreshes the browser as well and is a better option than --watch option)*
    - Installation

      `npm install --save-dev webpack-dev-server`
    - Change `webpack.config.js` settings

      This tells `webpack-dev-server` to serve the files from the `dist` directory on `localhost:8080`
      ```
      module.exports = {
        mode: 'development',
        entry: {
          app: './src/index.js',
          print: './src/print.js',
        },
        devtool: 'inline-source-map',
        devServer: {   //  <------- Add this entry
          contentBase: './dist',
        },
      ```
    - Change `package.json` to run the server

      ```
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "watch": "webpack --config webpack.config.js --watch",
        "start": "webpack-dev-server --open",
        "build": "webpack --config webpack.config.js"
      },
      ```
  - [*Using webpack-dev-middleware*](https://webpack.js.org/guides/development/#using-webpack-dev-middleware) (Check this link for example implementation)

    `webpack-dev-middleware` is a wrapper that will emit files processed by webpack to a location from where files are served by a webserver. This is used in `webpack-dev-server` internally, however it's available as a separate package to allow more custom setups if desired.  

    - Installation

      `npm install --save-dev webpack-dev-middleware`
    - Changes in `webpack.config.js`

      ```
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // <------- This is the entry
      },
      ```
- *Code Splitting*
- *Minification*
- *Aliases*
- *React integration*
- *Babel integration*