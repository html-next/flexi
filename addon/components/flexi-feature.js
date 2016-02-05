import Ember from 'ember';
import layout from '../templates/components/flexi-feature';

const {
  assert,
  Component,
  inject
  } = Ember;

const component = Component.extend({
  layout,
  model: null,
  feature: null,
  features: inject.service('-features'),

  resolveFeature() {
    const featureName = this.feature;
    assert("You must provide the name of a feature as the first param to the feature helper", this.feature);

    const feature = getOwner(this).lookup(`feature:${featureName}`);

  },

  init() {
    this._super();
    this.resolveDeature();
  }
});

component.reopenClass({
  positionalParams: ['feature', 'model']
});

export default component;
