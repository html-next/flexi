"use strict";



define('dummy/app', ['exports', 'ember-application', 'ember', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _emberApplication, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = _emberApplication.default.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define("dummy/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _lfGetOutletState) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _lfGetOutletState.default;
    }
  });
});
define("dummy/components/code-snippet", ["exports", "ember", "dummy/snippets"], function (exports, _ember, _snippets) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /* global require */
  var Highlight = self.require('highlight.js');

  exports.default = _ember.default.Component.extend({
    tagName: 'pre',
    classNameBindings: ['language'],
    unindent: true,

    _unindent: function _unindent(src) {
      if (!this.get('unindent')) {
        return src;
      }
      var match,
          min,
          lines = src.split("\n").filter(function (l) {
        return l !== '';
      });
      for (var i = 0; i < lines.length; i++) {
        match = /^[ \t]*/.exec(lines[i]);
        if (match && (typeof min === 'undefined' || min > match[0].length)) {
          min = match[0].length;
        }
      }
      if (typeof min !== 'undefined' && min > 0) {
        src = src.replace(new RegExp("^[ \t]{" + min + "}", 'gm'), "");
      }
      return src;
    },

    source: _ember.default.computed('name', function () {
      return this._unindent((_snippets.default[this.get('name')] || "").replace(/^(\s*\n)*/, '').replace(/\s*$/, ''));
    }),

    didInsertElement: function didInsertElement() {
      Highlight.highlightBlock(this.get('element'));
    },

    language: _ember.default.computed('name', function () {
      var m = /\.(\w+)$/i.exec(this.get('name'));
      if (m) {
        switch (m[1].toLowerCase()) {
          case 'js':
            return 'javascript';
          case 'coffee':
            return 'coffeescript';
          case 'hbs':
            return 'htmlbars';
          case 'css':
            return 'css';
          case 'scss':
            return 'scss';
          case 'less':
            return 'less';
          case 'emblem':
            return 'emblem';
          case 'ts':
            return 'typescript';
        }
      }
    })
  });
});
define('dummy/components/flexi-container', ['exports', 'flexi-layouts/components/flexi-container'], function (exports, _flexiContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flexiContainer.default;
    }
  });
});
define('dummy/components/flexi-grid', ['exports', 'flexi-layouts/components/flexi-grid'], function (exports, _flexiGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flexiGrid.default;
    }
  });
});
define('dummy/components/flexi-layout', ['exports', 'flexi-layouts/components/flexi-layout'], function (exports, _flexiLayout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flexiLayout.default;
    }
  });
});
define('dummy/components/flexi-sustain', ['exports', 'flexi-sustain/components/flexi-sustain'], function (exports, _flexiSustain) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flexiSustain.default;
    }
  });
});
define("dummy/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _illiquidModel) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _illiquidModel.default;
    }
  });
});
define("dummy/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidBind) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidBind.default;
    }
  });
});
define("dummy/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidChild) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidChild.default;
    }
  });
});
define("dummy/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidContainer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidContainer.default;
    }
  });
});
define("dummy/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidIf) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidIf.default;
    }
  });
});
define("dummy/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidMeasured) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidMeasured.default;
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function () {
      return _liquidMeasured.measure;
    }
  });
});
define("dummy/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidOutlet) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidOutlet.default;
    }
  });
});
define("dummy/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidSpacer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidSpacer.default;
    }
  });
});
define('dummy/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidSync) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _liquidSync.default;
    }
  });
});
define("dummy/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidUnless) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidUnless.default;
    }
  });
});
define("dummy/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidVersions) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidVersions.default;
    }
  });
});
define('dummy/helpers/-inject-layout', ['exports', 'flexi-layouts/helpers/-inject-layout'], function (exports, _injectLayout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _injectLayout.default;
    }
  });
  Object.defineProperty(exports, 'injectLayout', {
    enumerable: true,
    get: function () {
      return _injectLayout.injectLayout;
    }
  });
});
define('dummy/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _lfLockModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lfLockModel.default;
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function () {
      return _lfLockModel.lfLockModel;
    }
  });
});
define('dummy/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _lfOr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lfOr.default;
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function () {
      return _lfOr.lfOr;
    }
  });
});
define('dummy/initializers/-sustains', ['exports', 'flexi-sustain/initializers/-sustains'], function (exports, _sustains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sustains.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _sustains.initialize;
    }
  });
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("dummy/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals"], function (exports, _emberInternals) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  (0, _emberInternals.initialize)();

  exports.default = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('dummy/instance-initializers/-sustains', ['exports', 'flexi-sustain/instance-initializers/-sustains'], function (exports, _sustains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sustains.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _sustains.initialize;
    }
  });
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'ember-router', 'dummy/config/environment'], function (exports, _emberRouter, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _emberRouter.default.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('grid');
    this.route('grid-responsive');
    this.route('grid-rows');
    this.route('grid-rows-responsive');
    this.route('header-footer-with-scroll');
    this.route('sidebar');
    this.route('tabs');
    this.route('top-nav');

    this.route('docs', function () {
      this.route('index', { path: '/' });
      this.route('layout-elements');
      this.route('layout-components');
      this.route('overview');
      this.route('sustain');
      this.route('layout-attributes');
      this.route('layout-service');
      this.route('installation');
      this.route('blueprints');
      this.route('grids');
      this.route('settings');
      this.route('layouts-overview');
      this.route('media-css');
      this.route('container-css');
    });
  });

  exports.default = Router;
});
define('dummy/routes/docs/blueprints/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
/* jshint ignore:start */
/*

  // BEGIN-SNIPPET generate-1
  ember g flexi
  // END-SNIPPET

  // BEGIN-SNIPPET generate-2
  ember g layout path/to/<name>
  // END-SNIPPET

  // BEGIN-SNIPPET generate-3
    ember g layout-route
  // END-SNIPPET

  // BEGIN-SNIPPET generate-4
    ember g layout-route -l "mobile table desktop"
  // END-SNIPPET

  // BEGIN-SNIPPET generate-5
  ember g component-route
  // END-SNIPPET

  // BEGIN-SNIPPET generate-6
  ember g component-route -l "mobile table desktop"
  // END-SNIPPET

*/
/* jshint ignore:end */
define("dummy/routes/docs/blueprints/snippets/generate", [], function () {
  "use strict";
});
define("dummy/routes/docs/blueprints/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bhAFbt6C", "block": "{\"statements\":[[0,\"\\n\"],[11,\"box\",[]],[15,\"class\",\"offset-xs-1 col-xs-10\"],[13],[0,\"\\n  \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit justify-around\"],[13],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[11,\"h1\",[]],[13],[0,\"Blueprints\"],[14],[0,\"\\n      \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.settings\"],null,{\"statements\":[[0,\" Configuration\"]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[11,\"strong\",[]],[13],[0,\"Generate Config:\"],[14],[0,\"\\n      \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"generate-1.js\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[11,\"strong\",[]],[13],[0,\"Generate a layout:\"],[14],[0,\"\\n      \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"generate-2.js\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/blueprints/template.hbs" } });
});
define('dummy/routes/docs/components/nav-banner/component', ['exports', 'ember-component', 'dummy/routes/docs/components/nav-banner/template'], function (exports, _emberComponent, _template) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberComponent.default.extend({
    tagName: '',
    layout: _template.default
  });
});
define("dummy/routes/docs/components/nav-banner/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TcHpqGw9", "block": "{\"statements\":[[11,\"hbox\",[]],[13],[0,\"\\n  \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"Flexi\"]],\"locals\":[]},null],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"box\",[]],[15,\"class\",\"flexi-fill flexi-horizontal justify-end\"],[13],[0,\"\\n    \"],[11,\"box\",[]],[15,\"class\",\"flexi-horizontal flexi-fit\"],[13],[0,\"\\n      \"],[11,\"centered\",[]],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[6,[\"link-to\"],[\"guides\"],null,{\"statements\":[[0,\"Guides\"]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[6,[\"link-to\"],[\"docs.index\"],null,{\"statements\":[[0,\"Docs\"]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[11,\"a\",[]],[15,\"href\",\"https://github.com/runspired/flexi\"],[13],[0,\"Github\"],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/components/nav-banner/template.hbs" } });
});
define('dummy/routes/docs/components/nav-menu/component', ['exports', 'ember-component', 'dummy/routes/docs/components/nav-menu/template'], function (exports, _emberComponent, _template) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberComponent.default.extend({
    tagName: '',
    layout: _template.default
  });
});
define("dummy/routes/docs/components/nav-menu/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "albUrIMX", "block": "{\"statements\":[[11,\"fill\",[]],[15,\"class\",\"nav-menu\"],[13],[0,\"\\n  \"],[11,\"box\",[]],[15,\"class\",\"offset-xs-1 offset-sm-0 col-sm-12 col-xs-10\"],[13],[0,\"\\n      \"],[11,\"ul\",[]],[13],[0,\"\\n        \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.overview\"],null,{\"statements\":[[0,\"Overview\"]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"ul\",[]],[13],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.installation\"],null,{\"statements\":[[0,\"Installation\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.blueprints\"],null,{\"statements\":[[0,\"Blueprints\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.settings\"],null,{\"statements\":[[0,\"Configuration\"]],\"locals\":[]},null],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"\\n          Features\\n          \"],[11,\"ul\",[]],[13],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.layouts-overview\"],null,{\"statements\":[[0,\"Layouts\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.sustain\"],null,{\"statements\":[[0,\"Sustain\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.layout-attributes\"],null,{\"statements\":[[0,\"Attribute Syntax\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.media-css\"],null,{\"statements\":[[0,\"@media CSS\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.container-css\"],null,{\"statements\":[[0,\"@container CSS\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.layout-components\"],null,{\"statements\":[[0,\"Containers\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.layout-elements\"],null,{\"statements\":[[0,\"Layout Elements\"]],\"locals\":[]},null],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.layout-service\"],null,{\"statements\":[[0,\"Layout Service\"]],\"locals\":[]},null],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"\\n          Concepts\\n          \"],[11,\"ul\",[]],[13],[0,\"\\n            \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"docs.grids\"],null,{\"statements\":[[0,\"Grids\"]],\"locals\":[]},null],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/components/nav-menu/template.hbs" } });
});
define('dummy/routes/docs/container-css/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/container-css/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YMoqrNvX", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"@container CSS\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.layout-components\"],null,{\"statements\":[[0,\" Containers\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Each @media CSS query has a matching `.container-[prefix]` class that enables\\n    you to have grid columns and responsive utilities respond to changes in\\n    container widths instead of viewport widths.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    A container class will always take precedence over an @media query.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi comes with a container mixin you can add to components which generates\\n    the updates appropriate class based on it's width.\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The \"],[11,\"strong\",[]],[13],[0,\"<container></container>\"],[14],[0,\"\\n    and \"],[11,\"strong\",[]],[13],[0,\"<grid responsive></grid>\"],[14],[0,\" elements are actually\\n    Ember components which implement this mixin.\\n  \"],[14],[0,\"\\n\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/container-css/template.hbs" } });
});
define('dummy/routes/docs/index/route', ['exports', 'ember-route', 'ember-service/inject'], function (exports, _emberRoute, _inject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({
    device: (0, _inject.default)('device/layout'),

    redirect: function redirect() {
      if (!this.get('device.isMobile')) {
        this.transitionTo('docs.overview');
      }
    }
  });
});
define("dummy/routes/docs/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EOSbZiU6", "block": "{\"statements\":[[6,[\"with\"],[[33,[\"-inject-layout\"],null,null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"FlexiLayout\",\"isAtLeastTablet\"]]],null,{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"bg-light-green\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"Welcome to Flexi\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[1,[33,[\"flexi-sustain\"],[\"docs/components/nav-menu\"],null],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[\"FlexiLayout\"]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/index/template.hbs" } });
});
define('dummy/routes/docs/installation/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
/* jshint ignore:start */
/*

  // BEGIN-SNIPPET install-1
  ember install flexi
  // END-SNIPPET

  // BEGIN-SNIPPET install-2
  var EmberApp = require('ember-cli/lib/broccoli/ember-app');
  var shim = require('flexi/lib/pod-templates-shim');

  shim(EmberApp);
  // END-SNIPPET

*/
/* jshint ignore:end */
define("dummy/routes/docs/installation/snippets/install", [], function () {
  "use strict";
});
define("dummy/routes/docs/installation/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "01r2T6dm", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"Layout Service\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.blueprints\"],null,{\"statements\":[[0,\" Blueprints\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"install-1.js\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Once you have installed flexi, you will also need to install the shim for ember-app.\\n    in your ember-cli-build.js file. This shim makes ember-cli's template tree able to find\\n    the templates for layouts.\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"install-2.js\"]]],false],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/installation/template.hbs" } });
});
define('dummy/routes/docs/layout-attributes/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/layout-attributes/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1Wex4G4m", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"Attribute Syntax\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.media-css\"],null,{\"statements\":[[0,\" @media CSS\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Layout attributes are converted to classes at build time, giving you the\\n    convenience of a nice attribute syntax and the performance of class based\\n    selectors.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Layout attributes come in two forms, property descriptors, and\\n    breakpoint attributes.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"Property Descriptors\"],[14],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"property-descriptors.hbs\"]]],false],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"Breakpoint Attributes\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    For each prefix defined in your breakpoints array in config/flexi.js\\n    you are capable of adding breakpoint aware layout properties and columns.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The following specifies that this box use 12 columns for the breakpoint prefixed\\n    `xs`, 6 for `sm` and so on.\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"breakpoint-attrs-1.hbs\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Attribute prefixes can take more than one value, separate values\\n    with a space.  Valid values in addition to a column number are:\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"breakpoint-attrs-2.hbs\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Using multiple values for a prefix would look like this.\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"breakpoint-attrs-3.hbs\"]]],false],[0,\"\\n\\n  \"],[11,\"h2\",[]],[13],[0,\"Descriptors\"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"fit\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    fit directs the box to shrink to it's content size (flex: none).\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"fill\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    fill directs the box to grow to fill available space (flex: 1 0 auto).\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"horizontal\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The box's items will be laid out in a row.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"vertical\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The box's items will be laid out in a column.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"wrap\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    When the box is set to horizontal, it's items wrap to the next line\\n    if needed.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"nowrap\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    When the box is set to horizontal, it's items will never wrap to the next line.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"align\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    This is a shorthand that maps to the CSS align-items declaration.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"justify\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    This is a shorthand that maps to the CSS justify-content declaration.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/layout-attributes/template.hbs" } });
});
define('dummy/routes/docs/layout-components/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/layout-components/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cEX5NayW", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"Containers\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.layout-elements\"],null,{\"statements\":[[0,\" Layout Elements\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi comes with a container mixin you can add to components which generates\\n    the updates appropriate class based on it's width.\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"container-mixin.hbs\",\"js\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The \"],[11,\"strong\",[]],[13],[0,\"<container></container>\"],[14],[0,\"\\n    and \"],[11,\"strong\",[]],[13],[0,\"<grid responsive></grid>\"],[14],[0,\" elements are actually\\n    Ember components which implement this mixin.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    These components subscribe to the width property on the device/layout service,\\n    and recalculate their width whenever it changes.  They then add a class name\\n    to their element based on comparing their width to your breakpoints.\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/layout-components/template.hbs" } });
});
define('dummy/routes/docs/layout-elements/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/layout-elements/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GeFpi8Ej", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[11,\"h1\",[]],[13],[0,\"Layout Elements\"],[14],[0,\"\\n      \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.layout-service\"],null,{\"statements\":[[0,\" Layout Service\"]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<screen></screen>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Screen is a relatively positioned block which will take up 100% width\\n      and a min-height of 100vh.  Screen is ideal for creating a wrapper\\n      around all of the content on a web page.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<page></page>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Page is a relatively positioned flex box whose width is 100vw and min-height\\n      is 100vh.  It defaults to aligning its items vertically.  Page is ideal for\\n      quickly creating a wrapper that sizes precisely to the viewport.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<fill></fill>\"],[14],[0,\"\\n    \"],[11,\"h4\",[]],[13],[0,\"<fill block></fill>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Fill comes in two flavors: flex model and box model (via addition of the `block`\\n      attribute). In both cases, it attempts to take up all of the available width and\\n      height to give you a stable size reference point off of which to work.\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      When in flex mode, it defaults to aligning its items horizontally and allows\\n      them to wrap.  Fill is ideal when you need to reset your mental layout space.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<centered></centered>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Centered will center its content within the available space.  This is ideal for\\n      any form of centering.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<grid></grid>\"],[14],[0,\"\\n    \"],[11,\"h4\",[]],[13],[0,\"<grid responsive></grid>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Grid is a relatively positioned flex box which aligns its items horizontally\\n      and will wrap them to the next line, making it ideal for wrapping grid-like\\n      behavior when no rows are needed.  It has no default flex value.\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      When you add the `responsive` attribute to the grid tag, it becomes a component\\n      functioning as a container and makes its grid @container aware.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<box></box>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Box is a relatively positioned flex box which by default will grow to match\\n      other items (flex: 1 0 0px) but will not expand to fill remaining space. This\\n      makes it ideal as a generic \\\"box item\\\" within other flex elements.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<hbox></hbox>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Hbox is a relatively positioned flex box which will expand to fill remaining\\n      space (flex: 1 0 auto) and will align its items horizontally (hence hbox).\\n      By default it will wrap its contents to the next line when needed.  This makes\\n      it ideal for quickly laying out items horizontally.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<vbox></vbox>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Vbox is a relatively positioned flex box which will expand to fill remaining\\n      space (flex: 1 0 auto) and will align its items vertically (hence vbox). This\\n      makes it ideal for quickly laying out items vertically.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"<container></container>\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Container is actually an Ember component which sets its tagName to 'container'.\\n      As an element, it is a relatively positioned flex box with 100% width, with no\\n      flex property, which will display its content vertically.\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/layout-elements/template.hbs" } });
});
define('dummy/routes/docs/layout-service/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/layout-service/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SmIDvXNI", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"Layout Service\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.grids\"],null,{\"statements\":[[0,\" Grids\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The device/layout service listens to the window resize event and intelligently\\n    updates the value of it's width and height. It always has the following properties.\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"layout-service-1.hbs\",\"js\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The layout service exposes a boolean for each breakpoint name defined in your config,\\n    which will be true when the viewport width is larger or equal to that breakpoint's\\n    value for begin and less than the begin value for the next breakpoint.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The following breakpoint names\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"layout-service-2.hbs\",\"js\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Would result in these booleans\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"layout-service-3.hbs\",\"js\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    In all layout template files, the layout service is available as `FlexiLayout`.\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/layout-service/template.hbs" } });
});
define('dummy/routes/docs/layouts-overview/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/layouts-overview/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aMStsn34", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[11,\"h1\",[]],[13],[0,\"Layouts\"],[14],[0,\"\\n      \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.sustain\"],null,{\"statements\":[[0,\" Sustain\"]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      With flexi, you can separate your markup into separate layout files for each breakpoint size as needed.\\n      The existing template file for a route or component will continue to function until at least one layout\\n      is defined for that route or component.\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Any breakpoint name defined in config/flexi.js is a valid layout name.  At build time, your layout files\\n      will be compiled to a single template for the route or component with efficient breakpoint logic automatically\\n      inserted.  Any invalid layout files will emit warnings in the CLI.\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Layouts work with either pod or classic project organization, and layouts can be generated (see the\\n      \"],[6,[\"link-to\"],[\"docs.blueprints\"],null,{\"statements\":[[0,\"blueprint documentation\"]],\"locals\":[]},null],[0,\").\\n    \"],[14],[0,\"\\n    \"],[11,\"h3\",[]],[13],[0,\"Pods\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      To convert an existing template to a layout, rename the file to a breakpoint name, create a sibling\\n      `-layouts/` directory, and move the file into the new directory.\\n    \"],[14],[0,\"\\n\"],[0,\"    \"],[11,\"h4\",[]],[13],[0,\"Old (with template)\"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"unindent\"],[\"layouts-1.hbs\",false]]],false],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"New (with layout)\"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"unindent\"],[\"layouts-2.hbs\",false]]],false],[0,\"\\n\"],[0,\"    \"],[11,\"h3\",[]],[13],[0,\"Classic\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      To convert an existing template to a layout, rename the file to a breakpoint name, create a sibling\\n      directory with the component or route's name, and move the file into a new `-layouts/` directory\\n      within that directory.\\n    \"],[14],[0,\"\\n    \"],[11,\"h4\",[]],[13],[0,\"Old (with template)\"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"unindent\"],[\"layouts-3.hbs\",false]]],false],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"New (with layout)\"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"unindent\"],[\"layouts-4.hbs\",false]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/layouts-overview/template.hbs" } });
});
define('dummy/routes/docs/media-css/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/media-css/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UlQrBg0q", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"@media CSS\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.container-css\"],null,{\"statements\":[[0,\" @container CSS\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi generates a mobile first responsive grid and responsive utilities\\n    using @media CSS queries based on the breakpoints defined in your config/flexi.js\\n    file.  Breakpoints look like the following:\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"settings-2.js\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    With just a few tweaks to config/flexi.js your app will have custom tailored columns,\\n    prefixes, and breakpoints.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The grid columns are percentage based, with percentages derived from the total\\n    number of columns specified in the configuration (default 12).\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Breakpoints are considered valid from their begin up to the begin of the next largest\\n    breakpoint.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"breakpoint.prefix\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The breakpoint prefix is used when generating grid and resonsive utility class names.\\n    The following responsive utilities are made available for each prefix:\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"settings-css-1.js\",\"css\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    `.col-xs-1` ... `.col-xs-n` will be valid class names (if `columnPrefix` is set to `col`).\\n  \"],[14],[0,\"\\n\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/media-css/template.hbs" } });
});
define('dummy/routes/docs/overview/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/overview/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8NyXszQT", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"Overview\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.installation\"],null,{\"statements\":[[0,\" Installation\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi is a layout framework built to solve difficult maintainability and performance concerns\\n    on projects with responsive designs or that ship layouts for more than one screen size.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi will help you build faster, smarter, with an eye on long term needs and goals, and it\\n    integrates well with existing Ember projects of any size.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi is small and focused, and won't clog your runtime. It gives you declarative layout\\n    features that are processed at build time, leaving the most minimal runtime footprint\\n    possible and without bloating the size of your app.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi is not a ui framework.  It is a small set of layout primitives that make it simple\\n    to design for a range of device sizes and platforms, and will easily integrate with your\\n    existing ui-framework and/or grid-system of choice.\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/overview/template.hbs" } });
});
define('dummy/routes/docs/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define('dummy/routes/docs/settings/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
/*
// BEGIN-SNIPPET settings-1
{
 // the number of columns for the grid
 columns: 12,

 // optional, used for column classes: `${colPrefix}-${breakpointPrefix}-${columnNumber}`
 columnPrefix: 'col',

 // if false, @media css is not included
 includeMediaCSS: true,

 // if false, default element styles are not included
 includeElementCSS: true,

 // if true, will convert layout attributes on non-layout elements to classes as well
 transformAllElementLayoutAttributes: false,

 // grid and layout element gutters
 gutterPadding: '.5rem',

 // if false, no styles are included (trumps `includeMediaCSS` and `includeElementCSS`)
 includeCSS: true,

 // an array of breakpoints to use in your app (see below)
 breakpoints: [
   { name: 'mobile', prefix: 'xs', begin: 0 },
   { name: 'tablet', prefix: 'sm', begin: 768 },
   { name: 'desktop', prefix: 'md', begin: 992 },
   { name: 'huge', prefix: 'lg', begin: 1200 }
 ]
}
// END-SNIPPET

// BEGIN-SNIPPET settings-2
 { name: 'mobile', prefix: 'xs', begin: 0 }
// END-SNIPPET

// BEGIN-SNIPPET settings-html-1
 <box xs="n visible vertical">
// END-SNIPPET

 // BEGIN-SNIPPET settings-html-2
 <box class="col-xs-n visible-xs vertical-xs">
 // END-SNIPPET

// BEGIN-SNIPPET settings-css-1
 // wrapper class for container breakpoint
 .container-xs {}

 // these classes are valid when the @media
 // breakpoint is true or when within .container-xs
 .hidden-xs {
   display: none;
 }

 .visible-xs {
   display: initial;
 }

 .vertical-xs {
   flex-direction: column;
 }

 .horizontal-xs {
   flex-direction: row;
 }

 .wrap-xs {
   flex-wrap: wrap;
 }

 .nowrap-xs {
   flex-wrap: nowrap;
 }
// END-SNIPPET
 */
define("dummy/routes/docs/settings/snippets/settings", [], function () {
  "use strict";
});
define("dummy/routes/docs/settings/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Y3aoSq3Y", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"Configuration\"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.layouts-overview\"],null,{\"statements\":[[0,\" Layouts\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Flexi comes ready to go, but if you want to know where and what you can adjust\\n    read on below.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The default blueprint will install `config/flexi.js` with the\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/runspired/flexi/blob/develop/blueprints/flexi/files/config/flexi.js\"],[13],[0,\"\\n      default settings\\n    \"],[14],[0,\".\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"Settings\"],[14],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"settings-1.js\"]]],false],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.columns\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The total number of columns you want Flexi to generate or your CSS framework\\n    provides. This is used by Flexi when generating the grid, and used when\\n    validating the values of layout attributes discovered at build time.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.columnPrefix\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    By default, flexi generates a grid identical to bootstrap's to make converting\\n    or interop seamless.  See \"],[6,[\"link-to\"],[\"faq.css-frameworks\"],null,{\"statements\":[[0,\"configuring Flexi\\n    to work with your CSS framework or grid of choice\"]],\"locals\":[]},null],[0,\".\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    This setting allows you to configure the structure of the generated grid class\\n    names.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.includeMediaCSS\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    If false, @media based responsive utilities and grid classes will not be generated.\\n    @container based utilities and grid classes will still be generated.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.includeElementCSS\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    If you have no desire to use layout elements, set this to false.\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    If false, default element styles will not be included, this includes the styles\\n    for \"],[11,\"strong\",[]],[13],[0,\"<container></container>\"],[14],[0,\". Since all layout elements are entirely\\n    implemented via CSS, this will cause all layout elements to cease functioning\\n    unless new CSS is provided for them.\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    You will want to replicate the CSS for \"],[11,\"strong\",[]],[13],[0,\"<container></container>\"],[14],[0,\" or\\n    rely entirely on the `flexi/mixins/container` mixin for implementing @container\\n    support.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.transformAllElementLayoutAttributes\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    By default, only layout attributes present on elements provided by flexi will\\n    be processed at build time and converted to classes. Set this to `true` to have\\n    all elements in your templates be processed.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.gutterPadding\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Grid columns will have half of this padding applied to left and right respectively.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.includeCSS\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Set to false if you want absolutely no styles to be included in your app from Flexi.\\n    This trumps other CSS settings, and results in layout elements and responsive layout\\n    attributes not working unless alternative CSS is provided.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"config.breakpoints\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Your config must have a `breakpoints` array.  This array determines what layout names\\n    are valid for layout handlebars files, when those layouts are activated, what layout\\n    attribute shorthands are available, what @container breakpoints are available, and what\\n    booleans are available on the device/layout service.\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    A breakpoint has the structure:\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"settings-2.js\"]]],false],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"breakpoint.name\"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    `name` will be used for blueprint generation of layout names, and is made available as an `is[Name]`\\n    boolean on the `device/layout` service.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"breakpoint.begin\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    `begin` is the pixel value at which the breakpoint becomes valid if equal to or larger than.\\n    All breakpoints must define begin, and your smallest breakpoint should begin at 0. Two breakpoints\\n    should not have the same value for begin.\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    A breakpoint will be considered valid from it's begin up to the begin of the next largest\\n    breakpoint.\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Your breakpoints will be sorted and ordered automatically based on begin.\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[13],[0,\"breakpoint.prefix\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    The breakpoint prefix is used when generating class names and layout\\n    attribute decorators.  For the breakpoint defined above, the `xs` prefix\\n    would enable the following shorthand layout syntax (where n is a column number).\\n  \"],[14],[0,\"\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"settings-html-1.js\",\"hbs\"]]],false],[0,\"\\n\\n  This shorthand gets expanded to the following classes which are automatically\\n  generated by Flexi.\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"settings-html-2.js\",\"hbs\"]]],false],[0,\"\\n\\n  The following responsive utilities are made available for each prefix:\\n\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\",\"language\"],[\"settings-css-1.js\",\"css\"]]],false],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    `.col-xs-1` ... `.col-xs-n` will be valid class names (if `columnPrefix` is set to `col`).\\n  \"],[14],[0,\"\\n\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/settings/template.hbs" } });
});
define('dummy/routes/docs/sustain/route', ['exports', 'ember-route'], function (exports, _emberRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberRoute.default.extend({});
});
define("dummy/routes/docs/sustain/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "f3eroquO", "block": "{\"statements\":[[11,\"box\",[]],[15,\"class\",\"offset-xs-1 flexi-vertical col-xs-10\"],[13],[0,\"\\n  \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[11,\"h1\",[]],[13],[0,\"Sustain\"],[14],[0,\"\\n      \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end align-center\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[13],[0,\"Next \"],[6,[\"link-to\"],[\"docs.layout-attributes\"],null,{\"statements\":[[0,\" Attribute Syntax\"]],\"locals\":[]},null],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Use the sustain helper to explicitly declare component instances that can be recycled.\\n      This lets Ember recycle a component instance and it's associated DOM across layout and\\n      route boundaries.\\n    \"],[14],[0,\"\\n\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"sustain-1.hbs\"]]],false],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      A sustain is essentially a \\\"marker\\\" for where a particular component instance should be inserted.\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Since the component a sustain specifies is moved from marker to marker, only one marker instance\\n      for a given component name can be used at a time, unless a unique label is provided.\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      This produces a significant performance advantage by allowing you to seamlessly restructure your\\n      app's DOM when shifting from one layout or route to another without needing to teardown and rebuild DOM.\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h3\",[]],[13],[0,\"Providing a model for your component\"],[14],[0,\"\\n\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"sustain-2.hbs\"]]],false],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"Complex Models\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Use the hash helper to handle more complex model situations.\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"sustain-3.hbs\"]]],false],[0,\"\\n\\n    \"],[11,\"h3\",[]],[13],[0,\"Dealing with animation and other scenarios in which two instances exist at once.\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      Only one instance of the sustainable is alive and rendered at a time, but if you are animating\\n      from one location to another you can choose to leave behind a copy.\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"sustain-4.hbs\"]]],false],[0,\"\\n\\n    \"],[11,\"h3\",[]],[13],[0,\"Configuring the component's cache expire time.\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      By default, a sustain is destroyed when it has gone unused for 5 seconds.\\n      You can alter this expiration. A value of 0 or -1 will cause the sustain to\\n      live forever.\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"sustain-5.hbs\"]]],false],[0,\"\\n\\n    \"],[11,\"h3\",[]],[13],[0,\"Labeling a sustain\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      If you need more than one instance of a component to be recycleable, you may provide a unique label\\n      for the sustain.  The instance will only be reused in locations where that label appears in conjunction\\n      with the same Component Name.\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"sustain-6.hbs\"]]],false],[0,\"\\n\\n    \"],[11,\"h4\",[]],[13],[0,\"Lifecycle Hooks\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      The component being sustained has access to two new hooks: `willMove` and `didMove`.\\n      For both, a method by that name on your component will trigger before the event fires.\\n    \"],[14],[0,\"\\n    \"],[11,\"ul\",[]],[13],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"willMove: fires before a component instance leaves a location\"],[14],[0,\"\\n      \"],[11,\"li\",[]],[13],[0,\"didMove: fires when a component instance has entered a location\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[0,\"\\n      On the initial render and insertion of a sustained component, only `didMove` triggers.\\n    \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/sustain/template.hbs" } });
});
define("dummy/routes/docs/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XmDw/34v", "block": "{\"statements\":[[6,[\"with\"],[[33,[\"-inject-layout\"],null,null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"FlexiLayout\",\"isAtLeastTablet\"]]],null,{\"statements\":[[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"box\",[]],[15,\"class\",\"site-banner flexi-fit\"],[13],[0,\"\\n      \"],[1,[33,[\"flexi-sustain\"],[\"docs/components/nav-banner\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"hbox\",[]],[13],[0,\"\\n      \"],[11,\"box\",[]],[15,\"class\",\"col-sm-3\"],[13],[0,\"\\n        \"],[1,[33,[\"flexi-sustain\"],[\"docs/components/nav-menu\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"box\",[]],[15,\"class\",\"col-sm-9\"],[13],[0,\"\\n        \"],[1,[33,[\"liquid-outlet\"],[\"main\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[15,\"class\",\"site-banner\"],[13],[0,\"\\n    \"],[11,\"box\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[1,[33,[\"flexi-sustain\"],[\"docs/components/nav-banner\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"box\",[]],[15,\"class\",\"col-xs-12\"],[13],[0,\"\\n      \"],[1,[33,[\"liquid-outlet\"],[\"main\"],null],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[\"FlexiLayout\"]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/routes/docs/template.hbs" } });
});
define('dummy/services/-sustains', ['exports', 'flexi-sustain/services/-sustains'], function (exports, _sustains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sustains.default;
    }
  });
});
define('dummy/services/device/layout', ['exports', 'dummy/config/environment', 'flexi-layouts/services/device/layout'], function (exports, _environment, _layout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _layout.default.extend({
    breakpoints: _environment.default.flexi.breakpoints
  });
});
define("dummy/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _transitionMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _transitionMap.default;
});
define("dummy/snippets", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "breakpoint-attrs-1.hbs": "<box xs=\"12\" sm=\"6\" md=\"4\" lg=\"3\"></box>",
    "breakpoint-attrs-2.hbs": "  fit|fill\n  vertical|horizontal\n  wrap|nowrap",
    "breakpoint-attrs-3.hbs": "<box xs=\"12 visible horizontal wrap\"></box>",
    "container-mixin.hbs": "  import Ember from 'ember';\n  import ContainerMixin from 'flexi/mixins/container';\n\n  const { Component } = Ember;\n\n  export default Component.extend(ContainerMixin, {});\n",
    "fullscreen.hbs": "<screen>\n  <page style=\"height: 100vh\">\n    <hbox class=\"header\">\n      <centered fit class=\"nav-with-padding\">\n        <h3>Flexi</h3>\n      </centered>\n      <centered fit class=\"nav-with-padding\">\n        {{#link-to \"index\"}}Examples{{/link-to}}\n      </centered>\n      <centered fit class=\"nav-with-padding\">\n        <a href=\"https://flexi.readme.io/docs\"\n                   target=\"_blank\"\n                   rel=\"noopener\">Docs</a>\n      </centered>\n\n      <hbox justify=\"end\">\n        <centered fit class=\"nav-with-padding\">\n          <a href=\"https://github.com/html-next/flexi\"\n             target=\"_blank\"\n             rel=\"noopener\">GitHub</a>\n        </centered>\n      </hbox>\n    </hbox>\n\n    {{!--\n      The scrollable element requires these extra styles.\n      In addition, the parent needs a known height, either\n      in pixels, vh, or a chain of percentages that\n      eventually lead to a parent with a known height.\n      Note how our <page> tag uses `height: 100vh`.\n    --}}\n    <hbox fit style=\"overflow: scroll; flex-shrink: 1\">\n      {{lorem-ipsum}}\n    </hbox>\n\n    <centered fit class=\"footer\">\n      <h3>Footer</h3>\n    </centered>\n  </page>\n</screen>",
    "generate-1.js": "  ember g flexi",
    "generate-2.js": "  ember g layout path/to/<name>",
    "generate-3.js": "    ember g layout-route",
    "generate-4.js": "    ember g layout-route -l \"mobile table desktop\"",
    "generate-5.js": "  ember g component-route",
    "generate-6.js": "  ember g component-route -l \"mobile table desktop\"",
    "grid-basic.hbs": "<screen>\n  <page>\n    <h2>This Grid responds to @media queries</h2>\n\n    <grid class=\"example\">\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: springgreen\">\n        {{#link-to \"index\"}}Examples{{/link-to}}\n      </centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: bisque\">\n        <a href=\"https://flexi.readme.io/docs\"\n           target=\"_blank\"\n           rel=\"noopener\">Docs</a>\n      </centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: darkgoldenrod\">\n        <a href=\"https://github.com/html-next/flexi\"\n           target=\"_blank\"\n           rel=\"noopener\">GitHub</a>\n      </centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: dodgerblue\">4</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: orangered\">5</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: olivedrab\">6</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: chartreuse\">7</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: fuchsia\">8</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: powderblue\">9</centered>\n    </grid>\n  </page>\n</screen>",
    "grid-responsive.hbs": "<screen>\n  <page>\n    <h2>This Grid responds to @container queries</h2>\n\n    <grid responsive class=\"example\">\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: cornflowerblue\">\n        {{#link-to \"index\"}}Examples{{/link-to}}\n      </centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: lavenderblush\">\n        <a href=\"https://flexi.readme.io/docs\"\n           target=\"_blank\"\n           rel=\"noopener\">Docs</a>\n      </centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: burlywood\">\n        <a href=\"https://github.com/html-next/flexi\"\n           target=\"_blank\"\n           rel=\"noopener\">GitHub</a>\n      </centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: crimson\">4</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: hotpink\">5</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: mediumaquamarine\">6</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: salmon\">7</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: blanchedalmond\">8</centered>\n      <centered xs=\"6\" sm=\"4\" md=\"3\" lg=\"2\" style=\"background-color: steelblue\">9</centered>\n    </grid>\n  </page>\n</screen>",
    "grid-rows-responsive.hbs": "<screen>\n  <page>\n    <h2>This Row Grid responds to @container queries</h2>\n\n    <container class=\"example\">\n      <vbox>\n        <hbox fit style=\"background-color: lightpink\">\n          <centered xs=\"12\" md=\"4\">\n            {{#link-to \"index\"}}\n              Examples\n            {{/link-to}}\n          </centered>\n          <centered xs=\"12\" md=\"4\">\n            <a href=\"https://flexi.readme.io/docs\"\n               target=\"_blank\"\n               rel=\"noopener\">Docs</a>\n          </centered>\n          <centered xs=\"12\" md=\"4\">\n            <a href=\"https://github.com/html-next/flexi\"\n               target=\"_blank\"\n               rel=\"noopener\">GitHub</a>\n          </centered>\n        </hbox>\n        <hbox fit style=\"background-color: lightgreen\">\n          <centered xs=\"12\" md=\"4\">4</centered>\n          <centered xs=\"12\" md=\"4\">5</centered>\n          <centered xs=\"12\" md=\"4\">6</centered>\n        </hbox>\n        <hbox fit style=\"background-color: lightblue\">\n          <centered xs=\"12\" md=\"4\">7</centered>\n          <centered xs=\"12\" md=\"4\">8</centered>\n          <centered xs=\"12\" md=\"4\">9</centered>\n        </hbox>\n      </vbox>\n    </container>\n  </page>\n</screen>",
    "grid-rows.hbs": "<screen>\n  <page>\n    <h2>This Row Grid responds to @media queries</h2>\n\n    <vbox class=\"example\">\n      <hbox fit style=\"background-color: lightpink\">\n        <centered xs=\"12\" md=\"4\">\n          {{#link-to \"index\"}}\n            Examples\n          {{/link-to}}\n        </centered>\n        <centered xs=\"12\" md=\"4\">\n          <a href=\"https://flexi.readme.io/docs\"\n             target=\"_blank\"\n             rel=\"noopener\">Docs</a>\n        </centered>\n        <centered xs=\"12\" md=\"4\">\n          <a href=\"https://github.com/html-next/flexi\"\n             target=\"_blank\"\n             rel=\"noopener\">GitHub</a>\n        </centered>\n      </hbox>\n      <hbox fit style=\"background-color: lightgreen\">\n        <centered xs=\"12\" md=\"4\">4</centered>\n        <centered xs=\"12\" md=\"4\">5</centered>\n        <centered xs=\"12\" md=\"4\">6</centered>\n      </hbox>\n      <hbox fit style=\"background-color: lightblue\">\n        <centered xs=\"12\" md=\"4\">7</centered>\n        <centered xs=\"12\" md=\"4\">8</centered>\n        <centered xs=\"12\" md=\"4\">9</centered>\n      </hbox>\n    </vbox>\n  </page>\n</screen>",
    "install-1.js": "  ember install flexi",
    "install-2.js": "  var EmberApp = require('ember-cli/lib/broccoli/ember-app');\n  var shim = require('flexi/lib/pod-templates-shim');\n\n  shim(EmberApp);",
    "layout-service-1.hbs": "  {\n    orientation, // 'portrait' or 'landscape'\n\n    orientationIsLandscape, // boolean\n    orientationIsPortrait, // boolean\n\n    height, // number (pixels)\n    width, // number\n\n    breakpoints, // array you supplied in your config, sorted largest to smallest\n  }",
    "layout-service-2.hbs": "  ['mobile', 'tablet', 'desktop', 'huge']",
    "layout-service-3.hbs": "  {\n    isMobile,\n    isTablet,\n    isDesktop,\n    isHuge\n  }",
    "layouts-1.hbs": "      app/\n        <pod-prefix>/\n          components/\n            foo-component/\n               template.hbs",
    "layouts-2.hbs": "      app/\n        <pod-prefix>/\n          components/\n            foo-component/\n               -layouts/\n                 desktop.hbs",
    "layouts-3.hbs": "      app/\n        templates/\n            components/\n               foo-component.hbs",
    "layouts-4.hbs": "      app/\n        templates/\n            components/\n               foo-component/\n                  -layouts/\n                    desktop.hbs",
    "property-descriptors.hbs": "<box\n  justify=\"start|end|center|between|around\"\n  align=\"start|end|stretch|center|baseline\"\n  fit|fill\n  vertical|horizontal\n  wrap|nowrap\n>",
    "settings-1.js": "{\n // the number of columns for the grid\n columns: 12,\n\n // optional, used for column classes: `${colPrefix}-${breakpointPrefix}-${columnNumber}`\n columnPrefix: 'col',\n\n // if false, @media css is not included\n includeMediaCSS: true,\n\n // if false, default element styles are not included\n includeElementCSS: true,\n\n // if true, will convert layout attributes on non-layout elements to classes as well\n transformAllElementLayoutAttributes: false,\n\n // grid and layout element gutters\n gutterPadding: '.5rem',\n\n // if false, no styles are included (trumps `includeMediaCSS` and `includeElementCSS`)\n includeCSS: true,\n\n // an array of breakpoints to use in your app (see below)\n breakpoints: [\n   { name: 'mobile', prefix: 'xs', begin: 0 },\n   { name: 'tablet', prefix: 'sm', begin: 768 },\n   { name: 'desktop', prefix: 'md', begin: 992 },\n   { name: 'huge', prefix: 'lg', begin: 1200 }\n ]\n}",
    "settings-2.js": " { name: 'mobile', prefix: 'xs', begin: 0 }",
    "settings-css-1.js": " // wrapper class for container breakpoint\n .container-xs {}\n\n // these classes are valid when the @media\n // breakpoint is true or when within .container-xs\n .hidden-xs {\n   display: none;\n }\n\n .visible-xs {\n   display: initial;\n }\n\n .vertical-xs {\n   flex-direction: column;\n }\n\n .horizontal-xs {\n   flex-direction: row;\n }\n\n .wrap-xs {\n   flex-wrap: wrap;\n }\n\n .nowrap-xs {\n   flex-wrap: nowrap;\n }",
    "settings-html-1.js": " <box xs=\"n visible vertical\">",
    "settings-html-2.js": " <box class=\"col-xs-n visible-xs vertical-xs\">",
    "sidebar.hbs": "<screen>\n  <page>\n    <hbox>\n      <vbox xs=\"3\" sm=\"2\" class=\"sidebar\">\n        <centered fit>\n          <h3>Flexi</h3>\n        </centered>\n        <centered fit>\n          {{#link-to \"index\"}}\n            Examples\n          {{/link-to}}\n        </centered>\n        <centered fit>\n          <a href=\"https://flexi.readme.io/docs\"\n             target=\"_blank\"\n             rel=\"noopener\">Docs</a>\n        </centered>\n        <centered fit>\n          <a href=\"https://github.com/html-next/flexi\"\n             target=\"_blank\"\n             rel=\"noopener\">GitHub</a>\n        </centered>\n      </vbox>\n      <box class=\"content\">\n        {{lorem-ipsum}}\n      </box>\n    </hbox>\n  </page>\n</screen>",
    "sustain-1.hbs": "{{sustain 'foo-component'}}",
    "sustain-2.hbs": "{{sustain 'foo-component' model}}",
    "sustain-3.hbs": "{{sustain 'foo-component' (hash emails=model.emails foo=(action 'foo') bar=bar)}}",
    "sustain-4.hbs": "{{sustain 'foo-component' copy=true)}}",
    "sustain-5.hbs": "{{sustain 'foo-component' expires=0}}",
    "sustain-6.hbs": "{{sustain 'foo-component' model label=\"a-key\"}}",
    "tabs.hbs": "<screen>\n  <page>\n    <centered>\n      <vbox fit xs=\"10\">\n        <hbox fit class=\"tab-bar\">\n          <hbox fit>\n            <centered class=\"nav-with-padding\">\n              {{#link-to \"index\"}}\n                Examples\n              {{/link-to}}\n            </centered>\n            <centered class=\"nav-with-padding\">\n              <a href=\"https://flexi.readme.io/docs\"\n                         target=\"_blank\"\n                         rel=\"noopener\">Docs</a>\n            </centered>\n          </hbox>\n          <hbox justify=\"end\">\n            <centered fit class=\"nav-with-padding\">\n              <a href=\"https://github.com/html-next/flexi\"\n                 target=\"_blank\"\n                 rel=\"noopener\">GitHub</a>\n            </centered>\n          </hbox>\n        </hbox>\n        <hbox class=\"content\">\n          {{lorem-ipsum}}\n        </hbox>\n      </vbox>\n    </centered>\n  </page>\n</screen>",
    "top-nav.hbs": "<screen>\n  <page>\n    <hbox class=\"header\" fit>\n      <centered fit class=\"nav-with-padding\">\n        <h3>Flexi</h3>\n      </centered>\n      <centered fit class=\"nav-with-padding\">\n        {{#link-to \"index\"}}Examples{{/link-to}}\n      </centered>\n      <centered fit class=\"nav-with-padding\">\n        <a href=\"https://flexi.readme.io/docs\"\n                   target=\"_blank\"\n                   rel=\"noopener\">Docs</a>\n      </centered>\n\n      <hbox justify=\"end\">\n        <centered fit class=\"nav-with-padding\">\n          <a href=\"https://github.com/html-next/flexi\"\n             target=\"_blank\"\n             rel=\"noopener\">GitHub</a>\n        </centered>\n      </hbox>\n    </hbox>\n    <box class=\"content\">\n      {{lorem-ipsum}}\n    </box>\n  </page>\n</screen>"
  };
});
define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZJPtmqL1", "block": "{\"statements\":[[1,[33,[\"liquid-outlet\"],null,[[\"use\"],[\"cross-fade\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define("dummy/templates/components/code-snippet", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3vKDCMgv", "block": "{\"statements\":[[1,[26,[\"source\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/code-snippet.hbs" } });
});
define("dummy/templates/components/lorem-ipsum", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6vrvSFES", "block": "{\"statements\":[[11,\"p\",[]],[15,\"style\",\"margin-top: 0\"],[13],[0,\"\\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit, ligula at porta ultrices, mi erat gravida tellus, vel consequat nisi justo at odio. Pellentesque non massa eu est pharetra dignissim nec id orci. Morbi ac tincidunt quam, vel varius ipsum. Nunc sit amet hendrerit enim. Fusce eget urna et libero sagittis volutpat. Proin convallis vulputate sapien, eget aliquet purus fringilla at. Vivamus at pellentesque libero. Duis libero nunc, tristique semper consequat at, convallis et quam. Cras sagittis mauris eget sagittis viverra. Quisque id aliquet tortor. Fusce maximus neque dolor, id lobortis arcu suscipit a. Mauris posuere enim id aliquet euismod. Mauris bibendum id lorem eget fermentum. Donec eget nulla sapien. Donec volutpat fermentum diam elementum fermentum.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nSuspendisse cursus erat et neque aliquam blandit. Proin efficitur, neque id cursus finibus, sem nisl euismod lacus, quis ornare massa mauris nec felis. Nunc dapibus varius magna sit amet dignissim. Suspendisse in eros et diam iaculis viverra sed eget augue. Nullam sed egestas lectus, sed hendrerit mauris. Nulla nec imperdiet lorem. Pellentesque augue sem, pharetra sit amet lobortis ac, placerat vel lacus. Pellentesque id metus auctor, tincidunt mauris in, gravida nisi. Mauris egestas commodo arcu, et imperdiet nibh malesuada eget. Suspendisse non tempor quam. Sed sed nibh quam. Vivamus malesuada dui tortor. Sed vulputate odio non mi tincidunt porta. Sed condimentum nunc at odio condimentum, quis elementum leo porttitor. Donec eu maximus nunc. In sed sem eu libero sodales consequat eu scelerisque lectus.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nNullam id sollicitudin ante. Mauris orci diam, sagittis sit amet urna sed, imperdiet finibus ligula. Donec at sodales magna. Donec congue turpis ut neque pretium elementum. Sed eget finibus enim. Duis maximus efficitur magna a auctor. Cras in luctus nisi, id commodo sapien. Sed vestibulum fringilla turpis dictum finibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus nec tellus lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sed odio sed nibh tristique convallis. Praesent commodo dui sit amet velit auctor viverra. Curabitur at est nisl. Quisque ut ornare magna.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nNullam et iaculis eros. Ut velit sem, vehicula non elementum ac, pulvinar in magna. Aenean nec quam eu odio fringilla rhoncus ac eget augue. Proin vel lobortis lacus, vitae dictum enim. Nulla facilisi. Donec feugiat urna eget augue viverra, vel finibus tellus sagittis. Proin eu purus ipsum. Etiam vitae egestas quam, at luctus urna. Phasellus et pretium arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent massa elit, sollicitudin at lacinia a, mattis eget tortor. Nulla massa erat, tincidunt sed nisi eget, consectetur porta tellus. Curabitur maximus malesuada nunc, ut consectetur velit laoreet a. Donec leo risus, efficitur vehicula eros vitae, lobortis luctus dui. Nunc eget lobortis ex. Vestibulum ac neque nec libero ornare ornare.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nPraesent vehicula risus id sollicitudin tincidunt. Maecenas venenatis leo vel sem lobortis, sollicitudin dignissim odio molestie. Proin volutpat enim ullamcorper, consequat nibh id, accumsan odio. In faucibus tellus orci, id laoreet arcu dictum sagittis. Nam non purus eget turpis scelerisque congue ac ut eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi et efficitur ipsum. Aliquam id enim nisi. Vivamus convallis blandit maximus. Praesent sed lorem magna. Suspendisse tristique arcu sapien, a sollicitudin augue volutpat vulputate. Nulla bibendum tristique odio, et malesuada nunc mattis nec. Donec porta ligula tortor, eget ultrices magna tincidunt nec.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nIn semper auctor libero sed gravida. Nunc sollicitudin, quam eget varius mollis, turpis nulla pulvinar quam, vitae maximus nisl leo id magna. Fusce tincidunt et est eu ornare. Fusce faucibus, nulla quis mollis mollis, lacus tellus elementum mauris, nec molestie sem orci ut neque. Morbi facilisis justo in nunc congue, eget tempor sem egestas. Pellentesque ullamcorper finibus enim. Donec sollicitudin fermentum dui. Maecenas sodales dolor ut libero blandit tristique. Praesent malesuada nisi a sem interdum, et sagittis justo ultricies. Sed tempor purus in ultricies eleifend. Pellentesque eleifend viverra nunc, eget feugiat lorem blandit quis.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nAenean velit quam, commodo eget ultricies id, pulvinar nec sapien. Praesent eu libero eu felis faucibus mollis eget ac ex. Curabitur egestas pharetra aliquam. Vivamus posuere est a porttitor consectetur. Nullam vitae feugiat mauris. Vivamus et egestas massa. Suspendisse accumsan efficitur magna, id luctus turpis pharetra id. Aliquam elit turpis, congue id orci et, tincidunt molestie nisi.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nVestibulum vel mauris vitae quam lacinia maximus sed eu ipsum. Integer eget felis vel quam commodo rutrum. Mauris imperdiet facilisis congue. Phasellus posuere, metus a posuere suscipit, tellus nunc aliquet ipsum, sed scelerisque magna nisl in lectus. Donec quis porttitor libero. In vel pharetra leo. In gravida justo nisi, a feugiat nisi porttitor ut. Curabitur convallis orci enim, et maximus tortor gravida eu. Nulla consectetur euismod dui a faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse varius, lectus at facilisis faucibus, odio ante consequat tortor, a laoreet enim tellus eu sapien. Curabitur mattis imperdiet faucibus.\\n\"],[14],[11,\"p\",[]],[13],[0,\"\\nInteger blandit accumsan diam, in bibendum odio pulvinar in. Quisque venenatis lorem nibh, et scelerisque lorem commodo eu. Sed a lectus lobortis, viverra sem nec, porta est. Aenean ante velit, varius vel mi sit amet, ornare porta turpis. Nam ac accumsan lorem, eget interdum orci. Sed suscipit sodales mi, sit amet mollis augue dignissim quis. Nunc feugiat ex in eros rutrum, vel ultricies justo feugiat. Nunc non odio magna. Cras dictum orci at enim posuere, id consectetur dui euismod. Nulla porttitor ligula nec nibh ultricies congue. Vivamus vel odio tempus, malesuada dui eu, mattis nunc. Curabitur velit nisl, posuere eget mauris nec, sollicitudin pulvinar ligula. Nulla ac neque sed metus consectetur consequat. Aliquam ut massa et nulla iaculis iaculis. Phasellus nec magna interdum, laoreet dolor in, maximus nisi.\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/lorem-ipsum.hbs" } });
});
define("dummy/templates/grid-responsive", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "38Tbplwc", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"grid-responsive.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"This Grid responds to @container queries\"],[14],[0,\"\\n\\n    \"],[6,[\"flexi-grid\"],null,[[\"responsive\",\"class\"],[\"\",\"example\"]],{\"statements\":[[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: cornflowerblue\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"Examples\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: lavenderblush\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: burlywood\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: crimson\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"4\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: hotpink\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"5\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: mediumaquamarine\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"6\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: salmon\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"7\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: blanchedalmond\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"8\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: steelblue\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"9\"],[14],[0,\"\\n    \"]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/grid-responsive.hbs" } });
});
define("dummy/templates/grid-rows-responsive", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "itYX8lrj", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"grid-rows-responsive.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"This Row Grid responds to @container queries\"],[14],[0,\"\\n\\n    \"],[6,[\"flexi-container\"],null,[[\"class\"],[\"example\"]],{\"statements\":[[0,\"\\n      \"],[11,\"vbox\",[]],[13],[0,\"\\n        \"],[11,\"hbox\",[]],[15,\"style\",\"background-color: lightpink\"],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"              Examples\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"\\n            \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"\\n            \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"hbox\",[]],[15,\"style\",\"background-color: lightgreen\"],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"4\"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"5\"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"6\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"hbox\",[]],[15,\"style\",\"background-color: lightblue\"],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"7\"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"8\"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"9\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/grid-rows-responsive.hbs" } });
});
define("dummy/templates/grid-rows", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "V02rkkv0", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"grid-rows.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"This Row Grid responds to @media queries\"],[14],[0,\"\\n\\n    \"],[11,\"vbox\",[]],[15,\"class\",\"example\"],[13],[0,\"\\n      \"],[11,\"hbox\",[]],[15,\"style\",\"background-color: lightpink\"],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"            Examples\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"hbox\",[]],[15,\"style\",\"background-color: lightgreen\"],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"4\"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"5\"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"6\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"hbox\",[]],[15,\"style\",\"background-color: lightblue\"],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"7\"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"8\"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"col-md-4 col-xs-12\"],[13],[0,\"9\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/grid-rows.hbs" } });
});
define("dummy/templates/grid", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GPWNknaz", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"grid-basic.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"This Grid responds to @media queries\"],[14],[0,\"\\n\\n    \"],[11,\"grid\",[]],[15,\"class\",\"example\"],[13],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: springgreen\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"Examples\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: bisque\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: darkgoldenrod\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: dodgerblue\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"4\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: orangered\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"5\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: olivedrab\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"6\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: chartreuse\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"7\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: fuchsia\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"8\"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"style\",\"background-color: powderblue\"],[15,\"class\",\"col-lg-2 col-md-3 col-sm-4 col-xs-6\"],[13],[0,\"9\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/grid.hbs" } });
});
define("dummy/templates/header-footer-with-scroll", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cBPj1j2j", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"fullscreen.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[15,\"style\",\"height: 100vh\"],[13],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"header\"],[13],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"Flexi\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"Examples\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end\"],[13],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[0,\"    \"],[11,\"hbox\",[]],[15,\"style\",\"overflow: scroll; flex-shrink: 1\"],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n      \"],[1,[26,[\"lorem-ipsum\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"centered\",[]],[15,\"class\",\"footer flexi-fit\"],[13],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Footer\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/header-footer-with-scroll.hbs" } });
});
define("dummy/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FuPOJVVC", "block": "{\"statements\":[[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"centered\",[]],[13],[0,\"\\n      \"],[11,\"vbox\",[]],[15,\"class\",\"col-xs-11\"],[13],[0,\"\\n        \"],[11,\"hbox\",[]],[15,\"class\",\"justify-center\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[13],[0,\"Flexi\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"hbox\",[]],[15,\"class\",\"justify-center\"],[13],[0,\"\\n          \"],[11,\"h2\",[]],[13],[0,\"Fantastically Fresh Flexbox for Ember\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"grid\",[]],[13],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"sidebar\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"fixed-left.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Sidebar\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"top-nav\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"fixed-left-with-top-nav.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Top Nav\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"tabs\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"grid.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Tabs\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"header-footer-with-scroll\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"fixed-left-with-top-nav.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Header + Footer w/ Scroll\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"grid\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"grid.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Grid\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"grid-responsive\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"grid.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Grid + Responsive\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"grid-rows\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"grid.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Grid w/rows\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"centered\",[]],[15,\"class\",\"col-md-3 col-sm-6 col-xs-12\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"grid-rows-responsive\"],[[\"class\"],[\"layout-mock\"]],{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"grid.svg\"],[15,\"alt\",\"grid\"],[13],[14],[0,\"\\n              \"],[11,\"box\",[]],[15,\"class\",\"text-center\"],[13],[0,\"Grid w/rows + Responsive\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/index.hbs" } });
});
define("dummy/templates/sidebar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4lAeUcxE", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"sidebar.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"hbox\",[]],[13],[0,\"\\n      \"],[11,\"vbox\",[]],[15,\"class\",\"sidebar col-sm-2 col-xs-3\"],[13],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n          \"],[11,\"h3\",[]],[13],[0,\"Flexi\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"            Examples\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"box\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n        \"],[1,[26,[\"lorem-ipsum\"]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/sidebar.hbs" } });
});
define("dummy/templates/tabs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+2TnFS4X", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"tabs.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"centered\",[]],[13],[0,\"\\n      \"],[11,\"vbox\",[]],[15,\"class\",\"col-xs-10 flexi-fit\"],[13],[0,\"\\n        \"],[11,\"hbox\",[]],[15,\"class\",\"tab-bar flexi-fit\"],[13],[0,\"\\n          \"],[11,\"hbox\",[]],[15,\"class\",\"flexi-fit\"],[13],[0,\"\\n            \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"                Examples\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n            \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding\"],[13],[0,\"\\n              \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end\"],[13],[0,\"\\n            \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n              \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"hbox\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n          \"],[1,[26,[\"lorem-ipsum\"]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tabs.hbs" } });
});
define("dummy/templates/top-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SshLqEH4", "block": "{\"statements\":[[11,\"centered\",[]],[15,\"class\",\"code-snippet-section flexi-fit\"],[13],[0,\"\\n  \"],[1,[33,[\"code-snippet\"],null,[[\"name\"],[\"top-nav.hbs\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"screen\",[]],[13],[0,\"\\n  \"],[11,\"page\",[]],[13],[0,\"\\n    \"],[11,\"hbox\",[]],[15,\"class\",\"header flexi-fit\"],[13],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"Flexi\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"index\"],null,{\"statements\":[[0,\"Examples\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"https://flexi.readme.io/docs\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"Docs\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"hbox\",[]],[15,\"class\",\"justify-end\"],[13],[0,\"\\n        \"],[11,\"centered\",[]],[15,\"class\",\"nav-with-padding flexi-fit\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/html-next/flexi\"],[15,\"target\",\"_blank\"],[15,\"rel\",\"noopener\"],[13],[0,\"GitHub\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"box\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n      \"],[1,[26,[\"lorem-ipsum\"]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/top-nav.hbs" } });
});
define('dummy/transitions', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    this.transition(this.use('fade'));
  };
});
define('dummy/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _crossFade) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _crossFade.default;
    }
  });
});
define('dummy/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _default) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _default.default;
    }
  });
});
define('dummy/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _explode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _explode.default;
    }
  });
});
define('dummy/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _fade) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fade.default;
    }
  });
});
define('dummy/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _flexGrow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flexGrow.default;
    }
  });
});
define('dummy/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _flyTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flyTo.default;
    }
  });
});
define('dummy/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _moveOver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moveOver.default;
    }
  });
});
define('dummy/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _scale) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scale.default;
    }
  });
});
define('dummy/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _scrollThen) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scrollThen.default;
    }
  });
});
define('dummy/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _toDown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toDown.default;
    }
  });
});
define('dummy/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _toLeft) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toLeft.default;
    }
  });
});
define('dummy/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _toRight) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toRight.default;
    }
  });
});
define('dummy/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _toUp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toUp.default;
    }
  });
});
define('dummy/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _wait.default;
    }
  });
});


define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
//# sourceMappingURL=dummy.map
