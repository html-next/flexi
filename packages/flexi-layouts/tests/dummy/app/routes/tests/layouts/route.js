import Route from '@ember/routing/route';

export default class extends Route {
  model() {
    return {
      emails: [
        { id: 1, title: 'Welcome To Flexi' },
        { id: 2, title: 'Activate Your Account' },
        { id: 3, title: 'Using Flexi with your next Ember Application' },
      ],
    };
  }
}
