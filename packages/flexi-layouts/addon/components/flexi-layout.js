import Component from '@ember/component';
import { inject as service } from '@ember/service';

import layout from '../templates/components/flexi-layout';

export default Component.extend({
  layout,
  tagName: '',
  deviceLayout: service('device/layout'),
});
