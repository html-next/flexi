import Ember from 'ember';

export default Ember.Mixin.create({

  resolveTemplate(parsedName) {
    let featureName = parsedName.fullNameWithoutType;
    if (featureName.indexOf('components/feature/') === 0) {
      let parts = featureName.split('/');
      parts.shift();
      parts.shift();
      parts.unshift('components');
      parts.splice(parts.length - 1, 0, 'features');
      parsedName.name = parsedName.fullNameWithoutType = parts.join('/');
      parsedName.fullName = 'template:' + parsedName.name;
    }
    return this._super(parsedName);
  },

  podBasedLookupWithClassic: function(parsedName) {
    var fullNameWithoutType = parsedName.fullNameWithoutType;
    var podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    let name = podPrefix + '/' + fullNameWithoutType;
    return name;
  },

  moduleNameLookupPatterns: Ember.computed(function(){
    return [
      this.podBasedLookupWithClassic,
      this.podBasedModuleName,
      this.podBasedComponentsInSubdir,
      this.mainModuleName,
      this.defaultModuleName
    ];
  })


});
