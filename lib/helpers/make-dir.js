/* jshint node: true */
var path = require("path");
var fs = require("fs");

module.exports = function makeDir(base, destPath) {
  destPath = destPath.split("/");
  destPath.forEach(function (segment) {
    if (segment) {
      base = path.join(base, segment);
      try {
        fs.mkdirSync(base);
      } catch (e) {
        if (e.code !== "EEXIST") {
          throw e;
        }
      }
    }
  });
};
