import Ember from 'ember';

const {
  Helper,
  inject
  } = Ember;

export default Helper.extend({

  layoutService: inject.service('device/layout'),

  compute() {
    return this.get('layoutService');
  }
});
