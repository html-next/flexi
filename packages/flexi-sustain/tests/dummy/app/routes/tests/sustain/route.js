import Route from 'ember-route';

export default Route.extend({
  model() {
    return { foo: 123, bar: { foo: 'abc' } };
  }
});
