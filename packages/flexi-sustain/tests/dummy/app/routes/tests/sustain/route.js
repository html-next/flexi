import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return { foo: 123, bar: { foo: 'abc' } };
  },
});
