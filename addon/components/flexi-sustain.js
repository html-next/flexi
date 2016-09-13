import Ember from 'ember';
import layout from '../templates/components/flexi-sustain';

const {
  assert,
  deprecate,
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
  isComponentHelper: false,

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
    this._super();
    let isComponentHelper = this.isComponentHelper = typeof this.component !== 'string';

    deprecate('You must supply a label to every usage of `{{sustain}}`', isComponentHelper, {
      id: 'flexi.sustain.isNotComponentHelper',
      since: '1.2.0',
      until: '2.0.0'
    });
    deprecate('You must supply a label to every usage of `{{sustain}}`', this.label, {
      id: 'flexi.sustain.missingLabel',
      since: '1.2.0',
      until: '2.0.0'
    });
    assert('Must provide a sustain label when using with the component helper', !(!this.label && isComponentHelper));

    let properties = this.getProperties('label', 'component', 'model', 'copy', 'expires');
    properties.isComponentHelper = isComponentHelper;

    this.get('sustains').install(properties);
  }

});

component.reopenClass({
  positionalParams: ['component', 'model']
});

export default component;
