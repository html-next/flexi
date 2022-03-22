import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('site-index');

  this.route('tests', function() {
    this.route('layouts');
    this.route('mobile-first');
  });

  this.route('classic-layout-test');
});

export default Router;
