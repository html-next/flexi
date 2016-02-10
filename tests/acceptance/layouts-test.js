import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

const {
  run
  } = Ember;

moduleForAcceptance('Acceptance | layouts');

test('visiting /layout-test', function(assert) {
  visit('/layout-test');
  let deviceLayout = Dummy.__container__.lookup('service:device/layout'); // jshint ignore:line
  deviceLayout.set('width', 1500);

  andThen(() => {
    assert.equal(currentURL(), '/layout-test');

    assert.equal(find('h1.layout-test').text(), 'Huge!', 'The layout renders the huge layout');
    run(() => {
      deviceLayout.set('width', 800);
    });

    andThen(() => {
      assert.equal(find('h1.layout-test').text(), 'Desktop!', 'The layout renders the desktop layout');
      run(() => {
        deviceLayout.set('width', 500);
      });

      andThen(() => {
        assert.equal(find('h1.layout-test').text(), 'Tablet!', 'The layout renders the tablet layout');
        run(() => {
          deviceLayout.set('width', 100);
        });

        andThen(() => {
          assert.equal(find('h1.layout-test').text(), 'Mobile!', 'The layout renders the mobile layout');
        });
      });
    });
  });
});

