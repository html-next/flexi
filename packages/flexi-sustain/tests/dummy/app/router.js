import EmberRouter from '@ember/routing/router';

import config from './config/environment';

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('site-index');

  this.route('tests', function () {
    this.route('sustain');
    this.route('sustain-b');
    this.route('mobile-first');
    this.route('sustain-no-layout');
    this.route('sustain-labels');
    this.route('sustain-labels-2');
    this.route('sustain-hooks');
    this.route('sustain-classic-component');
  });

  this.route('classic-layout-test');
});

export default Router;
