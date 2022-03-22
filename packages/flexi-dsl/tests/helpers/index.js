// tests/helpers/index.js
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';

// intercept to add additional setup
// see https://github.com/emberjs/rfcs/blob/master/text/0637-customizable-test-setups.md
export function setupTest(hooks, options) {
  upstreamSetupTest(hooks, options);

  hooks.beforeEach(function () {
    // put any additional for-every-test setup here
  });
}

export function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);

  hooks.beforeEach(function () {
    // put any additional for-every-test setup here
  });
}

export function setupApplicationTest(hooks, options) {
  upstreamSetupApplicationTest(hooks, options);

  hooks.beforeEach(function () {
    // put any additional for-every-test setup here
  });
}
