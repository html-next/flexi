import Route from 'ember-route';
import service from 'ember-service/inject';

export default Route.extend({
  device: service('device/layout'),

  redirect() {
    if (!this.get('device.isMobile')) {
      this.transitionTo('docs.overview');
    }
  }
});
