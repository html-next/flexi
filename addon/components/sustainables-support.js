import Ember from 'ember';
import layout from '../templates/components/sustainables-support';
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
  tagName: 'sustains-support',
  '-sustains': inject.service('-sustains'),
  sustains: computed.alias('-sustains._sustains'),
  attributeBindings: ['style'],
  style: new SafeString('display: none; width: 0; height: 0; opacity: 0; visibility: hidden;')
});
