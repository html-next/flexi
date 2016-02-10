import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sustain');

test('visiting /sustain-test', function(assert) {
  visit('/sustain-test');

  andThen(() => {
    assert.equal(currentURL(), '/sustain-test');

    assert.equal(find('h2.sustain-test').text(), 'I ought to be sustained', 'We rendered the sustain');
    let id1 = find('layout.sustain-test').get(0).id;

    click('#next-sustain-test-page');

    andThen(() => {
      assert.equal(currentURL(), '/sustain-test-b');

      assert.equal(find('h2.sustain-test').text(), 'I ought to be sustained', 'We rendered the sustain on the next page');
      let id2 = find('layout.sustain-test').get(0).id;

      assert.equal(id1, id2, 'We rendered the identical sustain');
    });

  });
});
