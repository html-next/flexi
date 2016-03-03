import Ember from 'ember';
import appendRange from '../utils/dom/append-range';

const {
  computed,
  run,
  guidFor
  } = Ember;

export default Ember.Object.extend({
  _isSustainFactory: true,

  id: computed(function() {
    return guidFor(this);
  }),

  // params exposed via the `{{sustain}}` helper
  name: '',
  model: null,
  copy: false,
  expires: null,

  // the element where the content should currently be rendered
  parent: null,

  // the content
  range: null,

  // reference to the sustain-container component where the content
  // was initially rendered
  component: null,

  componentName: computed.alias('name'),

  _hasRenderedOnce: false,
  removeTimeout: null,

  // sets the range and moves the content into position
  // only called once
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

  // when tearing down, we schedule a "null move" if the destination is
  // unknown. This lets us cancel it if a destination becomes known.
  _nullMove: null,

  // called each time the location of parent has changed
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
      to.parent = this.component.element.lastChild;
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
    if ((to.expires || to.expires === 0) && expires !== 0 && expires !== -1) {
      if (!expires || to.expires === 0 || to.expires === -1 || to.expires > expires) {
        this.set('expires', to.expires);
      }
    }

  },

  register(component) {
    this.component = component;
    this.render();
  },

  cloneNodeRange() {
    let fragment = document.createElement('div');
    let node = this.range.firstNode;
    do {
      fragment.appendChild(node.cloneNode(true));
      node = node.nextSibling;
    } while (node !== this.range.lastNode);
    fragment.appendChild(node.cloneNode(true));
    return {
      firstNode: fragment.firstChild,
      lastNode: fragment.lastChild
    };
  },

  unregister() {
    if (this.get('copy')) {
      this._previousCopy = true;
      this._previousParent = this.parent;
      this._previousClone = this.cloneNodeRange();
    }
    this.component = null;
  },

  willDestroy() {
    this._super(...arguments);
    this.range = null;
    this.component = null;
    this.set('model', null);
    this._previousParent = null;
    this._previousClone = null;
    run.cancel(this.removeTimeout);
    run.cancel(this._nullMove);
    this.removeTimeout = null;
    this._nullMove = null;
    this.parent = null;
  }

});
