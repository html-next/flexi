import config from '../../config/environment';
import Service from 'flexi/services/device/layout';

export default Service.extend({
  breakpoints: config.flexi.breakpoints
});
