/* eslint-env node */
'use strict';

const SustainConversion = require('./dsl/sustain-conversion');

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

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'flexi-sustain-conversion',
      plugin: SustainConversion,
      baseDir() {
        return __dirname;
      },
    });
  },
};
