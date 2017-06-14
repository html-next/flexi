'use strict';

define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/blueprints/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/blueprints/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/blueprints/snippets/generate.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/blueprints/snippets/generate.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/components/nav-banner/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/components/nav-banner/component.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/components/nav-menu/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/components/nav-menu/component.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/container-css/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/container-css/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/installation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/installation/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/installation/snippets/install.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/installation/snippets/install.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/layout-attributes/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/layout-attributes/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/layout-components/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/layout-components/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/layout-elements/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/layout-elements/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/layout-service/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/layout-service/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/layouts-overview/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/layouts-overview/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/media-css/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/media-css/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/overview/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/overview/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/settings/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/settings/route.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/settings/snippets/settings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/settings/snippets/settings.js should pass ESLint\n\n');
  });

  QUnit.test('routes/docs/sustain/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/docs/sustain/route.js should pass ESLint\n\n');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember-runloop'], function (exports, _emberRunloop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    (0, _emberRunloop.default)(application, 'destroy');
  }
});
define("dummy/tests/helpers/get-owner", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getOwner;
  function getOwner(context) {
    var _context = context.application.__deprecatedInstance__;
    if (!_context || !_context.lookup) {
      _context = context.application.__container__;
    }
    return _context;
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = _ember.default.RSVP.resolve;
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'ember-platform', 'ember-runloop', 'dummy/app', 'dummy/config/environment'], function (exports, _emberPlatform, _emberRunloop, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = (0, _emberPlatform.assign)({}, _environment.default.APP);
    attributes = (0, _emberPlatform.assign)(attributes, attrs); // use defaults, but you can override;

    (0, _emberRunloop.default)(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/get-owner.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-owner.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
