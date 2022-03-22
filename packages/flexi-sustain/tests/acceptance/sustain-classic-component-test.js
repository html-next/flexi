import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';

// Sustain is not compatible with glimmer 2 yet
if (!hasEmberVersion(2, 10)) {
  moduleForAcceptance('Acceptance | sustain classic');

  test('visiting /tests/sustain-classic-component', function(assert) {
    visit('/tests/sustain-classic-component');

    andThen(function() {
      assert.equal(currentURL(), '/tests/sustain-classic-component', 'We transitioned to the initial route');

      assert.equal(find('h2.classic-component').eq(0).text(), 'Classic Component', 'We rendered the sustain');
    });
  });
}
