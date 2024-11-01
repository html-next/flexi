/* eslint-disable qunit/no-conditional-assertions */
/* eslint-disable no-magic-numbers */
import { module, test } from 'qunit';

import { click, currentURL, findAll, visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

module('Acceptance | sustain', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /tests/sustain', async function (assert) {
    assert.expect(19);
    await visit('/tests/sustain');

    assert.strictEqual(currentURL(), '/tests/sustain', 'We transitioned to the initial route');

    const sustains = findAll('layout.sustain-test');
    assert.dom('h2.sustain-test').exists().hasText('I ought to be sustained');
    assert.dom('layout.sustain-test').exists({ count: 4 }).hasAttribute('id');
    assert.dom('.tagless-stuff').exists({ count: 2 });
    assert.dom('.has-model-foo').exists({ count: 2 });

    let hasModelFoo = findAll('.has-model-foo');

    if (hasModelFoo.length > 0) {
      assert.dom(hasModelFoo[0]).hasText('123');
      assert.dom(hasModelFoo[1]).hasText('abc');
    }

    await click('#next-sustain-test-page');

    assert.strictEqual(currentURL(), '/tests/sustain-b', 'We transitioned to the next route');

    assert.dom('h2.sustain-test').exists().hasText('I ought to be sustained');
    assert.dom('layout.sustain-test').exists({ count: 4 }).hasAttribute('id');
    const newSustains = findAll('layout.sustain-test');

    if (sustains.length > 1 && newSustains.length > 1) {
      assert.strictEqual(sustains[0], newSustains[0], 'we have the same element');
      assert.strictEqual(sustains[1], newSustains[1], 'we have the same element');
    }
    assert.dom('.tagless-stuff').exists({ count: 2 });
    hasModelFoo = findAll('.has-model-foo');

    if (hasModelFoo.length > 0) {
      assert.dom(hasModelFoo[0]).hasText('456');
      assert.dom(hasModelFoo[1]).hasText('xyz');
    }
  });
});
