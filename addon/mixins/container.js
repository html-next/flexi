import Ember from 'ember';

const {
  Mixin,
  computed,
  run,
  inject
  } = Ember;

export default Mixin.create({
  deviceLayout: inject.service('device/layout'),

  inserted: false,
  classNameBindings: ['breakpointClass'],
  breakpointClass: computed('inserted', 'deviceLayout.width', function() {
    if (!this.get('inserted')) {
      return '';
    }

    let width = this.element.clientWidth;
    let bps = this.get('deviceLayout.breakpoints');
    for (let i = 0; i < bps.length; i++) {
      if (width >= bps[i].begin) {
        return `container-${bps[i].prefix}`;
      }
    }
    return 'container-breakpoint-unavailable';
  }),

  didInsertElement() {
    this._super();
    run.schedule('afterRender', () => {
      this.set('inserted', true);
    });
  },

  willDestroyElement() {
    this._super();
    this.set('inserted', false);
  }
});
