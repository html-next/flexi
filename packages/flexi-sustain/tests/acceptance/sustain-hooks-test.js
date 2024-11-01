import { module, skip } from 'qunit';

import { currentURL, settled, visit } from '@ember/test-helpers';

import { setupApplicationTest } from '../helpers/index';

module('Acceptance | sustain hooks', function (hooks) {
  setupApplicationTest(hooks);

  // need to come up with a good pattern for this
  // probably should be some form of integration test
  // else we should output the counts into the DOM somehow
  skip('Testing sustain-hooks', async function (assert) {
    await visit('/tests/sustain-hooks');

    assert.strictEqual(currentURL(), '/tests/sustain-hooks');

    const registry = this.owner.lookup('-view-registry:main');
    const component = registry['sustain-hooks-test'];

    assert.strictEqual(component.get('didMoveTriggeredCount'), 1, 'didMove triggers on initial insert');
    assert.strictEqual(component.get('didMoveEventCount'), 1, 'didMove event triggers on initial insert');

    assert.strictEqual(component.get('willMoveTriggeredCount'), 0, 'willMove does not trigger on initial insert');
    assert.strictEqual(component.get('willMoveEventCount'), 0, 'willMove event does not trigger on initial insert');

    assert.strictEqual(component.get('insertTriggeredCount'), 1, 'didInsertElement properly triggers its super');

    const controller = this.application.__container__.lookup('controller:tests/sustain-hooks');

    controller.set('showSustain', false);
    await settled();

    assert.strictEqual(component.get('willMoveTriggeredCount'), 1, 'willMove triggers when leaving a location');
    assert.strictEqual(component.get('willMoveEventCount'), 1, 'willMove event triggers when leaving a location');
  });
});
