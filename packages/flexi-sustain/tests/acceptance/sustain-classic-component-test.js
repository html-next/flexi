import { module, test } from 'qunit';

import { visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

// Sustain is not compatible with glimmer 2 yet

module('Acceptance | sustain classic', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /tests/sustain-classic-component', async function (assert) {
    await visit('/tests/sustain-classic-component');

    assert.strictEqual(
      currentURL(),
      '/tests/sustain-classic-component',
      'We transitioned to the initial route'
    );

    assert.equal(
      find('h2.classic-component').eq(0).text(),
      'Classic Component',
      'We rendered the sustain'
    );
  });
});
