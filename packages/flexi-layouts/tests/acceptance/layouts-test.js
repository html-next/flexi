import { module, test } from 'qunit';

import { run } from '@ember/runloop';
import { currentURL, visit } from '@ember/test-helpers';

import { find } from 'ember-native-dom-helpers';
import { setupApplicationTest } from 'ember-qunit';

let deviceLayout;

module('Acceptance | layouts', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    deviceLayout = this.owner.lookup('service:device/layout');
  });

  test('visiting /tests/layouts', async function (assert) {
    await visit('/tests/layouts');
    const breakpoints = deviceLayout.get('breakpoints');
    const bp = {};

    breakpoints.forEach(function (point) {
      bp[point.name] = point.begin + 5;
    });

    deviceLayout.set('width', bp.huge);

    assert.equal(currentURL(), '/tests/layouts');

    assert.equal(
      find('h1.layout-test').textContent,
      'Huge!',
      `The layout renders the huge layout when width is ${bp.huge}`
    );
    run(() => {
      deviceLayout.set('width', bp.desktop);
    });

    assert.equal(
      find('h1.layout-test').textContent,
      'Desktop!',
      `The layout renders the desktop layout when width is ${bp.desktop}`
    );
    run(() => {
      deviceLayout.set('width', bp.tablet);
    });

    assert.equal(
      find('h1.layout-test').textContent,
      'Tablet!',
      `The layout renders the tablet layout when width is ${bp.tablet}`
    );
    run(() => {
      deviceLayout.set('width', bp.mobile);
    });

    assert.equal(
      find('h1.layout-test').textContent,
      'Mobile!',
      `The layout renders the mobile layout when width is ${bp.mobile}`
    );
  });
});
