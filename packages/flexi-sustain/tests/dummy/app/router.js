import EmberRouter from 'ember-router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('site-index');

  this.route('tests', function() {
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
