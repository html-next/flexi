/* jshint node: true */
'use strict';
var LayoutCompiler = require('./lib/layout-compiler');
var mergeTrees = require('broccoli-merge-trees');
// var log = require('broccoli-stew').log;
var Funnel = require('broccoli-funnel');
var path = require('path');
var fs = require('fs');

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

  config(env, config) {
    this._super.config.apply(this, arguments);

    var configPath = path.join(this.project.root, 'config', 'flexi.js');

    if ((!this.app.options || !this.app.options.flexi) && fs.existsSync(configPath)) {
      var flexiConfig = require(configPath);
      this.app.options = this.app.options || {};
      this.app.options.flexi = flexiConfig;
      config.APP.flexi = this.app.options.flexi;
    }

  },

  setupPreprocessorRegistry: function(type, registry) {
    var AttributeConversion = require('./htmlbars-plugins/attribute-conversion');
    var ComponentConversion = require('./htmlbars-plugins/component-conversion');
    var SustainConversion = require('./htmlbars-plugins/sustain-conversion');

    AttributeConversion.LayoutSizes = getLayoutSizes(this.app.options.flexi.breakpoints);

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
      var layoutTree = new LayoutCompiler(tree, { breakpoints: this.app.options.flexi.breakpoints });
      var templateTree = new Funnel(tree, {
        exclude: ['**/layouts/*.hbs']
      });
      return mergeTrees([templateTree, layoutTree], { overwrite: true });
    }

    return tree;
  }

};

function getLayoutSizes(breakpoints) {
  return breakpoints.map(function(bp) {
    return bp.prefix;
  });
}
