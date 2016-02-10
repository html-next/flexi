/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var modifyEmberApp = require('./lib/modify-ember-app');

module.exports = function(defaults) {

  modifyEmberApp(require('ember-cli/lib/broccoli/ember-app'));

  var app = new EmberAddon(defaults, {
    // Add options here
    sassOptions: {},
    hinting: false
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
