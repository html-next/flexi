import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flexi-layout', 'Integration | Component | flexi layout', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  // Template block usage:"
  this.render(hbs`
    {{#flexi-layout}}
      template block text
    {{/flexi-layout}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
