import Ember from 'ember';
import appendRange from '../utils/dom/append-range';
import appendCachedRange from '../utils/dom/append-cached-range';

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
      this.component.element.firstChild.IS_CONTAINER_BEGIN = true;
      this.component.element.lastChild.IS_CONTAINER_END = true;

    }

    if (this.parent) {
      appendRange(this.parent, this.range.firstNode, this.range.lastNode);
    }
  },

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
      this._cachedRange = this.getNodeRange();

      if (this.get('copy')) {
        this._previousParent = this.parent;
        this._previousCopy = true;
        this._previousClone =  this.cloneNodeRange();
      }

      return;
    }

    // move to new location
    this.parent = to.parent;
    if (this._cachedRange) {
      appendCachedRange(to.parent, this._cachedRange);
      this._cachedRange = null;
    } else {
      appendRange(to.parent, this.range.firstNode, this.range.lastNode);
    }

    // leave copy in old location
    if (this._previousCopy) {
      let parent = this._previousParent;
      let clone = this._previousClone;

      appendRange(parent, clone.firstChild, clone.lastChild);
      this._previousCopy = false;
      this._previousClone = null;
      this._previousParent = null;
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

  getNodeRange() {
    let node = this.range.firstNode;
    let list = [];

    do {
      list.push(node);
      node = node.nextSibling;
    } while (node !== this.range.lastNode);
    list.push(node);

    return list;
  },

  cloneNodeRange() {
    let fragment = document.createElement('div');
    let list = this.getNodeRange();

    for (let i = 0; i < list.length; i++) {
      fragment.appendChild(list[i].cloneNode(true));
    }

    return {
      firstNode: fragment.firstChild,
      lastNode: fragment.lastChild
    };
  },

  unregister() {
    this.range = null;
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
    this.removeTimeout = null;
    this.parent = null;
  }

});
