import { moduleFor, test } from 'ember-qunit';
import run from 'ember-runloop';

moduleFor('service:-sustains', 'Unit | Service | -sustains', {});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.expect(1);

  run(() => {
    let service = this.subject();
    assert.ok(service);
  });
});
