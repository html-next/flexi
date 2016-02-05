import Ember from 'ember';
import layout from '../templates/components/feature-container';

export default Ember.Component.extend({
  layout,
  feature: null,

  willInsertElement() {
    this._super(...arguments);
    this.get('feature').register(this);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('feature').unregister(this);
  },

  willDestroy() {
    this._super(...arguments);
    this.set('feature', null);
  }

});
