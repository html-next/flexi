/*jshint node:true*/
const path = require('path');
const fs = require('fs');

const LAYOUT_DIRNAME = '-layouts';

module.exports = {
  description: 'Generate A New Layout',

  locals(options) {
    return {
      SnakedPackageName: snake(options.entity.name),
    };
  },

  fileMapTokens() {
    const configPath = path.join(this.project.root, 'config', 'flexi.js');
    let config;

    if (fs.existsSync(configPath)) {
      config = require(configPath);
    }

    const LayoutNames = config.breakpoints.map(function (bp) {
      return bp.name;
    });

    return {
      __path__(options) {
        const parts = [];
        if (!options.pod) {
          parts.push('templates');
        }
        if (options.pod && options.podPath) {
          parts.push(options.podPath);
        }
        const nameParts = options.dasherizedModuleName.split('/');
        nameParts.pop();
        nameParts.push(LAYOUT_DIRNAME);
        parts.push(nameParts.join('/'));
        return parts.join('/');
      },

      __name__(options) {
        const nameParts = options.dasherizedModuleName.split('/');
        const name = nameParts.pop();
        if (!LayoutNames.includes(name)) {
          throw new Error(
            "Invalid Layout name '" +
              name +
              "'. Valid names are '" +
              LayoutNames.join(', ') +
              "'"
          );
        }
        return name;
      },
    };
  },
};

function snake(str) {
  const first = str.substr(0, 1);
  const rest = str.substr(1);

  return first.toUpperCase() + rest;
}
