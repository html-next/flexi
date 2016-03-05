import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:-sustains', 'Unit | Service | -sustains', {
  // Specify the other units that are required for this test.
  needs: ['component:sustainables-support']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.expect(1);

  Ember.run(() => {
    let service = this.subject();
    assert.ok(service);
  });
});
