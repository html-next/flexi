import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | classic layouts');

test('visiting /classic-layout-test', function(assert) {
  visit('/classic-layout-test');

  andThen(function() {
    assert.equal(currentURL(), '/classic-layout-test');
    assert.equal(find('h1.test-header').text(), 'Success!', 'The layout renders');
  });
});
