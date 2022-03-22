'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function makeDir(base, destPath) {
  destPath = destPath.split(path.sep);
  destPath.forEach(function (segment) {
    if (segment) {
      base = path.join(base, segment);
      try {
        fs.mkdirSync(base);
      } catch (error) {
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }
    }
  });
};
