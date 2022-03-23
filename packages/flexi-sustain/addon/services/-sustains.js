import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const OneMinute = 60_000;

function appendCachedRange(element, elementList) {
  const currentActiveElement = document.activeElement;
  const lastElement = element.lastChild || element.lastNode;
  const parent = lastElement ? lastElement.parentNode : element;

  for (let i = 0; i < elementList.length; i++) {
    parent.insertBefore(elementList[i], lastElement);
  }

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}

function appendRange(element, firstNode, lastNode) {
  const currentActiveElement = document.activeElement;
  const lastElement = element.lastChild || element.lastNode;
  const parent = lastElement ? lastElement.parentNode : element;
  let nextNode;

  while (firstNode) {
    nextNode = firstNode.nextSibling;
    lastElement.before(firstNode);
    firstNode = firstNode !== lastNode ? nextNode : null;
  }

  if (document.activeElement !== currentActiveElement) {
    currentActiveElement.focus();
  }
}

class SustainModel {
  @tracked model;
  label = null;
  @tracked componentName = null;
  copy = false;

  constructor(config) {
    this.update(config);

    this.target = config.dom.createDocumentFragment();
    this.firstNode = config.dom.createComment(
      `sustain-start :: ${config.label}`
    );
    this.lastNode = config.dom.createComment(`sustain-end :: ${config.label}`);
  }

  update(config) {
    // if owner has changed, schedule copy if needed
    Object.assign(this, config);

    if (!this.expires && this.expires !== 0) {
      this.expires = OneMinute;
    }
  }

  remove() {
    // move content to fragment
    // schedule full removal
  }
}

function getDOM(owner) {
  const documentService = owner.lookup('service:-document');

  if (documentService) {
    return documentService;
  }

  return owner.lookup('renderer:-dom');
}
export default class extends Service {
  get fastboot() {
    const owner = getOwner(this);

    return owner.lookup('service:fastboot');
  }

  get dom() {
    return getDOM(getOwner(this));
  }

  @tracked alive = new Map();

  render(opts) {
    const { alive } = this;
    let sustain = alive.get(opts.label);

    if (!sustain) {
      opts.dom = this.dom;
      opts.sustains = this;
      sustain = new SustainModel(opts);

      alive.set(opts.label, sustain);
      this.alive = alive;
    } else {
      sustain.update(opts);
    }

    return sustain.target;
  }

  removeSustain(label) {
    const { alive } = this;
    alive.delete(label);
    this.alive = alive;
  }
}
