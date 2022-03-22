'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const shim = require('./lib/pod-templates-shim');

shim(EmberApp);
shim(EmberAddon);

module.exports = function (defaults) {
  defaults.snippetSearchPaths = ['tests/dummy/app'];
  defaults.snippetPaths = ['tests/dummy/snippets'];

  const app = new EmberAddon(defaults, {
    'ember-cli-babel': {
      includePolyfill: true,
    },
    sassOptions: {},
    hinting: true,
    nodeAssets: {
      testdouble: {
        vendor: ['dist/testdouble.js'],
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import('vendor/testdouble/dist/testdouble.js', {
    using: [{ transformation: 'amd', as: 'testdouble' }],
  });

  return app.toTree();
};
