import Ember from 'ember';
import appendRange from '../utils/dom/append-range';

const {
  computed
  } = Ember;

export default Ember.Object.extend({
  _isSustainFactory: true,

  name: '',
  model: null,
  parent: null,
  copy: false,
  expires: null,

  range: null,
  component: null,
  componentName: computed('name', function() {
    return `sustainables/${this.get('name')}`;
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
    if (this.get('copy')) {
      let parent = this.get('parent');
      let clone = parent.cloneNode(true);

      appendRange(to.parent, this.range.firstNode, this.range.lastNode);
      appendRange(to.parent, clone.firstChild, clone.lastChild);

    } else {
      appendRange(to.parent, this.range.firstNode, this.range.lastNode);
    }

    this.setProperties({
      parent: to.parent,
      copy: to.copy,
      model: to.model
    });

    let expires = this.get('expires');
    if (
      to.expires === 0 || to.expires === -1 ||
      (!expires && expires !== 0) ||
      (expires && expires !== -1 && to.expires > expires)
    ) {
      this.set('expires', to.expires);
    }

  },

  register(component) {
    this.component = component;
    this.render();
  },

  unregister() {
    this.component = null;
  }

});
