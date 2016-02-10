import Ember from 'ember';

const {
  computed,
  Mixin
  } = Ember;

export default Mixin.create({

  resolveTemplate(parsedName) {
    let sustainName = parsedName.fullNameWithoutType;

    if (sustainName.indexOf('components/sustainables/') === 0) {
      let parts = sustainName.split('/');
      parts.shift();
      parts.shift();
      parts.unshift('components');
      parts.splice(parts.length - 1, 0, 'sustainables');
      parsedName.name = parsedName.fullNameWithoutType = parts.join('/');
      parsedName.fullName = `template:${parsedName.name}`;
    }

    return this._super(parsedName);
  },

  addTypeToPrefix(podPrefix, type) {
    if (type === 'template') {
      let parts = podPrefix.split('/');
      parts.splice(1, 0, `${type}s`);
      return parts.join('/');
    }
    return podPrefix;
  },

  podBasedLookupWithPrefix(podPrefix, parsedName) {
    let { fullNameWithoutType } = parsedName;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    let typedPrefix = this.addTypeToPrefix(podPrefix, parsedName.type);
    return `${typedPrefix}/${fullNameWithoutType}/${parsedName.type}`;
  },

  podBasedLookupWithClassic(parsedName) {
    let { fullNameWithoutType } = parsedName;
    let podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    let typedPrefix = this.addTypeToPrefix(podPrefix, parsedName.type);
    return `${typedPrefix}/${fullNameWithoutType}`;
  },

  moduleNameLookupPatterns: computed(function() {
    return [
      this.podBasedLookupWithClassic,
      this.podBasedModuleName,
      this.podBasedComponentsInSubdir,
      this.mainModuleName,
      this.defaultModuleName
    ];
  })

});
