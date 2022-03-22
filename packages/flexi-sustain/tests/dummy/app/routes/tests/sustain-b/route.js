import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return { foo: 456, bar: { foo: 'xyz' } };
  },
});
