import Ember from 'ember';

export default Ember.Mixin.create({

  resolveTemplate(parsedName) {
    let sustainName = parsedName.fullNameWithoutType;
    if (sustainName.indexOf('components/sustainables/') === 0) {
      let parts = sustainName.split('/');
      parts.shift();
      parts.shift();
      parts.unshift('components');
      parts.splice(parts.length - 1, 0, 'sustainables');
      parsedName.name = parsedName.fullNameWithoutType = parts.join('/');
      parsedName.fullName = 'template:' + parsedName.name;
    }
    return this._super(parsedName);
  },

  addTypeToPrefix: function(podPrefix, type) {
    if (type === 'template') {
      var parts = podPrefix.split('/');
      parts.splice(1, 0, type + 's');
      return parts.join('/');
    }
    return podPrefix;
  },

  podBasedLookupWithPrefix: function(podPrefix, parsedName) {
    var fullNameWithoutType = parsedName.fullNameWithoutType;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    return this.addTypeToPrefix(podPrefix, parsedName.type) + '/' + fullNameWithoutType + '/' + parsedName.type;
  },

  podBasedLookupWithClassic: function(parsedName) {
    var fullNameWithoutType = parsedName.fullNameWithoutType;
    var podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    return this.addTypeToPrefix(podPrefix, parsedName.type) + '/' + fullNameWithoutType;
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
