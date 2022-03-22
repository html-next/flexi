import { module } from 'qunit';
import { resolve } from 'rsvp';

import destroyApp from '../helpers/destroy-app';
import startApp from '../helpers/start-app';

export default function (name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        return Reflect.apply(options.beforeEach, this, arguments);
      }
    },

    afterEach() {
      const afterEach =
        options.afterEach && Reflect.apply(options.afterEach, this, arguments);
      return resolve(afterEach).then(() => destroyApp(this.application));
    },
  });
}
