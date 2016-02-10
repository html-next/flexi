import Ember from 'ember';
import Structure from '../lib/sustain';

const {
  get,
  run,
  Service
  } = Ember;

export default Service.extend({

  _cache: null,
  _sustains: null,

  install(name, model, copy = false, expires = null) {
    let sustain = this._cache[name];

    if (!sustain) {
      this._cache[name] = Structure.create({
        model,
        name,
        copy,
        expires
      });
      // console.log('pushing to _sustains');
      this._sustains.pushObject(this._cache[name]);
    }
  },

  didInsert(opts) {
    let sustain = this._cache[opts.name];

    // console.log('moving sustain to new element');
    sustain.move({
      parent: opts.element,
      model: opts.model,
      copy: opts.copy,
      expires: opts.expires
    });
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
        let expires = get(sustain, 'expires');
        if (expires === 0 || expires === -1) {
          return;
        }
        sustain.removeTimeout = run.later(this, this._removeStructure, sustain, expires || this.get('cacheTimeout'));
      }
    }
  },

  _removeStructure(sustain) {
    if (get(sustain, 'parent')) {
      return;
    }
    // console.log('removing from _sustains');
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
