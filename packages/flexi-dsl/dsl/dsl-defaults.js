'use strict';

const LAYOUT_PROPERTIES = [
  'fill',
  'fit',
  'horizontal',
  'nowrap',
  'vertical',
  'wrap',
  { name: 'align', values: ['start', 'end', 'stretch', 'center', 'baseline'] },
  { name: 'align-content', values: ['start', 'end', 'stretch', 'center', 'around', 'between'] },
  { name: 'align-self', values: ['start', 'end', 'stretch', 'center', 'baseline'] },
  { name: 'justify', values: ['start', 'end', 'center', 'between', 'around'] }
];

/*
  Flexi DSL
 */
module.exports = {

  generateGridClass(breakpointPrefix, colNumber, columnPrefix) {
    return `${columnPrefix ? `${columnPrefix}-` : ''}${breakpointPrefix}-${colNumber}`;
  },

  generateResponderClass(breakpointPrefix, responder, value) {
    if (value) {
      return `${responder}-${value}-${breakpointPrefix}`;
    }

    return `${responder}-${breakpointPrefix}`;
  },

  generateAttributeClass(attribute, value) {
    if (value) {
      return `${attribute}-${value}`;
    }

    return `flexi-${attribute}`;
  },

  generateOffsetClass(breakpointPrefix, colNumber, columnPrefix) {
    return `${columnPrefix ? `${columnPrefix}-` : ''}offset-${breakpointPrefix}-${colNumber}`;
  },

  /*
    Only elements with a tag matching elements in the DSL have their attributes
    and properties converted.
   */
  elements: ['box', 'centered', 'container', 'fill', 'grid', 'hbox', 'page', 'screen', 'vbox'],

  /*
    Responders are values which can occur within breakpoint properties
   */
  responders: ['hidden', 'visible'].concat(LAYOUT_PROPERTIES),

  /*
    Attributes are values which can occur directly on the element
   */
  attributes: LAYOUT_PROPERTIES,

  // set at build time
  breakpoints: null,

  transformAll: false
};
