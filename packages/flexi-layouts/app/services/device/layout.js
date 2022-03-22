import config from '../../config/environment';
import Service from '@html-next/flexi-layouts/services/device/layout';

export default Service.extend({
  breakpoints: config.flexi.breakpoints
});
