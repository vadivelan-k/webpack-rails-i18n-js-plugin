var WebpackRailsI18nJS = require('../');
var path = require('path');

module.exports = function (options) {
  var browser = options.browser;

  return {
    entry: path.join(browser ? 'mocha!' : '', __dirname, '/translate_spec.js'),
    devtool: 'eval',
    plugins: [
        new WebpackRailsI18nJS({
          defaultLocale: 'en',
          localesPath: path.join(__dirname, 'locales')
        })
    ]
  }
};
