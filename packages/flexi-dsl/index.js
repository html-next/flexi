'use strict';

const getValidatedFlexiConfig = require('@html-next/flexi-config/lib/get-validated-flexi-config');

const AttributeConversion = require('./dsl/attribute-conversion');
const ComponentConversion = require('./dsl/component-conversion');

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

  config() {
    return { flexi: this.flexiConfig() };
  },

  setupPreprocessorRegistry(type, registry) {
    AttributeConversion.prototype.flexiConfig = this.flexiConfig();

    registry.add('htmlbars-ast-plugin', {
      name: 'flexi-attribute-conversion',
      before: 'flexi-component-conversion',
      plugin: AttributeConversion,
      baseDir() {
        return __dirname;
      },
    });

    registry.add('htmlbars-ast-plugin', {
      name: 'flexi-component-conversion',
      plugin: ComponentConversion,
      baseDir() {
        return __dirname;
      },
    });
  },
};
