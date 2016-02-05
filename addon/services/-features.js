import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import Structure from '../lib/sustain';

const {
  get,
  run,
  Service
  } = Ember;

export default Service.extend({

  _cache: null,
  _sustains: null,

  install(element, name, model, copy = false, expires = null) {
    let sustain = this._cache[name];

    if (sustain) {
      sustain.move({
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
      this._sustains.pushObject(this._cache[name]);
    }
  },

  cacheTimeout: 1000 * 15, // 15s

  uninstall(element, name) {
    const sustain = this._cache[name];

    if (sustain) {
      if (sustain.parent === element) {
        sustain.move({
          parent: null,
          copy: false
        });
        sustain.removeTimeout = run.later(this, this._removeStructure, sustain, get(sustain, 'expires') || this.get('cacheTimeout'));
      }
    }
  },

  _removeStructure(sustain) {
    if (get(sustain, 'parent')) {
      return;
    }
    this._sustains.removeObject(sustain);
    this._cache[get(sustain, 'name')] = null;
    sustain.destroy();
  },

  init() {
    this._super();
    this._cache = {};
    this._sustains = Ember.A();
  }

});
