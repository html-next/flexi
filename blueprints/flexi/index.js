/*jshint node:true*/
module.exports = {
  description: 'Installs config',

  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addAddonsToProject({
      packages: [
        { name: 'flexi-default-dsl' },
        { name: 'flexi-default-styles' },
        { name: 'flexi-layouts' }
      ]
    });
  }
};
