import Component from '@ember/component';
import ContainerMixin from '../mixins/container';
import layout from '../templates/components/flexi-container';

export default Component.extend(ContainerMixin, {
  layout,
  tagName: 'container'
});
