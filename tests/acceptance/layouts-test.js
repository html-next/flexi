import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

const {
  run
  } = Ember;

moduleForAcceptance('Acceptance | layouts', {
  beforeEach(assert) {
    assert.deviceLayout = this.application.__container__.lookup('service:device/layout');
  }
});

test('visiting /layout-test', function(assert) {
  visit('/layout-test');
  let { deviceLayout } = assert;
  let breakpoints = deviceLayout.get('breakpoints');
  let bp = {};
  breakpoints.forEach(function(point) {
    bp[point.name] = point.begin + 5;
  });

  deviceLayout.set('width', bp.huge);

  andThen(() => {
    assert.equal(currentURL(), '/layout-test');

    assert.equal(find('h1.layout-test').text(), 'Huge!', `The layout renders the huge layout when width is ${bp.huge}`);
    run(() => {
      deviceLayout.set('width', bp.desktop);
    });

    andThen(() => {
      assert.equal(find('h1.layout-test').text(), 'Desktop!', `The layout renders the desktop layout when width is ${bp.desktop}`);
      run(() => {
        deviceLayout.set('width', bp.tablet);
      });

      andThen(() => {
        assert.equal(find('h1.layout-test').text(), 'Tablet!', `The layout renders the tablet layout when width is ${bp.tablet}`);
        run(() => {
          deviceLayout.set('width', bp.mobile);
        });

        andThen(() => {
          assert.equal(find('h1.layout-test').text(), 'Mobile!', `The layout renders the mobile layout when width is ${bp.mobile}`);
        });
      });
    });
  });
});

