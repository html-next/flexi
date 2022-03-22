import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import td from 'testdouble';
import { default as window } from 'ember-window-mock';

module('Unit | Service | device/layout', function(hooks) {
  setupTest(hooks);

  test('can check orientation of device', function(assert) {
    let service = this.owner.lookup('service:device/layout');
    service.set('width', 5000);
    service.set('height', 1000);
    assert.equal(service.get('orientationIsLandscape'), true);
    assert.equal(service.get('orientationIsPortrait'), false);

    service.set('width', 500);

    assert.equal(service.get('orientationIsLandscape'), false);
    assert.equal(service.get('orientationIsPortrait'), true);
  });

  test('triggers events for browser resize (width)', function(assert) {
    let listener = td.function('event listener');
    let currentWidthMock = td.function('current width');

    td.when(currentWidthMock()).thenReturn(100);

    let service = this.owner.factoryFor('service:device/layout').create({
      width: 100,
      height: 100,
      _currentWidth: currentWidthMock
    });

    td.when(currentWidthMock()).thenReturn(1000);

    service.on('width-change', listener);
    service.updateResolution();

    assert.equal(td.explain(listener).callCount, 1);
  });

  test('triggers events for browser resize (height)', function(assert) {
    let listener = td.function('event listener');
    let currentHeightMock = td.function('current height');

    td.when(currentHeightMock()).thenReturn(100);

    let service = this.owner.factoryFor('service:device/layout').create({
      width: 100,
      height: 100,
      _currentHeight: currentHeightMock
    });

    td.when(currentHeightMock()).thenReturn(1000);

    service.on('height-change', listener);
    service.updateResolution();

    assert.equal(td.explain(listener).callCount, 1);
  });

  test('triggers events for browser resize (resize)', function(assert) {
    let listener = td.function('event listener');
    let currentWidthMock = td.function('current width');
    let currentHeightMock = td.function('current height');

    td.when(currentWidthMock()).thenReturn(100);
    td.when(currentHeightMock()).thenReturn(100);

    let service = this.owner.factoryFor('service:device/layout').create({
      width: 100,
      height: 100,
      _currentWidth: currentWidthMock,
      _currentHeight: currentHeightMock
    });

    td.when(currentWidthMock()).thenReturn(1000);
    td.when(currentHeightMock()).thenReturn(1000);

    service.on('height-change', listener);
    service.on('width-change', listener);
    service.on('resize', listener);
    service.updateResolution();

    assert.equal(td.explain(listener).callCount, 3);
  });

  test('currentWidth and currentHeight use the correct values from the window', function(assert) {
    const service = this.owner.factoryFor('service:device/layout').create();

    window.screen.width = 100;
    window.innerWidth = 0;
    window.document.documentElement.clientWidth = null;
    assert.equal(
      service._currentWidth(),
      100,
      'Should ignore values of 0 or null'
    );

    window.innerWidth = 150;
    window.document.documentElement.clientWidth = 200;
    assert.equal(
      service._currentWidth(),
      100,
      'Should choose the smallest value'
    );

    window.screen.height = 100;
    window.innerHeight = 0;
    window.document.documentElement.clientHeight = null;
    assert.equal(
      service._currentHeight(),
      100,
      'Should ignore values of 0 or null'
    );

    window.innerHeight = 150;
    window.document.documentElement.clientHeight = 200;
    assert.equal(
      service._currentHeight(),
      100,
      'Should choose the smallest value'
    );
  });
});
