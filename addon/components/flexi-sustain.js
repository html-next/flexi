import Ember from 'ember';
import layout from '../templates/components/flexi-sustain';

const {
  Component,
  inject,
  guidFor
  } = Ember;

const component = Component.extend({
  layout,
  tagName: '',
  model: null,
  sustain: null,
  sustains: inject.service('-sustains'),

  copy: false,
  expires: null,

  didInsertElement() {
    let element = this.element || this._renderNode;
    element.firstNode.IS_SUSTAIN_BEGIN = guidFor(this);
    element.lastNode.IS_SUSTAIN_END = guidFor(this);

    this.get('sustains')
      .didInsert({
        name: this.get('sustain'),
        element,
        model: this.get('model'),
        copy: this.get('copy'),
        expires: this.get('expires')
      });
  },

  willDestroyElement() {
    this.get('sustains').uninstall(this.element || this._renderNode, this.get('sustain'));
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
