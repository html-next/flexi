import { module, test } from 'qunit';

import { currentURL, visit } from '@ember/test-helpers';

import { find } from 'ember-native-dom-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | classic layouts', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /classic-layout-test', async function (assert) {
    await visit('/classic-layout-test');

    assert.equal(currentURL(), '/classic-layout-test');
    assert.equal(
      find('h1.test-header').textContent,
      'Success!',
      'The layout renders'
    );
  });
});
