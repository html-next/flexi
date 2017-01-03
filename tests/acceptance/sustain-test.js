import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
import lessThanEmberVersion from '../../tests/helpers/less-than-ember-version';

// Sustain is not compatible with glimmer 2 yet
if (lessThanEmberVersion(2, 10)) {
  moduleForAcceptance('Acceptance | sustain');

  test('visiting /tests/sustain', function(assert) {
    visit('/tests/sustain');

    andThen(() => {
      assert.equal(currentURL(), '/tests/sustain', 'We transitioned to the initial route');

      assert.equal(find('h2.sustain-test').eq(0).text(), 'I ought to be sustained', 'We rendered the sustain');
      let id1 = find('layout.sustain-test').get(0).id;
      let id2 = find('layout.sustain-test').get(1).id;
      let children = find('.tagless-stuff');

      assert.ok(id2, 'we found two IDs');
      assert.equal(children.length, 2, 'we have two tagless children');

      if (hasEmberVersion(2, 0)) {
        assert.equal(find('.has-model-foo').text(), '123');
        assert.equal(find('.has-anonymous-model-foo').text(), 'abc');
      }

      click('#next-sustain-test-page');

      andThen(() => {
        assert.equal(currentURL(), '/tests/sustain-b', 'We transitioned to the next route');

        assert.equal(find('h2.sustain-test').eq(0).text(), 'I ought to be sustained', 'We rendered the sustain on the next page');
        let id3 = find('layout.sustain-test').get(0).id;
        let id4 = find('layout.sustain-test').get(1).id;
        let children = find('.tagless-stuff');

        assert.ok(id4, 'we found two IDs');
        assert.equal(children.length, 2, 'we still have two tagless children');

        if (hasEmberVersion(2, 0)) {
          assert.equal(find('.has-model-foo').text(), '456');
          assert.equal(find('.has-anonymous-model-foo').text(), 'xyz');
        }

        assert.equal(id1, id3, 'We rendered the identical sustain');
        assert.equal(id2, id4, 'We rendered the identical tagless sustain');
      });

    });
  });
}
