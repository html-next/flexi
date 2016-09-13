import Ember from 'ember';

const {
  Mixin,
  computed,
  run,
  inject
  } = Ember;

export default Mixin.create({
  deviceLayout: inject.service('device/layout'),
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
