import Ember from 'ember';
import SustainsResolverMixin from '../../../mixins/sustains-resolver';
import { module, test } from 'qunit';

module('Unit | Mixin | sustains resolver');

// Replace this with your real tests.
test('it works', function(assert) {
  let SustainsResolverObject = Ember.Object.extend(SustainsResolverMixin);
  let subject = SustainsResolverObject.create();
  assert.ok(subject);
});
