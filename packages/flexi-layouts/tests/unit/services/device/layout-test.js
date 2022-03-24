/* eslint-disable no-magic-numbers */
import { module, test } from 'qunit';

import { setupTest } from 'ember-qunit';

module('Unit | Service | device/layout', function (hooks) {
  setupTest(hooks);

  test('can check orientation of device', function (assert) {
    const service = this.owner.lookup('service:device/layout');
    service.width = 5000;
    service.height = 1000;
    assert.true(service.orientationIsLandscape);
    assert.false(service.orientationIsPortrait);

    service.width = 500;

    assert.false(service.orientationIsLandscape);
    assert.true(service.orientationIsPortrait);
  });

  test('triggers events for browser resize (width)', function (assert) {
    const service = this.owner.lookup('service:device/layout');
    service.width = 100;
    service.height = 100;
    let callCount = 0;
    const cb = () => callCount++;

    service._currentWidth = () => 1000;

    service.on('width-change', cb);
    service.updateResolution();

    assert.strictEqual(callCount, 1, 'we triggered the event');
  });

  test('triggers events for browser resize (height)', function (assert) {
    const service = this.owner.lookup('service:device/layout');
    service.width = 100;
    service.height = 100;
    let callCount = 0;
    const cb = () => callCount++;

    service._currentHeight = () => 1000;

    service.on('height-change', cb);
    service.updateResolution();

    assert.strictEqual(callCount, 1, 'we triggered the event');
  });

  test('triggers events for browser resize (resize)', function (assert) {
    const service = this.owner.lookup('service:device/layout');
    service.width = 100;
    service.height = 100;
    let callCount1 = 0;
    const cb1 = () => callCount1++;
    let callCount2 = 0;
    const cb2 = () => callCount2++;
    let callCount3 = 0;
    const cb3 = () => callCount3++;

    service._currentHeight = () => 1000;
    service._currentWidth = () => 1000;

    service.on('height-change', cb1);
    service.on('width-change', cb2);
    service.on('resize', cb3);
    service.updateResolution();

    assert.strictEqual(callCount1, 1, 'we triggered the event');
    assert.strictEqual(callCount2, 1, 'we triggered the event');
    assert.strictEqual(callCount3, 1, 'we triggered the event');
  });

  test('currentWidth and currentHeight use the correct values from the window', function (assert) {
    const service = this.owner.factoryFor('service:device/layout').create();

    const window = (service.window = {
      screen: { width: 100, height: 100 },
      innerWidth: 0,
      innerHeight: 0,
      document: { documentElement: { clientWidth: null, clientHeight: null } },
    });

    window.screen.width = 100;
    window.innerWidth = 0;
    window.document.documentElement.clientWidth = null;
    assert.strictEqual(
      service._currentWidth(),
      100,
      'Should ignore values of 0 or null'
    );

    window.innerWidth = 150;
    window.document.documentElement.clientWidth = 200;
    assert.strictEqual(
      service._currentWidth(),
      100,
      'Should choose the smallest value'
    );

    window.screen.height = 100;
    window.innerHeight = 0;
    window.document.documentElement.clientHeight = null;
    assert.strictEqual(
      service._currentHeight(),
      100,
      'Should ignore values of 0 or null'
    );

    window.innerHeight = 150;
    window.document.documentElement.clientHeight = 200;
    assert.strictEqual(
      service._currentHeight(),
      100,
      'Should choose the smallest value'
    );
  });
});
