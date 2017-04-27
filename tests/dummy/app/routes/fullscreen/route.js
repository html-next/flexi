import Route from 'ember-route';

export default Route.extend({
  setupController() {
    this._super(...arguments);
    this.controllerFor("application").set("isFullscreen", true);
  }
});
