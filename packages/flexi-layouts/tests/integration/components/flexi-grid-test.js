import config from 'dummy/config/environment';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

import EmberObject from '@ember/object';
import { htmlSafe } from '@ember/string';
import { render, settled } from '@ember/test-helpers';

import { setupRenderingTest } from '../../helpers';

const bp = {};
const widths = EmberObject.create({});
const BP_PADDING = 5;

config.flexi.breakpoints.forEach(function (point) {
  bp[point.name] = point.begin + BP_PADDING;
  widths.set(point.name, htmlSafe(`width: ${bp[point.name]}px;`));
});

module('Integration | Component | flexi grid', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders in component form', async function (assert) {
    this.set('widths', widths);
    await render(hbs`
  <div style={{this.widths.huge}}>
    <FlexiGrid>
      template block text
    </FlexiGrid>
  </div>
  `);

    assert.dom('grid').exists().hasAttribute('responsive').hasClass('container-lg').hasText('template block text');
  });

  test('responsive grids are responsive', async function (assert) {
    this.set('currentWidth', widths.huge);

    await render(hbs`
    <div style={{this.currentWidth}}>
      <FlexiGrid>
        template block text
      </FlexiGrid>
    </div>
    `);

    assert.dom('grid').exists().hasClass('container-lg').hasText('template block text');

    this.set('currentWidth', widths.desktop);
    await settled();

    assert.dom('grid').exists().hasClass('container-md').hasText('template block text');

    this.set('currentWidth', widths.tablet);
    await settled();

    assert.dom('grid').exists().hasClass('container-sm').hasText('template block text');

    this.set('currentWidth', widths.mobile);
    await settled();

    assert.dom('grid').exists().hasClass('container-xs').hasText('template block text');
  });

  test('it renders in angle bracket form', async function (assert) {
    this.set('widths', widths);

    await render(hbs`
  <div style={{widths.mobile}}>
    <grid>
      template block text
    </grid>
  </div>
  `);

    assert
      .dom('grid')
      .exists()
      .doesNotHaveAttribute('responsive')
      .doesNotHaveAttribute('class')
      .hasText('template block text');
  });
});
