/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function(options) {
    return this.addAddonToProject({
      name: '@html-next/flexi-config',
      blueprintOptions: {
        save: options.save
      }
    });
  }
};
