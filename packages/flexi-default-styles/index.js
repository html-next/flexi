'use strict';

const FlexiVariableCompiler = require('./lib/scss-variables-compiler');
const mergeTrees = require('broccoli-merge-trees');
const getValidatedFlexiConfig = require('@html-next/flexi-config/lib/get-validated-flexi-config');
const path = require('path');

module.exports = {
  name: require('./package').name,

  included(app, parentAddon) {
    this._super.included.apply(this, arguments);

    // Quick fix for add-on nesting
    // https://github.com/aexmachina/ember-cli-sass/blob/v5.3.0/index.js#L73-L75
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && (app.app || app.parent)) {
      app = app.app || app.parent;
    }

    // if app.import and parentAddon are blank, we're probably being consumed by an in-repo-addon
    // or engine, for which the "bust through" technique above does not work.
    if (typeof app.import !== 'function' && !parentAddon) {
      if (app.registry && app.registry.app) {
        app = app.registry.app;
      }
    }

    if (!parentAddon && typeof app.import !== 'function') {
      throw new Error('@html-next/flexi-default-styles is being used within another addon or engine and is'
      + ' having trouble registering itself to the parent application.');
    }

    this.app = app;
    return app;
  },

  treeForAddonStyles(tree) {
    return mergeTrees([
      tree,
      new FlexiVariableCompiler(path.join(__dirname, 'addon/styles'),
        getValidatedFlexiConfig(this.project.root))
    ], { overwrite: true });
  },

  isDevelopingAddon() {
    return false;
  }
};
