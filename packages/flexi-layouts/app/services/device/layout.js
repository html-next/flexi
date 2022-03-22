import Service from '@html-next/flexi-layouts/services/device/layout';

import config from '../../config/environment';

export default Service.extend({
  breakpoints: config.flexi.breakpoints,
});
