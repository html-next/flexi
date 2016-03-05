import Ember from 'ember';
import ContainerMixin from '../mixins/container';
import layout from '../templates/components/flexi-container';

const {
  Component
  } = Ember;

export default Component.extend(ContainerMixin, {
  layout,
  tagName: 'container'
});
