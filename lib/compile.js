/* jshint node: true */
'use strict';
var fs = require('fs');
var EOL = require('os').EOL;

module.exports = function compile(file, layouts, breakpoints) {
  var inputs = [];

  var ordered = orderedLayouts(layouts, breakpoints);

  ordered.forEach(function(layout, index) {
    if (index === 0) {
      inputs.push('{{#with (-inject-layout) as |FlexiLayout|}}', makeFirstTest(layout.name), layout.data);
    }
    if (index === ordered.length - 1) {
      inputs.push('{{else}}', layout.data, '{{/if}}', '{{/with}}');
    } else {
      inputs.push(makeMiddleTest(layout.name), layout.data);
    }
  });

  inputs.forEach(function(input) {
    fs.appendFileSync(file, input + EOL);
  });

};

function orderedLayouts(layouts, breakpoints) {
  var sizes = breakpoints.sort(function(a, b) {
    return a.begin > b.begin ? a : b;
  });

  var ordered = sizes.map(function(size) {
    return layouts[size.name];
  });
  return ordered.filter(function(item) {
    return !!item;
  });
}

function makeFirstTest(name) {
  return '{{#if FlexiLayout.is' + capitalize(name) + '}}';
}

function makeMiddleTest(name) {
  return '{{else if FlexiLayout.is' + capitalize(name) + '}}';
}

function capitalize(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}
