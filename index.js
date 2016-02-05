/* jshint node: true */
'use strict';

module.exports = {
  name: 'flexi',

  included: function(app) {
    this._super.included(app);
  },

  isDevelopingAddon: function() {
    return true;
  },

  setupPreprocessorRegistry: function(type, registry) {
    var AttributeConversion = require('./htmlbars-plugins/attribute-conversion');
    var ComponentConversion = require('./htmlbars-plugins/component-conversion');
    var FeatureConversion = require('./htmlbars-plugins/feature-conversion');

    registry.add('htmlbars-ast-plugin', {
      name: "attribute-conversion",
      plugin: AttributeConversion
    });

    registry.add('htmlbars-ast-plugin', {
      name: "component-conversion",
      plugin: ComponentConversion
    });

    registry.add('htmlbars-ast-plugin', {
      name: "feature-conversion",
      plugin: FeatureConversion
    });

  }

};
