import Route from '@ember/routing/route';

export default class extends Route {
  model() {
    return { foo: 123, bar: { foo: 'abc' } };
  }
}
