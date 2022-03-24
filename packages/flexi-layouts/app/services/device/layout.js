import Service from '@html-next/flexi-layouts/services/device/layout';

import config from '../../config/environment';

export default class extends Service {
  constructor(...args) {
    super(...args);
    this.configure(config.flexi);
  }
}
