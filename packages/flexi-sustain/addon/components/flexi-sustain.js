import Component from '@ember/component';
import { inject as service } from '@ember/service';

import layout from '../templates/components/flexi-sustain';

const component = Component.extend({
  layout,
  tagName: '',

  sustains: service('-sustains'),

  label: null,
  model: null,
  component: null,
  copy: false,
  expires: null,

  willInsertElement() {
    this._super(...arguments);
    const element = this.element || this._renderNode;
    const properties = this.getProperties(
      'label',
      'component',
      'model',
      'copy',
      'expires'
    );

    properties.element = element;
    this.sustains.didInsert(properties);
  },

  willDestroyElement() {
    this.sustains.uninstall(this.element || this._renderNode, this.label);
    this._super();
  },

  init() {
    this.label = !this.label
      ? this.component
      : `${this.component}:${this.label}`;

    // Ember 2.1 workaround
    if (this.attrs) {
      this.attrs.label = this.label;
    }

    // once the Ember 2.1 workaround is not needed, we can move the
    // label setup after super
    this._super();

    const properties = this.getProperties(
      'label',
      'component',
      'model',
      'copy',
      'expires'
    );

    this.sustains.install(properties);
  },
});

component.reopenClass({
  positionalParams: ['component', 'model'],
});

export default component;
