import { module, test } from 'qunit';

import { currentURL, visit } from '@ember/test-helpers';

import { find } from 'ember-native-dom-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | classic layouts', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /classic-layout-testroute', async function (assert) {
    await visit('/classic-layout-testroute');

    assert.strictEqual(currentURL(), '/classic-layout-testroute');
    assert.strictEqual(
      find('h1.test-header').textContent,
      'Success!',
      'The layout renders'
    );
  });
});
