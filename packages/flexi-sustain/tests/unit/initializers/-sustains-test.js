import Application from 'ember-application';
import run from 'ember-runloop';
import SustainsInitializer from 'dummy/initializers/-sustains';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer |  sustains', {
  beforeEach() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  SustainsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
