import Ember from 'ember';
import appendRange from '../utils/dom/append-range';

const {
  Mixin
  } = Ember;

export default Mixin.create({
  _fragment: null,

  willInsertElement() {
    // console.log('will insert support');
    this._super(...arguments);
    this._firstNode = this.element.firstChild;
    this._lastNode = this.element.lastChild;
    appendRange(this._fragment, this._firstNode, this._lastNode);
  },

  didInsertElement() {
    // console.log('did insert support');
  },

  willDestroy() {
    this._super(...arguments);
    this._fragment = null;
    this._firstNode = null;
    this._lastNode = null;
  },

  init() {
    this._super(...arguments);
    this._fragment = document.createDocumentFragment();
  }

});

