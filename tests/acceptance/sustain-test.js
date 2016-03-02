import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sustain');

test('visiting /tests/sustain', function(assert) {
  visit('/tests/sustain');

  andThen(() => {
    assert.equal(currentURL(), '/tests/sustain', 'We transitioned to the initial route');

    assert.equal(find('h2.sustain-test').text(), 'I ought to be sustained', 'We rendered the sustain');
    let id1 = find('layout.sustain-test').get(0).id;

    click('#next-sustain-test-page');

    andThen(() => {
      assert.equal(currentURL(), '/tests/sustain-b', 'We transitioned to the next route');

      assert.equal(find('h2.sustain-test').text(), 'I ought to be sustained', 'We rendered the sustain on the next page');
      let id2 = find('layout.sustain-test').get(0).id;

      assert.equal(id1, id2, 'We rendered the identical sustain');
    });

  });
});
