import RSVP from 'rsvp';

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  '-router': service('-routing'),

  model() {
    return RSVP.hash({
      emails: [
        { id: 1, title: 'Welcome To Flexi' },
        { id: 2, title: 'Activate Your Account' },
        { id: 3, title: 'Using Flexi with your next Ember Application' },
      ],
    });
  },
});
