import Ember from 'ember';
import SustainablesResolverMixin from '../../../mixins/sustainables-resolver';
import { module, test } from 'qunit';

module('Unit | Mixin | sustainables resolver');

// Replace this with your real tests.
test('it works', function(assert) {
  let SustainablesResolverObject = Ember.Object.extend(SustainablesResolverMixin);
  let subject = SustainablesResolverObject.create();
  assert.ok(subject);
});
