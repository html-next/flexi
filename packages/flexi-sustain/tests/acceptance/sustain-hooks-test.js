import { module, test } from 'qunit';

import { settled, visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

module('Acceptance | sustain hooks', function (hooks) {
  setupApplicationTest(hooks);

  test('Testing sustain-hooks', async function (assert) {
    await visit('/tests/sustain-hooks');

    assert.equal(currentURL(), '/tests/sustain-hooks');

    const registry =
      this.application.__container__.lookup('-view-registry:main') ||
      View.views;
    const component = registry['sustain-hooks-test'];

    assert.equal(
      component.get('didMoveTriggeredCount'),
      1,
      'didMove triggers on initial insert'
    );
    assert.equal(
      component.get('didMoveEventCount'),
      1,
      'didMove event triggers on initial insert'
    );

    assert.equal(
      component.get('willMoveTriggeredCount'),
      0,
      'willMove does not trigger on initial insert'
    );
    assert.equal(
      component.get('willMoveEventCount'),
      0,
      'willMove event does not trigger on initial insert'
    );

    assert.equal(
      component.get('insertTriggeredCount'),
      1,
      'didInsertElement properly triggers its super'
    );

    const controller = this.application.__container__.lookup(
      'controller:tests/sustain-hooks'
    );

    run(() => {
      controller.set('showSustain', false);
    });
    await settled();

    assert.equal(
      component.get('willMoveTriggeredCount'),
      1,
      'willMove triggers when leaving a location'
    );
    assert.equal(
      component.get('willMoveEventCount'),
      1,
      'willMove event triggers when leaving a location'
    );
  });
});
