import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service('device/layout') device;

  redirect() {
    if (!this.device.isMobile) {
      this.transitionTo('docs.overview');
    }
  }
}
