import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return { foo: 456, bar: { foo: 'xyz' } };
  }
});
