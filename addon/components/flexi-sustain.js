import Ember from 'ember';
import layout from '../templates/components/flexi-sustain';

const {
  Component,
  inject
  } = Ember;

const component = Component.extend({
  layout,
  tagName: '',
  model: null,
  sustain: null,
  sustains: inject.service('-sustains'),

  copy: false,
  expires: null,

  willInsertElement() {
    this.get('sustains')
      .didInsert({
        name: this.get('sustain'),
        element: this._renderNode.lastNode,
        model: this.get('model'),
        copy: this.get('copy'),
        expires: this.get('expires')
      });
  },

  willDestroyElement() {
    this.get('sustains').uninstall(this._renderNode.lastNode, this.get('sustain'));
    this._super();
  },

  init() {
    this._super();
    this.get('sustains').install(
      this.get('sustain'),
      this.get('model'),
      this.get('copy'),
      this.get('expires')
    );
  }

});

component.reopenClass({
  positionalParams: ['sustain', 'model']
});

export default component;
