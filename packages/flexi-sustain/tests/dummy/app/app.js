import Application from '@ember/application';
import Ember from 'ember';

import loadInitializers from 'ember-load-initializers';

import config from './config/environment';
import Resolver from './resolver';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

loadInitializers(App, config.modulePrefix);

export default App;
