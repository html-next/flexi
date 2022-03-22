/* eslint-disable indent */
'use strict';

let fs = require('fs');
let path = require('path');

const GENERATE_CONFIG_COMMAND =  '`ember g @html-next/flexi-config`';

function assert(statement, test) {
  if (!test) {
    throw new Error(statement);
  }
}

module.exports = function(projectRoot) {
  if ((['g', 'generate'].indexOf(process.argv[2]) !== -1 && process.argv[3] === '@html-next/flexi-config')
      || (process.argv[2] === 'install' && process.argv[3].indexOf('flexi') !== -1)) {
    // A flexi-config is currently being generated,
    // or flexi is being installed, ignore validation.
    return {};
  }

  let configPath = path.join(projectRoot, 'config', 'flexi.js');

  assert(`You must define a config file for flexi at '${configPath}'.`
         + ` To generate a new config file, run ${GENERATE_CONFIG_COMMAND}`,
         fs.existsSync(configPath));

  let flexiConfig = require(configPath);

  assert('config/flexi.js is defined, but could not be imported', flexiConfig);
  assert('config/flexi.js is defined, but does not contain property [array] breakpoints,'
         + ` consider running ${GENERATE_CONFIG_COMMAND} to see the default config file.`,
         flexiConfig.breakpoints instanceof Array);
  assert('config/flexi.js is defined, but does not contain property [number] columns,'
         + ` consider running ${GENERATE_CONFIG_COMMAND} to see the default config file.`,
         typeof flexiConfig.columns === 'number');

  return flexiConfig;
};
