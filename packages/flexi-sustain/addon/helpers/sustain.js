import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class extends Helper {
  @service('-sustains') sustains;

  compute([componentName, model], { label, copy, expires } = {}) {
    this._model = this.sustains.render({
      componentName,
      model,
      copy,
      expires,
      owner: this,
      label: label || componentName,
    });

    return this._model.target;
  }

  willDestroy() {
    if (this._model.owner === this) {
      this._model.remove();
    }

    this._model = null;
  }
}
