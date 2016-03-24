import { moduleFor, test } from 'ember-qunit';

moduleFor('service:device/layout', 'Unit | Service | device/layout', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('can check orientation of device', function(assert) {
  let service = this.subject();
  service.set('width', 5000);
  service.set('height', 1000);
  assert.equal(service.get('orientationIsLandscape'), true);
  assert.equal(service.get('orientationIsPortrait'), false);

  service.set('width', 500);

  assert.equal(service.get('orientationIsLandscape'), false);
  assert.equal(service.get('orientationIsPortrait'), true);
});
