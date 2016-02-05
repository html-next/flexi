/* jshint node:true */

var p = require('ember-cli-preprocess-registry/preprocessors');
var preprocessTemplates = p.preprocessTemplates;
var Funnel = require('broccoli-funnel');
var mergeTrees = require('ember-cli/lib/broccoli/merge-trees');

module.exports = function(EmberApp) {

  EmberApp.prototype._podTemplatePatterns = function() {
    return this.registry.extensionsForType('template').map(function(extension) {
      return '**/*/*.' + extension;
    });
  };

  EmberApp.prototype._processedTemplatesTree = function() {
    var addonTrees = this.addonTreesFor('templates');
    var mergedTrees = this.trees.templates ? addonTrees.concat(this.trees.templates) : addonTrees;
    var mergedTemplates = mergeTrees(mergedTrees, {
      overwrite: true,
      annotation: 'TreeMerger (templates)'
    });

    var standardTemplates = new Funnel(mergedTemplates, {
      srcDir: '/',
      destDir: this.name + '/templates',
      annotation: 'ProcessedTemplateTree'
    });

    var podTemplates = new Funnel(this.trees.app, {
      include: this._podTemplatePatterns(),
      exclude: [ 'templates/**/*' ],
      destDir: this.name + '/',
      annotation: 'Funnel: Pod Templates',
      getDestinationPath: function(relativePath) {
        return 'templates/' + relativePath;
      }
    });

    var templates = this.addonPreprocessTree('template', mergeTrees([
      standardTemplates,
      podTemplates
    ], { annotation: 'addonPreprocessTree(template)' }));

    return this.addonPostprocessTree('template', preprocessTemplates(templates, {
      registry: this.registry,
      annotation: 'TreeMerger (pod & standard templates)'
    }));
  };

};
