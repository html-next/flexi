import Ember from 'ember';
import appendRange from '../utils/dom/append-range';
import appendCachedRange from '../utils/dom/append-cached-range';

const {
  run,
  Object: Obj
  } = Ember;

export default Obj.extend({
  _isSustainFactory: true,

  sustainService: null,

  // params exposed via the `{{sustain}}` helper
  name: '',
  model: null,
  copy: false,
  expires: 1000 * 5, // 5s

  // the element where the content should currently be rendered
  parent: null,

  // the content
  range: null,

  // reference to the sustain-container component where the content
  // was initially rendered
  component: null,

  // caches the teardown handler
  removeTimeout: null,

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

    this.scheduleRemove();
  },

  // called each time the location of parent has changed
  insert(to) {
    run.cancel(this.removeTimeout);

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
      appendRange(to.parent, this.range.firstNode, this.range.lastNode);
    }

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

  scheduleRemove() {
    let expires = this.get('expires');

    if (expires === 0 || expires === -1) {
      return;
    }

    this.removeTimeout = run.later(this, this._selfDestruct, expires);
  },

  _selfDestruct() {
    if (this.parent && this.parent === this.component.element) {
      return;
    }
    this.destroy();
  },

  willDestroy() {
    this._super(...arguments);
    this.sustainService.removeSustain(this.get('name'));
    this.sustainService = null;

    // teardown DOM
    this.range = null;
    this.component.destroy();
    this.component = null;
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
    }
  },

  setupComponent() {
    let name = this.get('name');
    let model = this.get('model');

    this.component = this.owner.lookup(`component:${name}`);

    // if the component hasn't explicitly set it's layout, look it up
    if (!this.component.layout) {
      let layout = this.owner.lookup(`template:${name}`);
      this.component.layout = layout;
    }
    this.component.set('model', model);
    let _super = this.component.get('didInsertElement');
    this.component.set('didInsertElement', () => {
      this.isReady();
      if (_super) {
        _super();
      }
    });
    this._fragment = this.component.renderToElement();
  },

  init() {
    this._super();
    this.setupComponent();
  }

});
