/* global requirejs, require */
import Ember from 'ember';

export default Ember.Mixin.create({
  resolveFeature(parsedName) {
    // TODO: clean this up to use latest ember-resolver from npm
    let featureName = parsedName.fullNameWithoutType;
    console.log('feature', parsedName, featureName);
    let featureModule = featureName + '/feature';

    if (requirejs.entries[featureModule]) {
      let module = require(featureModule);

      return module.default;
    }
  }
});
