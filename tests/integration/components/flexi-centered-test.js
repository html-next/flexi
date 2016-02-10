import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flexi-centered', 'Integration | Component | flexi centered', {
  integration: true
});

function getElement(context) {
  return context.$().get(0).firstElementChild;
}

test('it renders as a component', function(assert) {

  this.render(hbs`
    {{#flexi-centered}}
      template block text
    {{/flexi-centered}}
  `);

  assert.equal(getElement(this).tagName, 'CENTERED', 'We rendered a <centered>');
  assert.equal(getElement(this).firstElementChild.tagName, 'CENTERED-BOX', 'We rendered a <centered-box>');
  assert.equal(getElement(this).firstElementChild.firstElementChild.tagName, 'CENTERED-CONTENT', 'We rendered a <centered-content>');
  assert.equal(this.$().text().trim(), 'template block text');

});

test('it renders as a block element', function(assert) {

  this.render(hbs`
    <centered>
      template block text
    </centered>
  `);

  assert.equal(getElement(this).tagName, 'CENTERED', 'We rendered a <centered>');
  assert.equal(getElement(this).firstElementChild.tagName, 'CENTERED-BOX', 'We rendered a <centered-box>');
  assert.equal(getElement(this).firstElementChild.firstElementChild.tagName, 'CENTERED-CONTENT', 'We rendered a <centered-content>');
  assert.equal(this.$().text().trim(), 'template block text');

});
