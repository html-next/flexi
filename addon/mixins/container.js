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
    let breakpoints = this.get('deviceLayout.orderedBreakpoints');
    return breakpoints.reduce((bp) => {

    });

    return this.get('deviceLayout.breakpoints')
      .filter((b) => width > b.begin)
      .map((b) => `container-${b.prefix}`)
      .join(' ');

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
