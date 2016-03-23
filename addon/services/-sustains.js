import Ember from 'ember';
import SustainModel from '../lib/sustain';
import getOwner from 'ember-getowner-polyfill';

const {
  Service
  } = Ember;

export default Service.extend({

  _cache: null,

  install(opts) {
    let sustain = this._cache[opts.label];

    if (!sustain) {
      opts.owner = getOwner(this);
      opts.sustainService = this;

      this._cache[opts.label] = SustainModel.create(opts);
    }
  },

  didInsert(opts) {
    let sustain = this._cache[opts.label];

    if (!sustain) {
      throw new Error(`No sustained instance found for ${opts.label}`);
    }

    sustain.insert({
      parent: opts.element,
      model: opts.model,
      copy: opts.copy,
      expires: opts.expires
    });

  },

  // called when a sustain marker is being removed
  uninstall(element, label) {
    const sustain = this._cache[label];

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
