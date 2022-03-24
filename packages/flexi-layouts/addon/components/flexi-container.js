import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';

export default class extends Component {
  @service('device/layout') deviceLayout;

  @tracked width = 0;
  @tracked inserted = false;
  container = null;

  @cached
  get breakpointClass() {
    const bps = this.deviceLayout.breakpoints;

    if (!this.inserted) {
      return `container-${bps[0].prefix}`;
    }

    const width = this.width || this.container.clientWidth;

    for (let i = 0; i < bps.length; i++) {
      if (width >= bps[i].begin) {
        return `container-${bps[i].prefix}`;
      }
    }
    return 'container-breakpoint-unavailable';
  }

  @action
  setupElement(element) {
    this.container = element;
    this.inserted = true;
    this.deviceLayout.monitor.addElementHandler(element, (dims) => {
      this.width = dims.width;
    });
  }

  willDestroy(...args) {
    super.willDestroy(...args);
    this.inserted = false;
    this.deviceLayout.monitor.removeElementHandler(this.container);
    this.container = null;
  }
}
