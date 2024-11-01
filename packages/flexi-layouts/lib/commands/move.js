/* eslint-disable no-console */
'use strict';

const path = require('path');
const chalk = require('chalk');
const renameTemplate = require('../tasks/rename-template');

function assert(statement, test) {
  if (!test) {
    throw new Error(statement);
  }
}

function getPodPrefix(config) {
  return config.podModulePrefix ? config.podModulePrefix.substr(config.modulePrefix.length + 1) : '';
}

module.exports = {
  name: 'move:layout',
  aliases: ['mvl'],
  description: 'Convert a template file into a layout file.',
  works: 'insideProject',

  availableOptions: [
    { name: 'breakpoint', type: String, aliases: ['b'] },
    { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
  ],

  anonymousOptions: ['<type>', '<template-name>'],

  run(commandOptions, rawArgs) {
    const config = this.project.config();
    const flexiConfig = config.flexi || {};
    let type = rawArgs.shift();
    let name = rawArgs.shift();
    const breakpoint = commandOptions.breakpoint || flexiConfig.defaultBreakpoint;

    if (!name) {
      name = type;
      type = 'route';
    }

    assert('You must supply a <template-name> to transform into a layout.', name);
    assert(
      'You must either configure a defaultBreakpoint in config/flexi.js or use the -b flag to specify a breakpoint name for the layout.',
      breakpoint
    );

    if (commandOptions.verbose) {
      console.log(
        chalk.cyan('Flexi') +
          ' ' +
          chalk.yellow('move:layout') +
          ' ' +
          chalk.grey('converting the ') +
          chalk.white(type) +
          chalk.grey('::') +
          chalk.white(name) +
          ' ' +
          chalk.grey('template to the layout for ') +
          chalk.white(breakpoint)
      );
    }
    return renameTemplate({
      root: path.join(this.project.root, 'app'),
      type,
      name,
      verbose: commandOptions.verbose,
      breakpoint,
      prefix: getPodPrefix(config),
    });
  },
};
