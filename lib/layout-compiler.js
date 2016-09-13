/* jshint node: true */
/**
 * LayoutCompiler takes a template tree and converts templates of the form
 *
 * layouts/
 *   mobile.hbs
 *   tablet.hbs
 *   desktop.hbs
 *   huge.hbs
 *
 * to `template.hbs` files.
 *
 * If an existing `template.hbs` file is present, it will be overwritten
 * with a warning.
 */

var chalk = require("chalk");
var Plugin = require("broccoli-plugin");
var path = require("path");
var fs = require("fs");
var Promise = require("rsvp").Promise; // jshint ignore:line
var compile = require("./compile");
var LAYOUT_DIRNAME = "-layouts";
var makeDir = require("./helpers/make-dir");

function collectLayouts(dirPath, pathInfo, layoutNames) {
  var layouts = [];
  var dir = fs.readdirSync(dirPath);
  dir.forEach(function (name) {
    var f = path.join(dirPath, name);
    var stat = fs.statSync(f);

    if (stat && stat.isDirectory()) {
      if (name === LAYOUT_DIRNAME) {
        layouts.push(collectLayout(dirPath, pathInfo, layoutNames));
      } else {
        layouts = layouts.concat(collectLayouts(f, pathInfo, layoutNames));
      }
    }
  });

  return layouts;
}

function collectLayout(dirPath, pathInfo, layoutNames) {
  var hasTemplate = false;
  var isClassic = dirPath.indexOf("templates/") !== -1;
  var moduleName = path.parse(dirPath).name;
  try {
    var templatePath = isClassic ?
      path.join(dirPath, "../" + moduleName + ".hbs") :
      path.join(dirPath, "template.hbs");
    var template = fs.statSync(templatePath);
    hasTemplate = template && template.isFile();
  } catch (e) {
    hasTemplate = false;
  }
  var layout = {
    name: moduleName,
    isClassic: isClassic,
    layouts: {},
    hasTemplate: hasTemplate,
    fullPath: dirPath,
    pathInfo: pathInfo
  };
  fs.readdirSync(path.join(dirPath, LAYOUT_DIRNAME))
    .forEach(function (layoutName) {
      var name = path.parse(layoutName).name;

      if (layoutNames.indexOf(name) !== -1) {
        layout.layouts[name] = {
          template: layoutName,
          name: name,
          templatePath: path.join(layout.fullPath, LAYOUT_DIRNAME, layoutName)
        };
      } else {
        var stats = fs.statSync(path.join(dirPath, LAYOUT_DIRNAME, layoutName));
        if (stats && stats.isFile()) {
          console.warn(chalk.yellow("" +
            "Layout " + name + " is not a valid layout." +
            ""));
        }
      }
    });

  return layout;
}

// Create a subclass from Plugin
LayoutCompiler.prototype = Object.create(Plugin.prototype);
LayoutCompiler.prototype.constructor = LayoutCompiler;

function LayoutCompiler(inputNodes, options) {
  options = options || {
    annotation: "Flexi Layout Compiler"
  };
  this.options = options;

  Plugin.call(this, [inputNodes], {
    annotation: options.annotation
  });
}

LayoutCompiler.prototype.buildLayout = function (layout) {
  var destPath = layout.fullPath.substr(layout.pathInfo.base.length + 1);
  var dest = layout.isClassic ?
    path.join(layout.pathInfo.output, destPath, "../" + layout.name + ".hbs") :
    path.join(layout.pathInfo.output, destPath, "template.hbs");

  makeDir(layout.pathInfo.output, destPath);

  Object.keys(layout.layouts).forEach(function (layoutName) {
    var layoutOption = layout.layouts[layoutName];
    layoutOption.data = fs.readFileSync(layoutOption.templatePath);
  });

  compile(dest, layout.layouts, this.options.breakpoints);
  return Promise.resolve();

};

LayoutCompiler.prototype.build = function () {
  var _self = this;
  var builtAll = [];
  var layoutNames = this.options.breakpoints.map(function (bp) {
    return bp.name;
  });

  this.inputPaths.forEach(function (currentPath) {
    var pathInfo = {
      base: currentPath,
      output: _self.outputPath
    };
    var layouts = collectLayouts(currentPath, pathInfo, layoutNames);
    var built = layouts.map(_self.buildLayout.bind(_self));
    builtAll.push(Promise.all(built));
  });

  return Promise.all(builtAll);
};

module.exports = LayoutCompiler;
