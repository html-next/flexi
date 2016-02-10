import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flexi-grid', 'Integration | Component | flexi grid', {
  integration: true
});

function getElement(context) {
  return context.$().get(0).firstElementChild.firstElementChild;
}

test('it renders in component form', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  // Template block usage:"
  this.render(hbs`
  <div style="width: 10000px;">
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);

  assert.equal(getElement(this).tagName, 'GRID', 'We rendered a grid');
  assert.equal(this.$().text().trim(), 'template block text');
});

test('responsive grids are responsive', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  // huge
  this.render(hbs`
  <div style="width: 10000px;">
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);
  let classNames = 'ember-view breakpoint-xs breakpoint-sm breakpoint-md breakpoint-lg';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for huge');

  // desktop
  this.render(hbs`
  <div style="width: 900px;">
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);
  classNames = 'ember-view breakpoint-xs breakpoint-sm breakpoint-md';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for desktop');

  // tablet
  this.render(hbs`
  <div style="width: 500px;">
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);
  classNames = 'ember-view breakpoint-xs breakpoint-sm';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for tablet');

  // mobile
  this.render(hbs`
  <div style="width: 100px;">
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);
  classNames = 'ember-view breakpoint-xs';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for mobile');
});

test('it renders in angle bracket form', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  // Template block usage:"
  this.render(hbs`
  <div style="width: 100px;">
    <grid>
      template block text
    </grid>
  </div>
  `);

  assert.equal(getElement(this).tagName, 'GRID', 'We rendered a grid');
  assert.equal(getElement(this).className, '', 'The grid is not responsive');
  assert.equal(this.$().text().trim(), 'template block text');
});

test('it renders a responsive grid in angle bracket form', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  // Template block usage:"
  this.render(hbs`
  <div style="width: 100px;">
    <grid responsive>
      template block text
    </grid>
  </div>
  `);
  let classNames = 'ember-view breakpoint-xs';

  assert.equal(getElement(this).tagName, 'GRID', 'We rendered a grid');
  assert.equal(getElement(this).className, classNames, 'The grid is responsive');
  assert.equal(this.$().text().trim(), 'template block text');
});
