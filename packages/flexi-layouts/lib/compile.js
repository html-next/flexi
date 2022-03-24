/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const { EOL } = require('os');
const chalk = require('chalk');

const debug = false;

function build(file, inputs) {
  inputs.forEach(function (input) {
    fs.appendFileSync(file, input + EOL);
  });
  if (debug) {
    const modulePathOffset = 5;

    console.log(
      chalk.yellow(
        'Compiled Layout: ' +
          file.substr(file.indexOf('.tmp') + modulePathOffset)
      )
    );
    console.log('\n', chalk.cyan(fs.readFileSync(file), '\n\n'));
  }
  return true;
}

function orderedLayouts(layouts, breakpoints) {
  const sizes = breakpoints.sort(function (a, b) {
    return a.begin > b.begin ? -1 : 1;
  });

  if (debug) {
    console.log('Layout Order:\n', sizes);
  }

  const ordered = sizes.map(function (size) {
    return layouts[size.name];
  });
  return ordered.filter(function (item) {
    return !!item;
  });
}

function capitalize(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function makeFirstTest(name) {
  return '{{#if FlexiLayout.isAtLeast' + capitalize(name) + '}}';
}

function makeMiddleTest(name) {
  return '{{else if FlexiLayout.isAtLeast' + capitalize(name) + '}}';
}

module.exports = function compile(file, layouts, breakpoints) {
  const inputs = [];
  const ordered = orderedLayouts(layouts, breakpoints);

  if (ordered.length === 1) {
    inputs.push(
      '{{#let (-inject-layout) as |FlexiLayout|}}',
      ordered[0].data,
      '{{/let}}'
    );
    return build(file, inputs);
  }

  ordered.forEach(function (layout, index) {
    if (index === 0) {
      inputs.push(
        '{{#let (-inject-layout) as |FlexiLayout|}}',
        makeFirstTest(layout.name),
        layout.data
      );
    } else if (index === ordered.length - 1) {
      inputs.push('{{else}}', layout.data, '{{/if}}', '{{/let}}');
    } else {
      inputs.push(makeMiddleTest(layout.name), layout.data);
    }
  });

  return build(file, inputs);
};
