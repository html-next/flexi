import Ember from 'ember';
import FeaturesResolverMixin from '../../../mixins/features-resolver';
import { module, test } from 'qunit';

module('Unit | Mixin | features resolver');

// Replace this with your real tests.
test('it works', function(assert) {
  let FeaturesResolverObject = Ember.Object.extend(FeaturesResolverMixin);
  let subject = FeaturesResolverObject.create();
  assert.ok(subject);
});
