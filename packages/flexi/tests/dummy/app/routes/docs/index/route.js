import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service('device/layout') device;
  @service router;

  redirect() {
    if (!this.device.isMobile) {
      this.router.transitionTo('docs.overview');
    }
  }
}
