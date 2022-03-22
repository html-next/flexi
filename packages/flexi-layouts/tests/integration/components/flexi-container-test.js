import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'dummy/config/environment';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
import { htmlSafe } from '@ember/string';

const bp = {};
const widths = {};

config.flexi.breakpoints.forEach(function(point) {
  bp[point.name] = point.begin + 5;
  widths[point.name] = htmlSafe(`width: ${bp[point.name]}px;`);
});

moduleForComponent('flexi-container', 'Integration | Component | flexi container', {
  integration: true
});

function getElement(context) {
  return context.$().get(0).firstElementChild.firstElementChild;
}

test('it renders in component form', function(assert) {
  this.set('widths', widths);

  this.render(hbs`
  <div style={{widths.huge}}>
    {{#flexi-container}}
      template block text
    {{/flexi-container}}
  </div>
  `);

  assert.equal(getElement(this).tagName, 'CONTAINER', 'We rendered a container');
  assert.equal(this.$().text().trim(), 'template block text');
});

test('huge responsive containers are responsive', function(assert) {
  this.set('widths', widths);

  // huge
  this.render(hbs`
  <div style={{widths.huge}}>
    {{#flexi-container}}
      template block text
    {{/flexi-container}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-lg'), 'We rendered the right classes for huge');

  // desktop
  this.render(hbs`
  <div style={{widths.desktop}}>
    {{#flexi-container}}
      template block text
    {{/flexi-container}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-md'), 'We rendered the right classes for desktop');

  // tablet
  this.render(hbs`
  <div style={{widths.tablet}}>
    {{#flexi-container}}
      template block text
    {{/flexi-container}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-sm'), 'We rendered the right classes for tablet');

  // mobile
  this.render(hbs`
  <div style={{widths.mobile}}>
    {{#flexi-container}}
      template block text
    {{/flexi-container}}
  </div>
  `);

  assert.ok(getElement(this).className.includes('container-xs'), 'We rendered the right classes for mobile');
});

test('it does not throw an error when a container is destroyed during a rerender', function(assert) {
  // Renders a component that destroys a container during a forced re-render.
  this.render(hbs`
    {{tests/components/destroyed-container}}
  `);

  assert.expect(0);
});

if (hasEmberVersion(2, 0)) {
  test('it renders a responsive container in angle bracket form', function(assert) {
    this.set('widths', widths);

    // Template block usage:"
    this.render(hbs`
    <div style={{widths.mobile}}>
      <container>
        template block text
      </container>
    </div>
    `);

    assert.equal(getElement(this).tagName, 'CONTAINER', 'We rendered a container');
    assert.ok(getElement(this).className.includes('container-xs'), 'The container is responsive');
    assert.equal(this.$().text().trim(), 'template block text');
  });
}
