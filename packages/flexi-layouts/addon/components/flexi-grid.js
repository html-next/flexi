import Component from '@ember/component';

import ContainerMixin from '../mixins/container';
import layout from '../templates/components/flexi-grid';

export default Component.extend(ContainerMixin, {
  layout,
  tagName: 'grid',
  attributeBindings: ['responsive'],
  responsive: true,
});
