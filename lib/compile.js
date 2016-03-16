/* jshint node: true */
'use strict';
var fs = require('fs');
var EOL = require('os').EOL;
var chalk = require('chalk');
var debug = false;

module.exports = function compile(file, layouts, breakpoints) {
  var inputs = [];
  var ordered = orderedLayouts(layouts, breakpoints);

  if (ordered.length === 1) {
    inputs.push(
      '{{#with (-inject-layout) as |FlexiLayout|}}',
      ordered[0].data,
      '{{/with}}'
    );
    return build(file, inputs);
  }

  ordered.forEach(function(layout, index) {
    if (index === 0) {
      inputs.push('{{#with (-inject-layout) as |FlexiLayout|}}', makeFirstTest(layout.name), layout.data);
    } else if (index === ordered.length - 1) {
      inputs.push('{{else}}', layout.data, '{{/if}}', '{{/with}}');
    } else {
      inputs.push(makeMiddleTest(layout.name), layout.data);
    }
  });

  return build(file, inputs);
};

function build(file, inputs) {
  inputs.forEach(function(input) {
    fs.appendFileSync(file, input + EOL);
  });
  if (debug) {
    console.log(
      chalk.yellow(
        'Compiled Layout: ' + file.substr(file.indexOf('.tmp') + 5)
      ));
    console.log(
      '\n',
      chalk.cyan(fs.readFileSync(file),
        '\n\n'
      ));
  }
  return true;
}

function orderedLayouts(layouts, breakpoints) {
  var sizes = breakpoints.sort(function(a, b) {
    return a.begin > b.begin ? -1 : 1;
  });

  if (debug) {
    console.log('Layout Order:\n', sizes);
  }

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
