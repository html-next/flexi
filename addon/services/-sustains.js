import Ember from 'ember';
import SustainModel from '../lib/sustain';
import renderComponentMixin from '../mixins/render-component';

const {
  get,
  run,
  Service
  } = Ember;

export default Service.extend(renderComponentMixin, {

  _cache: null,
  _sustains: null,
  _ready: false,
  componentName: 'sustainables-support',

  install(name, model, copy = false, expires = null) {
    let sustain = this._cache[name];

    if (!sustain) {
      this._cache[name] = SustainModel.create({
        model,
        name,
        copy,
        expires
      });

      if (this._ready) {
        this._sustains.pushObject(this._cache[name]);
      } else {
        run.schedule('actions', () => {
          this._sustains.pushObject(this._cache[name]);
        });
      }
    }
  },

  didInsert(opts) {
    let sustain = this._cache[opts.name];

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
    if (sustain.parent) {
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
