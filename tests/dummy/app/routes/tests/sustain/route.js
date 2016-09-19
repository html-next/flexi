import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return { foo: 123, bar: { foo: 'abc' }};
  }
});
