/* eslint-disable no-magic-numbers */
import { module, test } from 'qunit';

import { currentURL, findAll, visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

module('Acceptance | sustain labels', function (hooks) {
  setupApplicationTest(hooks);

  test('Testing that multiple instances of a component can be sustained when labels are used.', async function (assert) {
    await visit('/tests/sustain-labels');

    assert.strictEqual(currentURL(), '/tests/sustain-labels');

    const conditions = findAll('h1');
    assert.dom(conditions[0]).hasText('Rendered!');
    assert.dom(conditions[1]).hasText('Rendered!');
    assert.dom(conditions[2]).hasText('Rendered!');
  });

  test('Testing that a labeled component is recycled.', async function (assert) {
    await visit('/tests/sustain-labels-2');

    assert.strictEqual(currentURL(), '/tests/sustain-labels-2');
    assert.dom('.label-test-condition:nth-of-type(1) h1').doesNotExist();
    assert.dom('.label-test-condition:nth-of-type(2) h1').doesNotExist();
    assert.dom('.label-test-condition:nth-of-type(3) h1').hasText('Rendered!');
    assert.dom('.label-test-condition:nth-of-type(4) h1').hasText('Rendered!');
  });
});
