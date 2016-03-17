import Ember from 'ember';

const {
  Component,
  on
  } = Ember;

export default Component.extend({
  elementId: 'sustain-hooks-test',

  insertTriggered: false,
  willMoveTriggered: false,
  didMoveTriggered: false,

  willMoveEvent: false,
  didMoveEvent: false,

  didMove() {
    this.set('didMoveTriggered', true);
  },

  willMove() {
    this.set('willMoveTriggered', true);
  },

  _onDidMove: on('didMove', function() {
    this.set('didMoveEvent', true);
  }),

  _onWillMove: on('willMove', function() {
    this.set('willMoveEvent', true);
  }),

  willInsertElement() {
    this._super();
    this.set('insertTriggered', true);
  }

});
