'use strict';

const getValidatedFlexiConfig = require('@html-next/flexi-config/lib/get-validated-flexi-config');

const templatePrecompiler = require('./dsl/template-precompiler');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon(...args) {
    if (
      typeof this.parent.name === 'string' &&
      (this.parent.name === 'flexi' || this.parent.name.startsWith('@html-next/flexi-'))
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
    registry.add('htmlbars-ast-plugin', {
      name: 'flexi-component-conversion',
      ext: 'hbs',
      plugin: (env) => {
        // TODO write config to file so that this can be safely parallelized
        return templatePrecompiler(env, this.flexiConfig());
      },
      cacheKey: () => {
        return JSON.stringify(this.flexiConfig());
      },
      baseDir() {
        return __dirname;
      },
    });
  },
};
