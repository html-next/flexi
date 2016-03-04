import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

function getOwner(context) {
  return context.application.__deprecatedInstance__ || context.application.__container__;
}

const {
  run
  } = Ember;

moduleForAcceptance('Acceptance | layouts', {
  beforeEach(assert) {
    assert.deviceLayout = getOwner(this).lookup('service:device/layout');
  }
});

test('visiting /tests/layouts', function(assert) {
  visit('/tests/layouts');
  let { deviceLayout } = assert;
  let breakpoints = deviceLayout.get('breakpoints');
  let bp = {};

  breakpoints.forEach(function(point) {
    bp[point.name] = point.begin + 5;
  });

  deviceLayout.set('width', bp.huge);

  andThen(() => {
    assert.equal(currentURL(), '/tests/layouts');

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

