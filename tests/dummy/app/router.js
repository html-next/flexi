import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('layout-test');
  this.route('emails');
  this.route('sustain-test');
  this.route('sustain-test-b');
  this.route('flex-demo');
  this.route('elements-test');
  this.route('components-test');
  this.route('grid-test');
});

export default Router;
