/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName() {},

  afterInstall(options) {
    return this.addAddonToProject({
      name: '@html-next/flexi-config',
      blueprintOptions: {
        save: options.save
      }
    });
  }
};
