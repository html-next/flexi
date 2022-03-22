import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Mixin.create({
  deviceLayout: service('device/layout'),
  width: 0,
  inserted: false,
  classNameBindings: ['breakpointClass'],
  breakpointClass: computed(
    'deviceLayout.breakpoints',
    'element.clientWidth',
    'inserted',
    'width',
    function () {
      const bps = this.get('deviceLayout.breakpoints');

      if (!this.inserted) {
        return `container-${bps[0].prefix}`;
      }

      const width = this.element.clientWidth;

      for (let i = 0; i < bps.length; i++) {
        if (width >= bps[i].begin) {
          return `container-${bps[i].prefix}`;
        }
      }
      return 'container-breakpoint-unavailable';
    }
  ),

  _elementResize: null,
  elementResize(dims) {
    this.set('width', dims.width);
  },

  didInsertElement() {
    this._super();
    this._elementResize = this.elementResize.bind(this);

    run.schedule('afterRender', () => {
      // Ember before v2.10 can arrive in afterRender with a null element.
      // Details here: https://github.com/html-next/flexi/issues/101
      if (this.isDestroying) {
        return;
      }

      this.set('inserted', true);
      this.deviceLayout.monitor.addElementHandler(
        this.element,
        this._elementResize
      );
    });
  },

  willDestroyElement() {
    this._super();
    this.set('inserted', false);
    this.deviceLayout.monitor.removeElementHandler(
      this.element,
      this._elementResize
    );
    this._elementResize = null;
  },
});
