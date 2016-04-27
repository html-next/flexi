/* jshint node: true */
'use strict';

var LayoutProperties = ["wrap", "nowrap", "fit", "fill", "horizontal", "vertical"];

/*
  Flexi DSL
 */
module.exports = {

  generateGridClass: function(breakpoint, colNumber, columnPrefix /*, totalColumns*/) {
    return (columnPrefix ? columnPrefix + "-" : "") + breakpoint.prefix + "-" + colNumber;
  },

  generateResponderClass: function(breakpoint, responder) {
    return responder + "-" + breakpoint.prefix;
  },

  generateAttributeClass: function(property, value) {
    if (value) {
      return property + "-" + value;
    }
    return "flexi-" + property;
  },

  generateOffsetClass: function(breakpoint, colNumber, columnPrefix /*, totalColumns*/) {
    return (columnPrefix ? columnPrefix + "-" : "") + breakpoint.prefix + "-offset-" + colNumber;
  },

  /*
    Only elements with a tag matching elements in the DSL have their attributes
    and properties converted.
   */
  elements: [ "box", "centered", "container", "fill", "grid", "grid", "hbox", "page", "screen", "vbox" ],

  /*
    Responders are values which can occur within breakpoint properties
   */
  responders: ["hidden", "visible"].concat(LayoutProperties),

  /*
    Properties are values which can occur directly on the element
   */
  attributes: LayoutProperties.concat([
    { name: 'justify', values: ["start", "end", "center", "between", "around"] },
    { name: 'align', values: ["start", "end", "stretch", "center", "baseline"] }
  ]),

  // set at build time
  breakpoints: null,

  transformAll: false
};
