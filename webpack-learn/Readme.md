# Webpack usage
This project covers most of the webpack features.

## Following is covered under this project
- **Webpack Setup and various configurations**
  - Installation and how to run
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
  - *Using Loaders* ([All available loaders](https://webpack.js.org/loaders/json-loader/#install))
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
           options: { // This is optional and available with file-loader
              outputPath: "images" // This will copy the files in /dist/images directory. If this is skipped then files will directly go to /dist/ directory
           }
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
           options: { 
              outputPath: "fonts",
           }
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

  - *Output Management* ([Further Reading](https://webpack.js.org/guides/output-management/))
    - *Auto Generating index.html*
      - Installing [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)

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
    - *Cleaning `/dist/` folder with each build*
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

- **Settings for Development/Production** 
  - *Setting up Mode (Development/Production)* (Reference: [Environment Variables](https://webpack.js.org/guides/environment-variables/))

    1.  Change `webpack.config.js` to return a function rather than returning a JSON object

        Earlier: 

        ```
        module.exports = {
          mode: 'development', 
          entry: {
            app: './src/index.js',
            print: './src/print.js',
           },
        }
        ```

        Later:
        ```
        let webpackOptions = {
          mode: 'development', 
          entry: './src/index.js',
        };

        const getWebpackOptions = (env) => {
          return webpackOptions;
        };

        module.exports = getWebpackOptions
        ```
    2.  Move `mode` to the options function

        ```
        let webpackOptions = {
          entry: './src/index.js',
        };

        const getWebpackOptions = (env) => {

          // const nodeEnv = env.NODE_ENV; Node Environment modes can also be used instead of env.production

          const mode = env && env.production ? "production" : "development";

          webpackOptions.mode = mode; // <----- Moved from "webpackOptions" object

          return webpackOptions;
        };

        module.exports = getWebpackOptions
        ```
    3.  Call `webpack` using `--env.production` option for *production* mode or skip it for *development* mode

        `webpack --config webpack.config.js --env.production`
  - *Using source maps for debugging*(For `devtool` values refer [link](https://webpack.js.org/configuration/devtool/))

    ```
    module.exports = {
      mode: 'development', 
      devtool: 'eval-cheap-source-map', // if this option is skipped then source maps will not get generated
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

- **Optimizations**
  - *Code Splitting*
    - *Using Entry Points (This is more basic and have drawbacks)*
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
          filename: '[name].bundle.js', // Bundles will be outputted by replacing [name] with "app"/"print". Here names will be "app.bundle.js" and "print.bundle.js"
          path: path.resolve(__dirname, "dist"),
        },
        ```
      - To preventing duplicacy of modules between the chunks/bundles use `dependOn` option.

        In this example both "app" and "print" are dependent on a third party module "lodash" which will be loaded in a separate chunk and will be shared among the modules using "dependOn" option.
        ```
        entry: {
          app: { import: "./src/app.js", dependOn: "shared" },
          print: { import: "./src/print.js", dependOn: "shared" },
          shared: "lodash",
        },
        ```
      - Remove duplicacy of modules by using [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)(Available in webpack 4.x and above)

        Add the following into `webpack.config.js`
        
        ```
        optimization: {
          splitChunks: {
            chunks: "all",
          },
        },
        ```

        >  Drawbacks:
        >  1. If there are any duplicated modules between entry chunks they will be included in both bundles unless explicitly split in a shared module
        >  2. It isn't as flexible and can't be used to dynamically split code with the core application logic.
        >  
    - *Dynamic Imports*

      These can be used with files or modules which are required to be loaded on demand or asynchronously
      - *Declare a chunkFileName property in `webpack.config.js`*
        
        ```
        output: {
          filename: "[name].bundle.js",
          chunkFilename: "[name].bundle.js", // <----- Declare the property. Here [name] will be replaced by "webpackChunkName" value declared in the code. Final name will be "vendor~[name].bundle.js"
          path: path.resolve(__dirname, "dist"),
        },
        ```
      - *Import a module using a `webpackChunkName` and module name*

        Note: { default: moduleObj } is required.

        *Using Promise*
        ```
        return import(/* webpackChunkName: "<chunk-name>" */ "<module-name>")
        .then(({ default: moduleObj }) => {
          // code to execute when module is loaded. Module objects will be accessible through "moduleObj"
        })
        .catch((error) => "An error occurred while loading the component");
        ```

        *Using async/await*

        ```
        const { default: moduleObj } = await import(/* webpackChunkName: "<chunk-name>" */ "<module-name>");
        ```
    - [*Prefetch/Preloading a bundle/module*](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)

      To Prefetch
      
      ```
      import(/* webpackPrefetch: true */ 'LoginModal');

      // Above line will get converted to <link rel="prefetch" href="login-modal-chunk.js"> in the html header
      ```

      To Preload

      ```
      import(/* webpackPreload: true */ 'ChartingLibrary');

      // Above line will get converted to <link rel="preload" href="charting-library-chunk.js"> in the html header
      ```
  - [*Bundle Analysis*](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
  - [*Caching*](https://webpack.js.org/guides/caching/)

    This is a performance optimization technique to to ensure files produced by webpack compilation can remain cached unless their content has changed. This ensures our code is separated in a file which when changes is only downloaded by browser except other files. 
    
    This is a three step process:

    1. *Add Content Hash in `webpack.config.js`*

        This leads to having all code files a content hash `main.[contenthash].bundle.js`
        ```
        output: {
          filename: '[name].[contenthash].js', // <---- This file is changed
          path: path.resolve(__dirname, 'dist'),
        },
        ```
    2. *Extract Boilerplate/Runtime code of webpack*

       This leads to creating a separate bundle named `runtime.[contenthash].bundle.js` for webpack runtime code.
       ```
       optimization: {
         runtimeChunk: "single",
       }
       ```
    3. *Separate node_modules in a seperate bundle/cache groups*

        This leads to creating `vendors.[contenthash].bundle.js` file including all node modules
        ```
        optimization: {
          runtimeChunk: "single",
          splitChunks: { // <---- This object is added
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
        }
        ```
    4. *Add module identifiers*

        This ensures that `vendors.[contenthash].bundle.js` name do not change unless a new node module is included.
        ```
        optimization: {
          runtimeChunk: "single",
          moduleIds: 'hashed', // <---- This line is added
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
        },      
        ```

      *Final output*
      - dist files
        >main.[contenthash].bundle.js

        >runtime.[contenthash].bundle.js
        
        >vendors.[contenthash].bundle.js
  - *Minification*
    
    1.  Webpack automatically minifies the code when a production build is generated.
    2.  We can use a custom tool to minify the code. [Terser](https://github.com/terser/terser) is one such tool having a broad support/popularity and multiple options available.

    <u>*Using Terser with TerserWebpackPlugin*</u>
    - Installation

      `npm install terser-webpack-plugin --save-dev`
    - Add terser with default configuration in `webpack.config.js`

      ```
      const TerserWebpackPlugin = require('terser-webpack-plugin');

      module.exports = {
        optimization: {
          minimize: true,
          minimizer: [new TerserWebpackPlugin()],
        },
      };
      ```
  - *Creating Aliases* ([Further Reading](https://webpack.js.org/configuration/resolve/))

    Aliases can be defined for files or modules which have deep nested relative paths.
    
    They can be defined using `resolve` property in `webpack.config.js`.

    - Defining an alias

      ```
      const path = require('path');

      module.exports = {
        //...
        resolve: {
          alias: {
            Utilities: path.resolve(__dirname, 'src/utilities/'), // Here "Utilities" is an alias
            Templates: path.resolve(__dirname, 'src/templates/')
          }
        }
      };
      ```
    - Using an alias

      ```
      import DateUtils from "Utilities/dateUtils";

      const dt = DateUtils.getFormattedDate();
      ```      
  - *Other important optimizations*
    - Remove path info from bundles. This helps in reducing size of the bundles.

      ```
      output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        pathinfo: false, // <--------------
      },
      ```
    - Use the include field to only apply the loader modules that actually need to be transformed by it

      ```
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'), // <------------
        use: ["style-loader", "css-loader"],
      },
      ```
- **React integration**
- **Babel integration**