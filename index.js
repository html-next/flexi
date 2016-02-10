/* jshint node: true */
'use strict';
var LayoutCompiler = require('./lib/layout-compiler');
var mergeTrees = require('broccoli-merge-trees');
// var log = require('broccoli-stew').log;
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'flexi',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this._trueApp = app;
    return app;
  },

  isDevelopingAddon: function() {
    return true;
  },

  setupPreprocessorRegistry: function(type, registry) {
    var AttributeConversion = require('./htmlbars-plugins/attribute-conversion');
    var ComponentConversion = require('./htmlbars-plugins/component-conversion');
    var SustainConversion = require('./htmlbars-plugins/sustain-conversion');

    registry.add('htmlbars-ast-plugin', {
      name: "flexi-attribute-conversion",
      plugin: AttributeConversion
    });

    registry.add('htmlbars-ast-plugin', {
      name: "flexi-component-conversion",
      plugin: ComponentConversion
    });

    registry.add('htmlbars-ast-plugin', {
      name: "flexi-sustain-conversion",
      plugin: SustainConversion
    });

  },

  preprocessTree: function(type, tree) {
    if (type === 'template') {
      if (!tree) {
        throw new Error("No Template Tree is Present");
      }
      var layoutTree = new LayoutCompiler(tree);
      var templateTree = new Funnel(tree, {
        exclude: ['**/layouts/*.hbs']
      });
      return mergeTrees([templateTree, layoutTree], { overwrite: true });
    }

    return tree;
  }

};
