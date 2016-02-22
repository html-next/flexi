import Ember from 'ember';
import appendRange from '../utils/dom/append-range';

const {
  computed,
  run
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

  _hasRenderedOnce: false,
  render() {
    if (!this.range) {
      this.range = {
        firstNode: this.component.element.firstChild,
        lastNode: this.component.element.lastChild
      };
    }

    if (this.parent) {
      appendRange(this.parent, this.range.firstNode, this.range.lastNode);
    }
  },

  _nullMove: null,
  move(to) {

    if (!this.component) {
      this.parent = to.parent;
      if (this._hasRenderedOnce) {
        delete to.parent;
        this.setProperties(to);
      }
      return;
    }

    if (to.parent === null) {
      to.parent = this.component.element;
      this._nullMove = run.next(this, this.move, to);
      return;
    }

    run.cancel(this._nullMove);
    if (this._previousCopy) {
      let parent = this._previousParent;
      let clone = this._previousClone;

      appendRange(to.parent, this.range.firstNode, this.range.lastNode);
      appendRange(parent, clone.firstChild, clone.lastChild);
      this._previousCopy = false;
      this._previousClone = null;
      this._previousParent = null;
    } else {
      appendRange(to.parent, this.range.firstNode, this.range.lastNode);
    }

    if (!this._hasRenderedOnce) {
      this._hasRenderedOnce = true;
      return;
    }

    this.setProperties({
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
    if (this.get('copy')) {
      this._previousCopy = true;
      this._previousParent = this.parent;
      this._previousClone = this.parent.cloneNode(true);
    }
    this.component = null;
  }

});
