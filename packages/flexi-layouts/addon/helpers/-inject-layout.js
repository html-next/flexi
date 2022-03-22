import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  layoutService: service('device/layout'),

  compute() {
    return this.layoutService;
  },
});
