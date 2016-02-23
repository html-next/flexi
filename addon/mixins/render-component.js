import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

const {
  computed,
  Mixin
  } = Ember;

export default Mixin.create({

  componentName: null,
  _component: null,

  component: computed('componentName', function() {
    let name = this.get('componentName');
    if (!name) {
      return;
    }
    if (this._component) {
      this._component.destroy();
    }
    this._component = getOwner(this).lookup(`component:${name}`);
    this._component.renderToElement();

    return this._component;
  }),

  init() {
    this._super();
    this.get('component');
  }

});
