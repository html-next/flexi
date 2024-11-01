/* eslint-disable indent */
'use strict';

const fs = require('fs');
const path = require('path');

const GENERATE_CONFIG_COMMAND = '`ember g @html-next/flexi-config`';

function assert(statement, test) {
  if (!test) {
    throw new Error(statement);
  }
}

module.exports = function (projectRoot) {
  if (
    (['g', 'generate'].includes(process.argv[2]) && process.argv[3] === '@html-next/flexi-config') ||
    (process.argv[2] === 'install' && process.argv[3].includes('flexi'))
  ) {
    // A flexi-config is currently being generated,
    // or flexi is being installed, ignore validation.
    return {};
  }

  const configPath = path.join(projectRoot, 'config', 'flexi.js');

  assert(
    `You must define a config file for flexi at '${configPath}'.` +
      ` To generate a new config file, run ${GENERATE_CONFIG_COMMAND}`,
    fs.existsSync(configPath)
  );

  const flexiConfig = require(configPath);

  assert('config/flexi.js is defined, but could not be imported', flexiConfig);
  assert(
    'config/flexi.js is defined, but does not contain property [array] breakpoints,' +
      ` consider running ${GENERATE_CONFIG_COMMAND} to see the default config file.`,
    Array.isArray(flexiConfig.breakpoints)
  );
  assert(
    'config/flexi.js is defined, but does not contain property [number] columns,' +
      ` consider running ${GENERATE_CONFIG_COMMAND} to see the default config file.`,
    typeof flexiConfig.columns === 'number'
  );

  return flexiConfig;
};
