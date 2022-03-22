'use strict';

const getValidatedFlexiConfig = require('@html-next/flexi-config/lib/get-validated-flexi-config');

const LayoutCompiler = require('./lib/layout-compiler');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const commands = require('./lib/commands');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon(...args) {
    if (
      typeof this.parent.name === 'string' &&
      (this.parent.name === 'flexi' ||
        this.parent.name.startsWith('@html-next/flexi-'))
    ) {
      return this.parent.isDevelopingAddon();
    }
    return this._super(...args);
  },

  _flexiConfig: null,
  flexiConfig() {
    if (!this._flexiConfig) {
      this._flexiConfig = getValidatedFlexiConfig(this.project.root);
    }

    return this._flexiConfig;
  },

  config(...args) {
    const config = this._super.config.call(this, ...args);

    config.flexi = this.flexiConfig();
    return config;
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
