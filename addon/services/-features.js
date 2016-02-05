import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import Structure from '../lib/feature';

const {
  get,
  run,
  Service
  } = Ember;

export default Service.extend({

  _cache: null,
  _features: null,

  install(element, name, model, copy = false, expires = null) {
    let feature = this._cache[name];

    if (feature) {
      feature.move({
        parent: element,
        model,
        copy
      });
    } else {
      this._cache[name] = Structure.create({
        parent: element,
        model,
        name,
        copy
      });
      this._features.pushObject(this._cache[name]);
    }
  },

  cacheTimeout: 1000 * 15, // 15s

  uninstall(element, name) {
    const feature = this._cache[name];

    if (feature) {
      if (feature.parent === element) {
        feature.move({
          parent: null,
          copy: false
        });
        feature.removeTimeout = run.later(this, this._removeStructure, feature, get(feature, 'expires') || this.get('cacheTimeout'));
      }
    }
  },

  _removeStructure(feature) {
    if (get(feature, 'parent')) {
      return;
    }
    this._features.removeObject(feature);
    this._cache[get(feature, 'name')] = null;
    feature.destroy();
  },

  init() {
    this._super();
    this._cache = {};
    this._features = Ember.A();
  }

});
