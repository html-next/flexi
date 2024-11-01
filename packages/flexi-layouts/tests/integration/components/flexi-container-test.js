import config from 'dummy/config/environment';
import hbs from 'htmlbars-inline-precompile';
import { module, skip, test } from 'qunit';

import { htmlSafe } from '@ember/template';
import { render } from '@ember/test-helpers';

import { setupRenderingTest } from '../../helpers/index';

const bp = {};
const widths = {};
const BP_PADDING = 5;

config.flexi.breakpoints.forEach(function (point) {
  bp[point.name] = point.begin + BP_PADDING;
  widths[point.name] = htmlSafe(`width: ${bp[point.name]}px;`);
});

module('Integration | Component | flexi container', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders in component form', async function (assert) {
    this.set('widths', widths);

    await render(hbs`
      <div style={{this.widths.huge}}>
        <FlexiContainer>
          template block text
        </FlexiContainer>
      </div>
    `);

    assert.dom('container').exists().hasText('template block text');
  });

  test('huge responsive containers are responsive', async function (assert) {
    this.set('widths', widths);

    // huge
    await render(hbs`
  <div style={{this.widths.huge}}>
    <FlexiContainer>
      template block text
    </FlexiContainer>
  </div>
  `);

    assert.dom('container').exists().hasClass('container-lg');

    // desktop
    await render(hbs`
  <div style={{this.widths.desktop}}>
    <FlexiContainer>
      template block text
    </FlexiContainer>
  </div>
  `);

    assert.dom('container').exists().hasClass('container-md');

    // tablet
    await render(hbs`
  <div style={{this.widths.tablet}}>
    <FlexiContainer>
      template block text
    </FlexiContainer>
  </div>
  `);

    assert.dom('container').exists().hasClass('container-sm');

    // mobile
    await render(hbs`
  <div style={{this.widths.mobile}}>
    <FlexiContainer>
      template block text
    </FlexiContainer>
  </div>
  `);

    assert.dom('container').exists().hasClass('container-xs');
  });

  skip('it does not throw an error when a container is destroyed during a rerender', async function (assert) {
    // Renders a component that destroys a container during a forced re-render.
    await render(hbs`
    {{tests/components/destroyed-container}}
  `);

    assert.expect(0);
  });
});
