import { run } from '@ember/runloop';

import { moduleFor, test } from 'ember-qunit';

moduleFor('service:-sustains', 'Unit | Service | -sustains', {});

// Replace this with your real tests.
test('it exists', function (assert) {
  assert.expect(1);

  run(() => {
    const service = this.subject();
    assert.ok(service);
  });
});
