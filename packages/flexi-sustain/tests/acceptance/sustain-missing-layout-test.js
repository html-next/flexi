import { module, test } from 'qunit';

import { currentURL, visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

module('Acceptance | sustain missing layout', function (hooks) {
  setupApplicationTest(hooks);

  test('Testing that sustain can be used with components without an explicit layout.', async function (assert) {
    await visit('/tests/sustain-no-layout');

    assert.strictEqual(currentURL(), '/tests/sustain-no-layout');

    assert.dom('h1').exists().hasText('Rendered!');
  });
});
