/* jshint node: true */
/* global require */
'use strict';

var LayoutCompiler = require('./lib/layout-compiler');
var compileScssVariables = require('./lib/scss-variables-compiler');
var mergeTrees = require('broccoli-merge-trees');
// var log = require('broccoli-stew').log;
var Funnel = require('broccoli-funnel');
var path = require('path');
var fs = require('fs');
var commands = require('./lib/commands');

var AttributeConversion = require('./dsl/attribute-conversion');
var ComponentConversion = require('./dsl/component-conversion');
var SustainConversion = require('./dsl/sustain-conversion');

function assert(statement, test) {
  if (!test) {
    throw new Error(statement);
  }
}

module.exports = {
  name: 'flexi',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    var pathBase = this.project.addonPackages.flexi.path;
    compileScssVariables(path.join(pathBase, 'addon/styles'), this.flexiConfig());

    this.app = app;
    return app;
  },

  isDevelopingAddon: function() {
    return true;
  },

  _flexiConfig: null,
  flexiConfig: function() {
    if (!this._flexiConfig) {
      var configPath = path.join(this.project.root, 'config', 'flexi.js');
      if (fs.existsSync(configPath)) {
        this._flexiConfig = require(configPath);

        assert("config/flexi.js is defined, but could not be imported", this._flexiConfig);
        assert("config/flexi.js is defined, but did not contain property [array] breakpoints", this._flexiConfig.breakpoints instanceof Array);
        assert("config/flexi.js is defined, but did not contain property [number] columns", typeof this._flexiConfig.columns === 'number');

      } else {
        if (process.argv[2] !== 'install' && process.argv[3].indexOf('flexi') === -1) {
          throw new Error("You must define a config file for flexi at '" + configPath + "'");
        }
      }
    }
    return this._flexiConfig || {};
  },

  config: function() {
    var org = this._super.config.apply(this, arguments);

    org.flexi = this.flexiConfig();
    return org;
  },

  setupPreprocessorRegistry: function(type, registry) {
    AttributeConversion.prototype.flexiConfig = this.flexiConfig();

    registry.add('htmlbars-ast-plugin', {
      name: "flexi-attribute-conversion",
      before: "flexi-component-conversion",
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
      var layoutTree = new LayoutCompiler(tree, { breakpoints: this.flexiConfig().breakpoints });
      var templateTree = new Funnel(tree, {
        exclude: ['**/-layouts/*.hbs']
      });
      return mergeTrees([templateTree, layoutTree], { overwrite: true });
    }

    return tree;
  },

  includedCommands: function () {
    return commands;
  }

};
