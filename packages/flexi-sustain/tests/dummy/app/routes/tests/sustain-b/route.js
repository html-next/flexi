import Route from 'ember-route';

export default Route.extend({
  model() {
    return { foo: 456, bar: { foo: 'xyz' } };
  }
});
