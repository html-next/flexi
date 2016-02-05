import Ember from 'ember';
import layout from '../templates/components/flexi-sustain';

const {
  Component,
  inject
  } = Ember;

const component = Component.extend({
  layout,
  tagName: 'sustain',
  model: null,
  sustain: null,
  sustains: inject.service('-sustains'),

  copy: false,
  expires: null,

  willInsertElement() {
    this.get('sustains').install(
      this.element,
      this.get('sustain'),
      this.get('model'),
      this.get('copy'),
      this.get('expires')
    );
  },

  willDestroyElement() {
    this.get('sustains').uninstall(this.element, this.get('sustain'));
  }

});

component.reopenClass({
  positionalParams: ['sustain', 'model']
});

export default component;
