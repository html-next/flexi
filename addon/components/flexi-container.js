import Ember from 'ember';
import layout from '../templates/components/flexi-container';

const {
  Component,
  computed,
  inject,
  run
  } = Ember;

export default Component.extend({
  layout,
  tagName: 'container',
  deviceLayout: inject.service('device/layout'),

  inserted: false,
  classNameBindings: ['breakpoints'],
  breakpoints: computed('inserted', 'deviceLayout.width', function() {
    if (!this.get('inserted')) {
      return 'breakpoint-unknown';
    }

    // TODO remove jQuery reliance
    let width = this.$().width();

    return this.get('deviceLayout.breakpoints')
      .filter((b) => width > b.begin)
      .map((b) => `container-${b.prefix}`)
      .join(' ');

  }),

  didInsertElement() {
    run.schedule('afterRender', () => {
      this.set('inserted', true);
    });
  },

  willDestroyElement() {
    this.set('inserted', false);
  }

});
