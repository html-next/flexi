/* eslint-disable no-restricted-globals */
import { isTesting, macroCondition } from '@embroider/macros';

import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';

const SIX_SECONDS = 6000;
const DEFAULT_EXPIRES = macroCondition(isTesting()) ? 1 : SIX_SECONDS;

const hasDocument = typeof document !== 'undefined';

function appendCachedRange(element, elementList) {
  const currentActiveElement = hasDocument ? document.activeElement : null;
  const lastElement = element.lastChild || element.lastNode;
  const parent = lastElement ? lastElement.parentNode : element;

  for (let i = 0; i < elementList.length; i++) {
    parent.insertBefore(elementList[i], lastElement);
  }

  if (hasDocument && document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}

function appendRange(element, firstNode, lastNode) {
  const currentActiveElement = hasDocument ? document.activeElement : null;
  const lastElement = element.lastChild || element.lastNode;
  let nextNode;

  while (firstNode) {
    nextNode = firstNode.nextSibling;
    lastElement.before(firstNode);
    firstNode = firstNode !== lastNode ? nextNode : null;
  }
  lastElement.before(lastNode);

  if (hasDocument && document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}

export default class Sustained {
  // params exposed via the `{{sustain}}` helper
  @tracked model;
  @tracked componentName = null;
  label = null;
  copy = false;
  expires = DEFAULT_EXPIRES;

  // the helper instance where the content should currently be rendered
  owner = null;

  // the content bounds
  range = null;

  // a fragment where to keep the content when not in DOM
  fragment = null;
  target = null;
  hasMounted = false;

  // caches the teardown handler
  removeTimeout = null;
  storeTimeout = null;

  // caches info needed for clone
  _previousOwner = null;
  _previousCopy = false;
  _previousClone = false;

  // caches a range when tearing down
  _cachedRange = false;

  // event listeners
  listeners = new Map();

  constructor(config) {
    Object.assign(this, config);

    this.copy = config.copy || false;
    this.expires = config.expires && config.expires !== 0 ? config.expires : DEFAULT_EXPIRES;

    this.fragment = config.dom.createDocumentFragment();
    this.target = config.dom.createElement('div');
    this.fragment.appendChild(this.target);
    const firstNode = config.dom.createComment(`sustain-start :: ${config.label}`);
    const lastNode = config.dom.createComment(`sustain-end :: ${config.label}`);
    this.range = {
      firstNode,
      lastNode,
    };
    this.subscribe = (event, cb) => {
      let eventHandlers = this.listeners.get(event);
      if (!eventHandlers) {
        eventHandlers = new Set();
        this.listeners.set(event, eventHandlers);
        eventHandlers.add(cb);
      }
      return () => {
        this.listeners.get(event).delete(cb);
      };
    };
  }

  mount = (mountElement) => {
    assert(`Should not mount more than once`, !this.hasMounted);
    this.hasMounted = true;
    this.mountElement = mountElement;
    if (this.owner) {
      appendRange(this.owner.range, this.range.firstNode, this.range.lastNode);
    }
  };

  // called when owner has changed
  update(newConfig) {
    if (this.hasMounted && this.owner && this.owner !== newConfig.owner) {
      if (this.copy) {
        this._previousOwner = this.owner;
        this._previousCopy = true;
        this._previousClone = this.cloneNodeRange();
      }

      // ensure we are in the fragment
      this.move(newConfig.owner.range);
    }
    this.owner = newConfig.owner;
    this.copy = newConfig.copy || false;
    this.model = newConfig.model;

    clearTimeout(this.removeTimeout);

    this.updateExpires(newConfig.expires);
  }

  updateExpires(newValue) {
    const oldValue = this.expires;
    const oIsForever = oldValue === 0 || oldValue === -1;
    const oIsDefined = oldValue || oldValue === 0;
    const nIsDefined = newValue || newValue === 0;
    const nIsForever = newValue === 0 || newValue === -1;

    if (nIsDefined && !oIsForever && (!oIsDefined || nIsForever || newValue > oldValue)) {
      this.expires = newValue;
    }
  }

  triggerHook(name) {
    const handlers = this.listeners.get(name);

    if (handlers) {
      handlers.forEach((cb) => cb());
    }
  }

  // called when current ower has been removed
  remove() {
    // return to fragment, leaving copy if needed
    if (this.hasMounted) {
      if (this.copy) {
        this._previousOwner = this.owner;
        this._previousCopy = true;
        this._previousClone = this.cloneNodeRange();
      }
      this.move(this.mountElement);
    }

    this.scheduleRemove();
  }

  getNodeRange() {
    let node = this.range.firstNode;
    const list = [];

    while (node !== this.range.lastNode) {
      list.push(node);
      node = node.nextSibling;
    }
    list.push(node);

    return list;
  }

  cloneNodeRange() {
    const list = this.getNodeRange();

    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].cloneNode(true);
    }

    return list;
  }

  move(dest) {
    this.triggerHook('willMove');
    appendRange(dest, this.range.firstNode, this.range.lastNode);

    // leave copy in old location
    if (this._previousClone) {
      const owner = this._previousOwner;
      const clone = this._previousClone;

      appendCachedRange(owner.range, clone);
      this._previousClone = null;
      this._previousParent = null;
    }
    this.triggerHook('didMove');
  }

  scheduleRemove() {
    const { expires } = this;

    if (expires === 0 || expires === -1) {
      return;
    }

    clearTimeout(this.removeTimeout);
    this.removeTimeout = setTimeout(() => this._selfDestruct(), expires);
  }

  _selfDestruct() {
    if (this.owner) {
      return;
    }

    this.sustains.removeSustain(this);
    this.sustains = null;

    // teardown DOM
    this.range = null;
    this.target = null;
    this.mountElement = null;

    // teardown clones
    this._previousParent = null;
    this._previousClone = null;

    // teardown async
    clearTimeout(this.removeTimeout);
    this.removeTimeout = null;
  }
}
