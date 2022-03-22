'use strict';

const getValidatedFlexiConfig = require('@html-next/flexi-config/lib/get-validated-flexi-config');

const LayoutCompiler = require('./lib/layout-compiler');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const commands = require('./lib/commands');

module.exports = {
  name: '@html-next/flexi-layouts',

  included(app, parentAddon) {
    Reflect.apply(this._super.included, this, arguments);

    // Quick fix for add-on nesting
    // https://github.com/aexmachina/ember-cli-sass/blob/v5.3.0/index.js#L73-L75
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && (app.app || app.parent)) {
      app = app.app || app.parent;
    }

    // if app.import and parentAddon are blank, we're probably being consumed by an in-repo-addon
    // or engine, for which the "bust through" technique above does not work.
    if (
      typeof app.import !== 'function' &&
      !parentAddon &&
      app.registry &&
      app.registry.app
    ) {
      app = app.registry.app;
    }

    if (!parentAddon && typeof app.import !== 'function') {
      throw new Error(
        '@html-next/flexi-layouts is being used within another addon or engine and is' +
          ' having trouble registering itself to the parent application.'
      );
    }

    this.app = app;
    return app;
  },

  isDevelopingAddon() {
    return false;
  },

  _flexiConfig: null,
  flexiConfig() {
    if (!this._flexiConfig) {
      this._flexiConfig = getValidatedFlexiConfig(this.project.root);
    }

    return this._flexiConfig;
  },

  config() {
    const org = Reflect.apply(this._super.config, this, arguments);

    org.flexi = this.flexiConfig();
    return org;
  },

  preprocessTree(type, tree) {
    if (type === 'template') {
      if (!tree) {
        throw new Error('No Template Tree is Present');
      }
      const layoutTree = new LayoutCompiler(tree, {
        breakpoints: this.flexiConfig().breakpoints,
      });
      const templateTree = new Funnel(tree, {
        exclude: ['**/-layouts/*.hbs'],
      });
      return mergeTrees([templateTree, layoutTree], { overwrite: true });
    }

    return tree;
  },

  includedCommands() {
    return commands;
  },
};
