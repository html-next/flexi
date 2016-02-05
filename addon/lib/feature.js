import Ember from 'ember';
import appendRange from '../utils/dom/append-range';
import removeRange from '../utils/dom/remove-range';

const {
  computed,
  guidFor
  } = Ember;

export default Ember.Object.extend({
  _isFeatureFactory: true,

  id: computed(function() {
    return guidFor(this);
  }),

  leaveCopy: false,

  name: '',
  model: null,
  parent: null,
  range: null,

  component: null,

  render() {

  },

  move(to) {
    if (!this.range) {

    }
  },

  actions: {
    register(component) {

    },
    unregister(component) {

    }
  },

  init() {
    this._super();
  }
});
