import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default Helper.extend({

  layoutService: service('device/layout'),

  compute() {
    return this.get('layoutService');
  }
});
