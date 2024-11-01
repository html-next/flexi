import { module, test } from 'qunit';

import { currentURL, visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

module('Acceptance | sustain classic', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /tests/sustain-classic-component', async function (assert) {
    await visit('/tests/sustain-classic-component');

    assert.strictEqual(currentURL(), '/tests/sustain-classic-component', 'We transitioned to the initial route');

    assert.dom('h2.classic-component').exists().hasText('Classic Component');
  });
});
