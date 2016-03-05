/* jshint node:true */

module.exports = function(EmberApp) {

  // shims ember-cli so that our layout and sustainables templates will work
  EmberApp.prototype._podTemplatePatterns = function() {
    return this.registry.extensionsForType('template').map(function(extension) {
      return '**/*/*.' + extension;
    });
  };

};
