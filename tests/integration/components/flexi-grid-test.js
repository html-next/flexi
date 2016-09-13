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
  let classNames = 'ember-view container-lg';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for huge');

  // desktop
  this.render(hbs`
  <div style={{widths.desktop}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);
  classNames = 'ember-view container-md';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for desktop');

  // tablet
  this.render(hbs`
  <div style={{widths.tablet}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);
  classNames = 'ember-view container-sm';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for tablet');

  // mobile
  this.render(hbs`
  <div style={{widths.mobile}}>
    {{#flexi-grid}}
      template block text
    {{/flexi-grid}}
  </div>
  `);
  classNames = 'ember-view container-xs';
  assert.equal(getElement(this).className, classNames, 'We rendered the right classes for mobile');
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
  let classNames = 'ember-view container-xs';

  assert.equal(getElement(this).tagName, 'GRID', 'We rendered a grid');
  assert.equal(getElement(this).className, classNames, 'The grid is responsive');
  assert.equal(this.$().text().trim(), 'template block text');
});
