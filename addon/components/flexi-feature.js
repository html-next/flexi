import Ember from 'ember';
import layout from '../templates/components/flexi-feature';

const {
  Component,
  inject
  } = Ember;

const component = Component.extend({
  layout,
  tagName: 'feature',
  model: null,
  feature: null,
  features: inject.service('-features'),

  copy: false,
  expires: null,

  willInsertElement() {
    this.get('features').install(
      this.element,
      this.get('feature'),
      this.get('model'),
      this.get('copy'),
      this.get('expires')
    );
  },

  willDestroyElement() {
    this.get('features').uninstall(this.element, this.get('feature'));
  }

});

component.reopenClass({
  positionalParams: ['feature', 'model']
});

export default component;
