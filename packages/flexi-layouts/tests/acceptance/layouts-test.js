import { module, test } from 'qunit';

import { currentURL, settled, visit } from '@ember/test-helpers';

import { find } from 'ember-native-dom-helpers';
import { setupApplicationTest } from 'ember-qunit';

let deviceLayout;
const BP_PADDING = 5;

module('Acceptance | layouts', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    deviceLayout = this.owner.lookup('service:device/layout');
  });

  test('visiting /tests/layouts', async function (assert) {
    const { breakpoints } = deviceLayout;
    const bp = {};

    breakpoints.forEach(function (point) {
      bp[point.name] = point.begin + BP_PADDING;
    });
    deviceLayout.width = bp.huge;

    await visit('/tests/layouts');
    assert.strictEqual(currentURL(), '/tests/layouts');

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Huge!',
      `The layout renders the huge layout when width is ${bp.huge}`
    );
    deviceLayout.width = bp.desktop;
    await settled();

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Desktop!',
      `The layout renders the desktop layout when width is ${bp.desktop}`
    );
    deviceLayout.width = bp.tablet;
    await settled();

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Tablet!',
      `The layout renders the tablet layout when width is ${bp.tablet}`
    );
    deviceLayout.width = bp.mobile;
    await settled();

    assert.strictEqual(
      find('h1.layout-test').textContent,
      'Mobile!',
      `The layout renders the mobile layout when width is ${bp.mobile}`
    );
  });
});
