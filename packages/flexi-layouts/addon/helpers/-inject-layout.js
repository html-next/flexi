import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class extends Helper {
  @service('device/layout') layoutService;

  compute() {
    return this.layoutService;
  }
}
