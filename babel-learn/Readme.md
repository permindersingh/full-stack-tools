# Babel usage (CLI Only - No Webpack)

- **Core Libraries and Plugins**

  - _Install `@babel/core` and `@babel/cli` libraries for basic babel conversion: (Required)_

    `npm install --save-dev @babel/core @babel/cli`

  - _Install Babel arrow function transformation plugin: (Optional)_

    `npm install --save-dev @babel/plugin-transform-arrow-functions`

  - _To use class properties (instance + static) in your code use properties plugin:_

    > _Note: @babel/plugin-proposal-class-properties do not require special installation_

    - Include plugin in `babel.config.js`

      ```
      {
          "plugins": ["@babel/plugin-proposal-class-properties"] <------- This is added
      }
      ```

    - Alternatively you can include the plugin as a cli argument as `--plugins=@babel/proposal-class-properties`

- **Presets**

  > **What is a preset?**
  >
  > Instead of adding all the plugins one by one, we can use a **_preset_** which is a  pre-determined set of plugins voiding the need of installing plugins one by one required for transpiling.

  - _Installing Babel preset: (Optional but Recommended as it includes all the plugins requried for ES6)_

    `npm install --save-dev @babel/preset-env`

  - _Adding in `babel.config.js`_

    ```
    {
        "presets": ["@babel/preset-env"], <---- This is added
        "plugins": ["@babel/plugin-proposal-class-properties"]
    }
    ```

- **Installing Polyfills (link: https://babeljs.io/docs/en/usage#polyfill)**

  > Polyfills are deprecated, use Runtime instead.

  `npm install --save @babel/polyfill` (Remember: this will go as production dependency)

- **Using [Runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) Plugin**

  - Install Development dependency

    `npm install --save-dev @babel/plugin-transform-runtime`

  - Install production dependency

    `npm install --save @babel/runtime`

  - Add it in `babel.config.js`

    ```
    {
        "presets": ["@babel/preset-env"],
        "plugins": [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime" <------- This line is added
        ]
    }
    ```

* **Minification (Not covered as it is in beta as of this writing)**
