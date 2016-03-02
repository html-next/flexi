import Ember from 'ember';

export default Ember.Route.extend({

  '-router': Ember.inject.service('-routing'),

  model() {
    return Ember.RSVP.hash({
      emails: [
        { id: 1, title: 'Welcome To Flexi' },
        { id: 2, title: 'Activate Your Account' },
        { id: 3, title: 'Using Flexi with your next Ember Application' }
      ]
    });
  }
});
