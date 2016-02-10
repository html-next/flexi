import Ember from 'ember';
import appendRange from '../utils/dom/append-range';
import removeRange from '../utils/dom/remove-range';

export default Ember.Object.extend({
  _isSustainFactory: true,

  name: '',
  model: null,
  parent: null,
  leaveCopy: false,
  expires: null,

  range: null,
  component: null,
  componentName: Ember.computed('name', function() {
    return 'sustainables/' + this.get('name');
  }),

  render() {
    if (!this.range) {
      this.range = {
        firstNode: this.component.element.firstChild,
        lastNode: this.component.element.lastChild
      };
    }

    appendRange(this.parent, this.range.firstNode, this.range.lastNode);
  },

  move(to) {
    if (to.parent === null) {
      to.parent = this.component.element;
    }
    appendRange(to.parent, this.range.firstNode, this.range.lastNode);
  },

  register(component) {
    this.component = component;
    this.render();
  },

  unregister() {
    this.component = null;
  }

});
