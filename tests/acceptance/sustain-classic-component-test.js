import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sustain classic');

test('visiting /tests/sustain-classic-component', function(assert) {
  visit('/tests/sustain-classic-component');

  andThen(function() {
    assert.equal(currentURL(), '/tests/sustain-classic-component', 'We transitioned to the initial route');

    assert.equal(find('h2.classic-component').eq(0).text(), 'Classic Component', 'We rendered the sustain');
  });
});
