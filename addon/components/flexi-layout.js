import Ember from 'ember';
import layout from '../templates/components/flexi-layout';

const {
  Component,
  inject
  } = Ember;

export default Component.extend({
  layout,
  deviceLayout: inject.service('device/layout')
});
