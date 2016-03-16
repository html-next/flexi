import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

function getOwner(context) {
  return context.application.__deprecatedInstance__ || context.application.__container__;
}

const {
  run
  } = Ember;

moduleForAcceptance('Acceptance | mobile-first', {
  beforeEach(assert) {
    assert.deviceLayout = getOwner(this).lookup('service:device/layout');
  }
});

test('Breakpoints fall back to the closest defined breakpoint', function(assert) {
  let { deviceLayout } = assert;
  let breakpoints = deviceLayout.get('breakpoints');
  let bp = {};

  breakpoints.forEach(function(point) {
    bp[point.name] = point.begin + 5;
  });

  visit('/tests/mobile-first');

  deviceLayout.set('width', bp.mobile);

  andThen(function() {
    assert.equal(currentURL(), '/tests/mobile-first');

    assert.equal(find('h1.layout-test').text(), 'Mobile!', `The layout renders the mobile layout when width is ${bp.mobile}`);
    run(() => {
      deviceLayout.set('width', bp.tablet);
    });

    andThen(() => {
      assert.equal(find('h1.layout-test').text(), 'Mobile!', `The layout still renders the mobile layout when width is ${bp.tablet} (no tablet layout defined)`);
      run(() => {
        deviceLayout.set('width', bp.desktop);
      });

      andThen(() => {
        assert.equal(find('h1.layout-test').text(), 'Desktop!', `The layout renders the desktop layout when width is ${bp.desktop}`);
        run(() => {
          deviceLayout.set('width', bp.huge);
        });

        andThen(() => {
          assert.equal(find('h1.layout-test').text(), 'Desktop!', `The layout renders the desktop layout when width is ${bp.huge}`);
        });

      });
    });

  });
});
