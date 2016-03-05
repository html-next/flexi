import Ember from 'ember';

export default Ember.Route.extend({
  device: Ember.inject.service('device/layout'),

  redirect() {
    if (!this.get('device.isMobile')) {
      this.transitionTo('docs.overview');
    }
  }
});
