import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';
// eslint-disable-next-line no-restricted-imports
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';

function getDOM(owner) {
  const documentService = owner.lookup('service:-document');

  if (documentService) {
    return documentService;
  }

  return owner.lookup('renderer:-dom');
}
export default class extends Helper {
  @service('-sustains') sustains;

  prepare(label) {
    const dom = (this.dom = getDOM(getOwner(this)));
    this.fragment = dom.createDocumentFragment();
    const firstNode = dom.createComment(`sustain-loc-start :: ${label}`);
    const lastNode = dom.createComment(`sustain-loc-end :: ${label}`);
    this.range = {
      firstNode,
      lastNode,
    };
    this.fragment.appendChild(firstNode);
    this.fragment.appendChild(lastNode);
  }

  compute([componentName, maybeModel], { model, label, copy, expires } = {}) {
    this.prepare(label || componentName);
    this._model = this.sustains.render({
      componentName,
      model: maybeModel || model,
      copy,
      expires,
      owner: this,
      label: label || componentName,
    });

    // eslint-disable-next-line ember/no-runloop
    next(() => {
      this.retainedParent = this.range.firstNode.parentNode;
    });

    return this.fragment;
  }

  // eslint-disable-next-line ember/classic-decorator-hooks
  destroy(...args) {
    // willDestroy is too late to save the DOM
    if (this._model.owner === this) {
      this._model.remove();
    }
    super.destroy(...args);
  }

  willDestroy() {
    this.range = null;
    this.fragment = null;
    this._model = null;
    this.dom = null;
    this.retainedParent = null;
  }
}
