'use strict';

const FlexiVariableCompiler = require('./lib/scss-variables-compiler');
const mergeTrees = require('broccoli-merge-trees');
const getValidatedFlexiConfig = require('@html-next/flexi-config/lib/get-validated-flexi-config');
const path = require('path');

module.exports = {
  name: require('./package').name,

  treeForAddonStyles(tree) {
    return mergeTrees(
      [
        tree,
        new FlexiVariableCompiler(path.join(__dirname, 'addon/styles'), getValidatedFlexiConfig(this.project.root)),
      ],
      { overwrite: true }
    );
  },

  isDevelopingAddon(...args) {
    if (
      typeof this.parent.name === 'string' &&
      (this.parent.name === 'flexi' || this.parent.name.startsWith('@html-next/flexi-'))
    ) {
      return this.parent.isDevelopingAddon();
    }
    return this._super(...args);
  },
};
