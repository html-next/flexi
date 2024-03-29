'use strict';

const Plugin = require('broccoli-plugin');
const PATH = require('path');
const FS = require('fs');
const { EOL } = require('os');

function makeConfigLine(config, configVar, opt, defaultValue) {
  return `${configVar}: ${opt in config ? config[opt] : defaultValue};`;
}

function makeBreakpointLine(bp, isLast) {
  return `  ${bp.name}: ('${bp.prefix}', ${bp.begin})${isLast ? '' : ','}`;
}

function compile(outputPath, config) {
  const filePath = PATH.join(outputPath, '_variables.scss');

  const lines = [
    '/*',
    ' * This scss file is auto generated by Flexi to expose your configuration',
    " * options defined in config/flexi.js to flexi's SCSS",
    ' * ',
    ' * All unused rules are automatically filtered from your build.',
    ' */',
  ];

  // simple variables
  lines.push(
    makeConfigLine(config, '$gutter-padding', 'gutterPadding', '.5rem'),
    makeConfigLine(config, '$columns', 'columns', '12'),
    makeConfigLine(config, '$column-prefix', 'columnPrefix', 'col'),
    makeConfigLine(config, '$include-element-css', 'includeElementCSS', 'true'),
    makeConfigLine(config, '$include-css', 'includeCSS', 'true'),
    makeConfigLine(config, '$include-media-css', 'includeMediaCSS', 'true')
  );

  // breakpoints
  lines.push('$breakpoints: (');

  const bps = config.breakpoints.sort((a, b) => {
    return a.begin > b.begin ? 1 : -1;
  });

  bps.forEach((bp, i) => {
    lines.push(makeBreakpointLine(bp, i === bps.length - 1));
  });
  lines.push(');');

  lines.forEach((line) => {
    FS.appendFileSync(filePath, line + EOL);
  });

  return filePath;
}

module.exports = class FlexiVariableCompiler extends Plugin {
  constructor(node, flexiConfig) {
    super([node], { persistentOutput: true });

    this.flexiConfig = flexiConfig;

    this._hasBuilt = false;
  }

  build() {
    if (this._hasBuilt) {
      return;
    }

    compile(this.outputPath, this.flexiConfig);
    this._hasBuilt = true;
  }
};
