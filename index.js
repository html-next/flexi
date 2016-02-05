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
    var SustainConversion = require('./htmlbars-plugins/sustain-conversion');

    registry.add('htmlbars-ast-plugin', {
      name: "attribute-conversion",
      plugin: AttributeConversion
    });

    registry.add('htmlbars-ast-plugin', {
      name: "component-conversion",
      plugin: ComponentConversion
    });

    registry.add('htmlbars-ast-plugin', {
      name: "sustain-conversion",
      plugin: SustainConversion
    });

  }

};
