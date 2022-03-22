import Ember from 'ember';

const {
  Component,
  on
  } = Ember;

export default Component.extend({
  elementId: 'sustain-hooks-test',

  insertTriggeredCount: 0,
  willMoveTriggeredCount: 0,
  didMoveTriggeredCount: 0,

  willMoveEventCount: 0,
  didMoveEventCount: 0,

  didUpdateModelCount: 0,

  didMove() {
    this.incrementProperty('didMoveTriggeredCount');
  },

  didUpdateModel() {
    this.incrementPRoperty('didUpdateModelCount');
  },

  willMove() {
    this.incrementProperty('willMoveTriggeredCount');
  },

  _onDidMove: on('didMove', function() {
    this.incrementProperty('didMoveEventCount');
  }),

  _onWillMove: on('willMove', function() {
    this.incrementProperty('willMoveEventCount');
  }),

  willInsertElement() {
    this._super();
    this.incrementProperty('insertTriggeredCount');
  }

});
