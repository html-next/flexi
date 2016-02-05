import Ember from 'ember';
import layout from '../templates/components/features-support';
import FragmentRendering from '../mixins/render-into-fragment';

const {
  Component,
  computed,
  Handlebars,
  inject
  } = Ember;

const {
  SafeString
  } = Handlebars;

export default Component.extend(FragmentRendering, {
  layout,
  tagName: 'features-support',
  '-features': inject.service('-features'),
  structures: computed.alias('-features._features'),
  attributeBindings: ['style'],
  style: new SafeString('display: none; width: 0; height: 0; opacity: 0; visibility: hidden;')
});
