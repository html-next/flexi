import Ember from 'ember';
import SustainModel from '../lib/sustain';
import getOwner from 'ember-getowner-polyfill';

const {
  Service
  } = Ember;

export default Service.extend({

  _cache: null,

  install(name, model, copy = false, expires = null) {
    let sustain = this._cache[name];

    if (!sustain) {
      this._cache[name] = SustainModel.create({
        owner: getOwner(this),
        sustainService: this,
        model,
        name,
        copy,
        expires
      });
    }
  },

  didInsert(opts) {
    let sustain = this._cache[opts.name];

    sustain.insert({
      parent: opts.element,
      model: opts.model,
      copy: opts.copy,
      expires: opts.expires
    });
  },

  // called when a sustain marker is being removed
  uninstall(element, name) {
    const sustain = this._cache[name];

    // only uninstall if we're still in this same parent
    if (sustain && sustain.parent === element) {
      sustain.remove();
    }

  },

  removeSustain(label) {
    this._cache[label] = null;
  },

  init() {
    this._super();
    this._cache = {};
  }

});
