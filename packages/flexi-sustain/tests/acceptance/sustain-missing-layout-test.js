import { module, test } from 'qunit';

import { visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

module('Acceptance | sustain missing layout', function (hooks) {
  setupApplicationTest(hooks);

  test('Testing that sustain can be used with components without an explicit layout.', async function (assert) {
    await visit('/tests/sustain-no-layout');

    assert.equal(currentURL(), '/tests/sustain-no-layout');

    const text = find('h1').text();
    assert.equal(text, 'Rendered!', 'We rendered the missing layout');
  });
});
