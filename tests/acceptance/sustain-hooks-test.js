import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const {
  run
  } = Ember;

moduleForAcceptance('Acceptance | sustain hooks');

test('Testing sustain-hooks', function(assert) {
  visit('/tests/sustain-hooks');

  andThen(() => {
    assert.equal(currentURL(), '/tests/sustain-hooks');

    let registry = this.application.__container__.lookup('-view-registry:main') || Ember.View.views;
    let component = registry['sustain-hooks-test'];

    assert.ok(component.get('didMoveTriggered'), 'didMove triggers on initial insert');
    assert.ok(component.get('didMoveEvent'), 'didMove event triggers on initial insert');

    assert.notOk(component.get('willMoveTriggered'), 'willMove does not trigger on initial insert');
    assert.notOk(component.get('willMoveEvent'), 'willMove event does not trigger on initial insert');

    assert.ok(component.get('insertTriggered'), 'didInsertElement properly triggers its super');

    let controller = this.application.__container__.lookup('controller:tests/sustain-hooks');

    run(() => {
      controller.set('showSustain', false);
    });

    andThen(() => {
      assert.ok(component.get('willMoveTriggered'), 'willMove triggers when leaving a location');
      assert.ok(component.get('willMoveEvent'), 'willMove event triggers when leaving a location');
    });
  });
});
