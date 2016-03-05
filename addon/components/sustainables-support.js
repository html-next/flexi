import Ember from 'ember';
import layout from '../templates/components/sustainables-support';

const {
  Component,
  computed,
  inject
  } = Ember;

export default Component.extend({
  layout,
  '-sustains': inject.service('-sustains'),
  sustains: computed.alias('-sustains._sustains'),

  didInsertElement() {
    this._super();
    this.get('-sustains')._ready = true;
  }

});
