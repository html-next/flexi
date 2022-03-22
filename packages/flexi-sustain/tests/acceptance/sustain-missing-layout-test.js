import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';

// Sustain is not compatible with glimmer 2 yet
if (!hasEmberVersion(2, 10)) {

  moduleForAcceptance('Acceptance | sustain missing layout');

  test('Testing that sustain can be used with components without an explicit layout.', function(assert) {
    visit('/tests/sustain-no-layout');

    andThen(function() {
      assert.equal(currentURL(), '/tests/sustain-no-layout');

      let text = find('h1').text();
      assert.equal(text, 'Rendered!', 'We rendered the missing layout');
    });
  });
}

