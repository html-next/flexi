import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import Service from '@ember/service';

import SustainModel from '../classes/sustain';

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

  keyed = new Map();
  alive = A();

  render(opts) {
    const { alive, keyed } = this;
    let sustain = keyed.get(opts.label);

    if (!sustain) {
      opts.dom = this.dom;
      opts.sustains = this;
      sustain = new SustainModel(opts);

      keyed.set(opts.label, sustain);
      alive.pushObject(sustain);
    } else {
      sustain.update(opts);
    }

    return sustain;
  }

  removeSustain(label) {
    const { alive, keyed } = this;
    const sustain = keyed.get(label);
    keyed.delete(label);
    alive.removeObject(sustain);
  }
}
