import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:-sustains', 'Unit | Service | -sustains', {});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.expect(1);

  Ember.run(() => {
    let service = this.subject();
    assert.ok(service);
  });
});
