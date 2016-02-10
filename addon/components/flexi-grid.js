import Component from './flexi-container';
import layout from '../templates/components/flexi-grid';

export default Component.extend({
  layout,
  tagName: 'grid',
  attributeBindings: ['responsive'],
  responsive: true
});
