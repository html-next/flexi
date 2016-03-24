'use strict';
/* jshint node: true */

var path = require('path');
var chalk = require('chalk');
var renameTemplate = require('../tasks/rename-template');

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
    { name: 'verbose', type: Boolean, default: false, aliases: ['v'] }
  ],

  anonymousOptions: [
    '<type>',
    '<template-name>'
  ],

  run: function(commandOptions, rawArgs) {
    var config = this.project.config();
    var flexiConfig = config.flexi || {};
    var type = rawArgs.shift();
    var name = rawArgs.shift();
    var breakpoint = commandOptions.breakpoint || flexiConfig.defaultBreakpoint;

    if (!name) {
      name = type;
      type = 'route';
    }

    assert("You must supply a <template-name> to transform into a layout.", name);
    assert("You must either configure a defaultBreakpoint in config/flexi.js or use the -b flag to specify a breakpoint name for the layout.", breakpoint);

    if (commandOptions.verbose) {
      console.log(
        chalk.cyan('Flexi') + ' ' + chalk.yellow('move:layout') + ' ' +
        chalk.grey('converting the ') +  chalk.white(type) + chalk.grey('::') + chalk.white(name) + ' ' +
        chalk.grey('template to the layout for ') + chalk.white(breakpoint));
    }
    return renameTemplate({
      root: path.join(this.project.root, 'app'),
      type: type,
      name: name,
      verbose: commandOptions.verbose,
      breakpoint: breakpoint,
      prefix: getPodPrefix(config)
    });
  }
};


