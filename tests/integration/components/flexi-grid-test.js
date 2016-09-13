import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'dummy/config/environment';
import Ember from 'ember';

const {
  htmlSafe
  } = Ember.String;

const bp = {};
const widths = Ember.Object.create({});

config.flexi.breakpoints.forEach(function(point) {
  bp[point.name] = point.begin + 5;
  widths.set(point.name, htmlSafe(`width: ${bp[point.name]}px;`));
});

moduleForComponent('flexi-grid', 'Integration | Component | flexi grid', {
  integration: true
});

function getElement(context) {
  return context.$().get(0).firstElementChild.firstElementChild;
}

test('it renders in component form', function(assert) {

  this.set('widths', widths);
  this.render(hbs`
  <div style={{widths.huge}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);

  assert.equal(getElement(this).tagName, 'GRID', 'We rendered a grid');
  assert.equal(this.$().text().trim(), 'template block text');
});

test('responsive grids are responsive', function(assert) {
  this.set('widths', widths);

  // huge
  this.render(hbs`
  <div style={{widths.huge}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-lg'), 'We rendered the right classes for huge');

  // desktop
  this.render(hbs`
  <div style={{widths.desktop}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-md'), 'We rendered the right classes for desktop');

  // tablet
  this.render(hbs`
  <div style={{widths.tablet}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-sm'), 'We rendered the right classes for tablet');

  // mobile
  this.render(hbs`
  <div style={{widths.mobile}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-xs'), 'We rendered the right classes for mobile');
});

test('it renders in angle bracket form', function(assert) {
  this.set('widths', widths);

  this.render(hbs`
  <div style={{widths.mobile}}>
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
  this.set('widths', widths);

  this.render(hbs`
  <div style={{widths.mobile}}>
    <grid responsive>
      template block text
    </grid>
  </div>
  `);

  assert.equal(getElement(this).tagName, 'GRID', 'We rendered a grid');
  assert.ok(getElement(this).className.includes('container-xs'), 'The grid is responsive');
  assert.equal(this.$().text().trim(), 'template block text');
});
