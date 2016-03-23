import Ember from 'ember';
import layout from '../templates/components/flexi-sustain';

const {
  Component,
  inject
  } = Ember;

const component = Component.extend({
  layout,
  tagName: '',

  sustains: inject.service('-sustains'),

  label: null,
  model: null,
  component: null,
  copy: false,
  expires: null,

  willInsertElement() {
    let element = this.element || this._renderNode;
    let properties = this.getProperties('label', 'component', 'model', 'copy', 'expires');

    properties.element = element;
    this.get('sustains').didInsert(properties);
  },

  willDestroyElement() {
    this.get('sustains').uninstall(this.element || this._renderNode, this.get('label'));
    this._super();
  },

  init() {
    if (!this.label) {
      this.label = this.component;
    } else {
      this.label = `${this.component}:${this.label}`;
    }

    // Ember 2.1 workaround
    if (this.attrs) {
      this.attrs.label = this.label;
    }

    // once the Ember 2.1 workaround is not needed, we can move the
    // label setup after super
    this._super();

    let properties = this.getProperties('label', 'component', 'model', 'copy', 'expires');

    this.get('sustains').install(properties);
  }

});

component.reopenClass({
  positionalParams: ['component', 'model']
});

export default component;
