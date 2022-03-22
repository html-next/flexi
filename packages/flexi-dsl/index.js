'use strict';

let getValidatedFlexiConfig = require('@html-next/flexi-config/lib/get-validated-flexi-config');

const AttributeConversion = require('./dsl/attribute-conversion');
const ComponentConversion = require('./dsl/component-conversion');

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
      throw new Error('@html-next/flexi-dsl is being used within another addon or engine and is'
        + ' having trouble registering itself to the parent application.');
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
    let org = this._super.config.apply(this, arguments);

    org.flexi = this.flexiConfig();
    return org;
  },

  setupPreprocessorRegistry(type, registry) {
    AttributeConversion.prototype.flexiConfig = this.flexiConfig();

    registry.add('htmlbars-ast-plugin', {
      name: 'flexi-attribute-conversion',
      before: 'flexi-component-conversion',
      plugin: AttributeConversion,
      baseDir() {
        return __dirname;
      }
    });

    registry.add('htmlbars-ast-plugin', {
      name: 'flexi-component-conversion',
      plugin: ComponentConversion,
      baseDir() {
        return __dirname;
      }
    });
  }
};
