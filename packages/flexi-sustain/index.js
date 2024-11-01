/* eslint-env node */
'use strict';

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
};
