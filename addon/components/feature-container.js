import Ember from 'ember';
import layout from '../templates/components/sustain-container';

export default Ember.Component.extend({
  layout,
  sustain: null,

  willInsertElement() {
    this._super(...arguments);
    this.get('sustain').register(this);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('sustain').unregister(this);
  },

  willDestroy() {
    this._super(...arguments);
    this.set('sustain', null);
  }

});
