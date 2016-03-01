import config from '../../config/environment';
import Service from 'flexi/services/-sustains';

export default Service.extend({
  useSustainables: config.flexi.useSustainables || false
});
