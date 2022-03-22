import Obj from '@ember/object';
import { run } from '@ember/runloop';
import Ember from 'ember';

import appendCachedRange from '../utils/dom/append-cached-range';
import appendRange from '../utils/dom/append-range';

const DEFAULT_EXPIRES = Ember.testing === true ? 1 : 1000 * 5; // 5s

export default Obj.extend({
  isServiceFactory: true,
  _isSustainFactory: true,

  sustainService: null,

  // params exposed via the `{{sustain}}` helper
  component: '', // component name passed into the flexi-sustain marker
  label: null,
  model: null,
  copy: false,
  expires: DEFAULT_EXPIRES,

  // the element where the content should currently be rendered
  parent: null,

  // the content
  range: null,

  // reference to the sustain-container component where the content
  // was initially rendered
  _component: null,

  // caches the teardown handler
  removeTimeout: null,
  storeTimeout: null,

  // caches clone info
  _previousParent: null,
  _previousCopy: false,
  _previousClone: false,

  // caches a range when tearing down
  _cachedRange: false,

  cache() {
    this._cachedRange = this.getNodeRange();
  },

  remove() {
    this.cache();

    if (this.copy) {
      this._previousParent = this.parent;
      this._previousCopy = true;
      this._previousClone = this.cloneNodeRange();
    }

    this.scheduleStorage();
    this.scheduleRemove();

    this.triggerHook('willMove');
  },

  triggerHook(name) {
    this._component.trigger(name);
  },

  _append(newParent) {
    if (this._cachedRange) {
      appendCachedRange(newParent, this._cachedRange);
      this._cachedRange = null;
    } else {
      this.triggerHook('willMove');
      appendRange(newParent, this.range.firstNode, this.range.lastNode);
    }
    this.triggerHook('didMove');

    // leave copy in old location
    if (this._previousClone) {
      const parent = this._previousParent;
      const clone = this._previousClone;

      appendCachedRange(parent, clone);
      this._previousClone = null;
      this._previousParent = null;
    }
  },

  // called each time the location of parent has changed
  insert(to) {
    run.cancel(this.removeTimeout);
    run.cancel(this.storeTimeout);

    // initial insert
    if (!this._isReady) {
      this.parent = to.parent;
      return;
    }

    // move to new location
    this._append(to.parent);

    // update params
    this.parent = to.parent;

    this.setProperties({
      copy: to.copy,
      model: to.model,
    });
    this._component.set('model', to.model);

    this.updateExpires(to.expires);
  },

  updateExpires(newValue) {
    const oldValue = this.expires;
    const oIsForever = oldValue === 0 || oldValue === -1;
    const oIsDefined = oldValue || oldValue === 0;
    const nIsDefined = newValue || newValue === 0;
    const nIsForever = newValue === 0 || newValue === -1;

    if (
      nIsDefined &&
      !oIsForever &&
      (!oIsDefined || nIsForever || newValue > oldValue)
    ) {
      this.set('expires', newValue);
    }
  },

  getNodeRange() {
    let node = this.range.firstNode;
    const list = [];

    while (node !== this.range.lastNode) {
      list.push(node);
      node = node.nextSibling;
    }
    list.push(node);

    return list;
  },

  cloneNodeRange() {
    const list = this.getNodeRange();

    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].cloneNode(true);
    }

    return list;
  },

  scheduleStorage() {
    this.storeTimeout = run.next(this, this.store);
  },

  store() {
    appendRange(this._fragment, this.range.firstNode, this.range.lastNode);
  },

  scheduleRemove() {
    const { expires } = this;

    if (expires === 0 || expires === -1) {
      return;
    }

    this.removeTimeout = run.later(this, this._selfDestruct, expires);
  },

  _selfDestruct() {
    if (this.parent && this.parent === this._component.element) {
      return;
    }

    this.destroy();
  },

  willDestroy() {
    this._super(...arguments);
    this.sustainService.removeSustain(this.label);
    this.sustainService = null;

    // teardown DOM
    this.range = null;
    this._component.destroy();
    this._component = null;
    this.parent = null;

    // teardown clones
    this._previousParent = null;
    this._previousClone = null;

    // teardown async
    run.cancel(this.removeTimeout);
    this.removeTimeout = null;
  },

  _isReady: false,
  isReady() {
    this._isReady = true;

    this.range = {
      firstNode: this._fragment.firstChild,
      lastNode: this._fragment.lastChild,
    };

    if (this.parent) {
      appendRange(this.parent, this.range.firstNode, this.range.lastNode);
      this.triggerHook('didMove');
    }
  },

  setupComponent() {
    const name = this.component;
    const { model } = this;

    this._component = this.owner.lookup(`component:${name}`);

    // if the component hasn't explicitly set it's layout, look it up
    // pre Ember 2.0, layout is a computed property that MUST be set
    // via get/set
    if (!this._component.get('layout')) {
      let template = this.owner._lookupFactory(`template:${name}`);
      if (!template) {
        template = this.owner._lookupFactory(`template:components/${name}`);
      }
      this._component.set('layout', template);
    }
    this._component.set('model', model);

    const _super = this._component.willInsertElement;

    this._component.willInsertElement = () => {
      this.isReady();
      _super.call(this._component);
    };

    this._fragment = this._component.renderToElement();
  },

  init() {
    this._super();
    this.setupComponent();

    if (!this.expires && this.expires !== 0) {
      this.expires = DEFAULT_EXPIRES;
    }
  },
});
