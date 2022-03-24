import { module, test } from 'qunit';

import { setupTest } from '../../helpers/index';

module('Unit | Service | -sustains', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    assert.expect(1);

    const service = this.owner.lookup('service:-sustains');

    assert.ok(service);
  });
});
