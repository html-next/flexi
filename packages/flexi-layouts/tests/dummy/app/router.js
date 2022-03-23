import EmberRouter from '@ember/routing/router';

import config from './config/environment';

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('site-index');

  this.route('tests', function () {
    this.route('layouts');
    this.route('mobile-first');
    this.route('modern-component');
  });

  this.route('classic-layout-testroute');
});

export default Router;
