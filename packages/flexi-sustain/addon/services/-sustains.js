import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

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
