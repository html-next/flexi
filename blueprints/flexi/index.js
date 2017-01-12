/*jshint node:true*/
module.exports = {
  description: 'Installs config',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addAddonsToProject({
      packages: { name: 'flexi-layouts' }
    });
  }
};
