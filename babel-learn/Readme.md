# Babel Usage Project (CLI Only - No Webpack)

**Install babel core and cli library for basic babel conversion: (Required)**

>*npm install --save-dev @babel/core @babel/cli*

**Install Babel arrow function transformation plugin: (Optional)**

>*npm install --save-dev @babel/plugin-transform-arrow-functions*

#### What is a preset?
- Instead of adding all the plugins we want one by one, we can use a ***preset*** which is just a pre-determined set of plugins.

**Install Babel preset: (Optional but Recommended as it includes all the plugins requried for ES6)**

>*npm install --save-dev @babel/preset-env*

**Install Polyfills (link: https://babeljs.io/docs/en/usage#polyfill) (Deprecated, use Runtime instead)**

>*npm install --save @babel/polyfill*   (Remember: this will go as production dependency)

**To use class properties (instance + static) in your code use  class properties plugin:**

>*Include "@babel/plugin-proposal-class-properties" plugin in babel.config.json or in the cli argument as --plugins=@babel/proposal-class-properties*

*Note: @babel/plugin-proposal-class-properties do not require special installation*

**Minification (Not covered as it is beta as of writing this)**