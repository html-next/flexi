/* jshint node: true */
'use strict';
var fs = require('fs');
var EOL = require('os').EOL;

/*
{{#flexi-layout as |Layout|}}
  {{#if Layout.isHuge}}
    ... huge layout ...
  {{else if Layout.isDesktop}}
    ... desktop layout ...
  {{else if Layout.isTablet}}
    ... tablet layout ...
  {{else}}
    ... mobile layout ...
  {{/if}}
{{/flexi-layout}}
 */

module.exports = function compile(file, layouts) {
  var inputs = [];

  var ordered = orderedLayouts(layouts);

  ordered.forEach(function(layout, index) {
    if (index === 0) {
      inputs.push('{{#flexi-layout as |FlexiLayout|}}', makeFirstTest(layout.name), layout.data);
    }
    if (index === ordered.length - 1) {
      inputs.push('{{else}}', layout.data, '{{/if}}', '{{/flexi-layout}}');
    } else {
      inputs.push(makeMiddleTest(layout.name), layout.data);
    }
  });

  inputs.forEach(function(input) {
    fs.appendFileSync(file, input + EOL);
  });

};

function orderedLayouts(layouts) {
  // TODO replace with config
  var ordered = [layouts.huge, layouts.desktop, layouts.tablet, layouts.mobile];
  return ordered.filter(function(item) {
    return !!item;
  });
}

function makeFirstTest(name) {
  return '{{#if Layout.is' + capitalize(name) + '}}';
}

function makeMiddleTest(name) {
  return '{{else if Layout.is' + capitalize(name) + '}}';
}

function capitalize(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}
