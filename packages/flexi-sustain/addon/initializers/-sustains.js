import Ember from 'ember';

const parts = Ember.VERSION.split('.');
const isOldInitializerAPI =
  parts[0] === '1' && Number.parseInt(parts[1], 10) < 10;

export function initialize(container) {
  if (isOldInitializerAPI) {
    container.lookup('service:-sustains');
  }
}

export default {
  name: '-sustains',
  initialize,
};
