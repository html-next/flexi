import Ember from 'ember';

export default Ember.Controller.extend({

  componentName: 'docs/components/example-grid',

  actions: {
    showExample(name) {
      this.set('componentName', `docs/components/example-${name}`);
    }
  }

});
