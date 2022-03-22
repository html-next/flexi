import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  device: service('device/layout'),

  redirect() {
    if (!this.get('device.isMobile')) {
      this.transitionTo('docs.overview');
    }
  },
});
