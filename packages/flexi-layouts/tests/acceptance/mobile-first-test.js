import { module, test } from 'qunit';

import { currentURL, settled, visit } from '@ember/test-helpers';

import { find } from 'ember-native-dom-helpers';
import { setupApplicationTest } from 'ember-qunit';

let deviceLayout;
const BP_PADDING = 5;

module('Acceptance | mobile-first', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    deviceLayout = this.owner.lookup('service:device/layout');
  });

  test('Breakpoints fall back to the closest defined breakpoint', async function (assert) {
    const breakpoints = deviceLayout.get('breakpoints');
    const bp = {};

    breakpoints.forEach(function (point) {
      bp[point.name] = point.begin + BP_PADDING;
    });

    deviceLayout.set('width', bp.mobile);

    await visit('/tests/mobile-first');

    assert.strictEqual(currentURL(), '/tests/mobile-first');

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Mobile!',
      `The layout renders the mobile layout when width is ${bp.mobile}`
    );
    deviceLayout.width = bp.tablet;
    await settled();

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Mobile!',
      `The layout still renders the mobile layout when width is ${bp.tablet} (no tablet layout defined)`
    );
    deviceLayout.width = bp.desktop;
    await settled();

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Desktop!',
      `The layout renders the desktop layout when width is ${bp.desktop}`
    );
    deviceLayout.width = bp.huge;
    await settled();

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Desktop!',
      `The layout renders the desktop layout when width is ${bp.huge}`
    );
  });
});
