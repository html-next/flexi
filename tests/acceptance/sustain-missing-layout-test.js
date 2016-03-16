import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sustain missing layout');

test('Testing that sustain can be used with components without an explicit layout.', function(assert) {
  visit('/tests/sustain-no-layout');

  andThen(function() {
    assert.equal(currentURL(), '/tests/sustain-no-layout');

    let text = find('h1').text();
    assert.equal(text, 'Rendered!', 'We rendered the missing layout');
  });
});

