import Ember from 'ember';
import appendRange from '../utils/dom/append-range';
import appendCachedRange from '../utils/dom/append-cached-range';

const {
  run,
  Object: Obj
  } = Ember;

const DEFAULT_EXPIRES = 1000 * 5; // 5s

export default Obj.extend({
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

    if (this.get('copy')) {
      this._previousParent = this.parent;
      this._previousCopy = true;
      this._previousClone = this.cloneNodeRange();
    }

    this.scheduleStorage();
    this.scheduleRemove();

    this.triggerHook('willMove');
  },

  triggerHook(name) {
    if (this._component[name]) {
      this._component[name]();
    }
    this._component.trigger(name);
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
    if (this._cachedRange) {
      appendCachedRange(to.parent, this._cachedRange);
      this._cachedRange = null;
    } else {
      this.triggerHook('willMove');
      appendRange(to.parent, this.range.firstNode, this.range.lastNode);
    }
    this.triggerHook('didMove');

    // leave copy in old location
    if (this._previousClone) {
      let parent = this._previousParent;
      let clone = this._previousClone;

      appendCachedRange(parent, clone);
      this._previousClone = null;
      this._previousParent = null;
    }

    // update params
    this.parent = to.parent;

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

  getNodeRange() {
    let node = this.range.firstNode;
    let list = [];

    list.push(node);
    while (node !== this.range.lastNode) {
      list.push(node);
      node = node.nextSibling;
    }

    return list;
  },

  cloneNodeRange() {
    let list = this.getNodeRange();

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
    let expires = this.get('expires');

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
    this.sustainService.removeSustain(this.get('label'));
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
      lastNode: this._fragment.lastChild
    };

    if (this.parent) {
      appendRange(this.parent, this.range.firstNode, this.range.lastNode);
      this.triggerHook('didMove');
    }
  },

  setupComponent() {
    let name = this.get('component');
    let model = this.get('model');

    this._component = this.owner.lookup(`component:${name}`);

    // if the component hasn't explicitly set it's layout, look it up
    if (!this._component.layout) {
      this._component.layout = this.owner.lookup(`template:${name}`);
    }

    this._component.set('model', model);

    let _super = this._component.didInsertElement;

    this._component.didInsertElement = () => {
      this.isReady();
      if (_super) {
        _super.call(this._component);
      }
    };
    this._fragment = this._component.renderToElement();
  },

  init() {
    this._super();
    this.setupComponent();

    if (!this.expires && this.expires !== 0) {
      this.expires = DEFAULT_EXPIRES;
    }
  }

});
