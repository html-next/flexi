import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Mixin.create({
  deviceLayout: service('device/layout'),
  width: 0,
  inserted: false,
  classNameBindings: ['breakpointClass'],
  breakpointClass: computed('inserted', 'width', function() {
    let bps = this.get('deviceLayout.breakpoints');

    if (!this.get('inserted')) {
      return `container-${bps[0].prefix}`;
    }

    let width = this.element.clientWidth;

    for (let i = 0; i < bps.length; i++) {
      if (width >= bps[i].begin) {
        return `container-${bps[i].prefix}`;
      }
    }
    return 'container-breakpoint-unavailable';
  }),

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
      this.get('deviceLayout')
        .monitor
        .addElementHandler(this.element, this._elementResize);
    });
  },

  willDestroyElement() {
    this._super();
    this.set('inserted', false);
    this.get('deviceLayout')
      .monitor
      .removeElementHandler(this.element, this._elementResize);
    this._elementResize = null;
  }
});
