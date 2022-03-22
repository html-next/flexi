import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
const { run, View } = Ember;

// Sustain is not compatible with glimmer 2 yet
if (!hasEmberVersion(2, 10)) {
  moduleForAcceptance('Acceptance | sustain hooks');

  test('Testing sustain-hooks', function(assert) {
    visit('/tests/sustain-hooks');

    andThen(() => {
      assert.equal(currentURL(), '/tests/sustain-hooks');

      let registry = this.application.__container__.lookup('-view-registry:main') || View.views;
      let component = registry['sustain-hooks-test'];

      assert.equal(component.get('didMoveTriggeredCount'), 1, 'didMove triggers on initial insert');
      assert.equal(component.get('didMoveEventCount'), 1, 'didMove event triggers on initial insert');

      assert.equal(component.get('willMoveTriggeredCount'), 0, 'willMove does not trigger on initial insert');
      assert.equal(component.get('willMoveEventCount'), 0, 'willMove event does not trigger on initial insert');

      assert.equal(component.get('insertTriggeredCount'), 1, 'didInsertElement properly triggers its super');

      let controller = this.application.__container__.lookup('controller:tests/sustain-hooks');

      run(() => {
        controller.set('showSustain', false);
      });

      andThen(() => {
        assert.equal(component.get('willMoveTriggeredCount'), 1, 'willMove triggers when leaving a location');
        assert.equal(component.get('willMoveEventCount'), 1, 'willMove event triggers when leaving a location');
      });
    });
  });
}
