'use strict';
/* eslint-disable no-console */
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

const chalk = require('chalk');
const Plugin = require('broccoli-plugin');
const path = require('path');
const fs = require('fs');
const compile = require('./compile');

const LAYOUT_DIRNAME = '-layouts';
const makeDir = require('./helpers/make-dir');

function getNicePath(dirPath, base) {
  let nicePath = dirPath.replace(base, '');
  if (nicePath.startsWith('/')) {
    nicePath = nicePath.slice(1);
  }
  const parts = nicePath.split('/');
  parts.shift();
  return parts.join('/');
}

function collectLayout(dirPath, pathInfo, layoutNames) {
  let hasTemplate = false;
  const nicePath = getNicePath(dirPath, pathInfo.base);
  const isClassic = nicePath.startsWith('templates/');
  const isModern = nicePath.startsWith('components/');
  const moduleName = path.parse(dirPath).name;
  let templatePath;
  try {
    templatePath =
      isClassic || isModern ? path.join(dirPath, '../' + moduleName + '.hbs') : path.join(dirPath, 'template.hbs');
    const template = fs.statSync(templatePath);
    hasTemplate = template && template.isFile();
  } catch {
    hasTemplate = false;
  }
  const layout = {
    name: moduleName,
    isClassic,
    isModern,
    layouts: {},
    templatePath,
    hasTemplate,
    fullPath: dirPath,
    pathInfo,
  };
  fs.readdirSync(path.join(dirPath, LAYOUT_DIRNAME)).forEach(function (layoutName) {
    const { name } = path.parse(layoutName);

    if (layoutNames.includes(name)) {
      layout.layouts[name] = {
        template: layoutName,
        name,
        templatePath: path.join(layout.fullPath, LAYOUT_DIRNAME, layoutName),
      };
    } else {
      const stats = fs.statSync(path.join(dirPath, LAYOUT_DIRNAME, layoutName));
      if (stats && stats.isFile()) {
        console.warn(chalk.yellow('Layout ' + name + ' is not a valid layout.'));
      }
    }
  });

  return layout;
}

function collectLayouts(dirPath, pathInfo, layoutNames) {
  let layouts = [];
  const dir = fs.readdirSync(dirPath);
  dir.forEach(function (name) {
    const f = path.join(dirPath, name);
    const stat = fs.statSync(f);

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

class LayoutCompiler extends Plugin {
  constructor(inputNodes, options) {
    options = options || {
      annotation: 'Flexi Layout Compiler',
    };

    super([inputNodes], {
      annotation: options.annotation,
    });

    this.options = options;
  }

  buildLayout(layout) {
    const destPath = layout.fullPath.substr(layout.pathInfo.base.length + 1);
    const dest =
      layout.isClassic || layout.isModern
        ? path.join(layout.pathInfo.output, destPath, '../' + layout.name + '.hbs')
        : path.join(layout.pathInfo.output, destPath, 'template.hbs');

    makeDir(layout.pathInfo.output, destPath);

    Object.keys(layout.layouts).forEach(function (layoutName) {
      const layoutOption = layout.layouts[layoutName];
      layoutOption.data = fs.readFileSync(layoutOption.templatePath);
    });

    compile(dest, layout.layouts, this.options.breakpoints);
    return Promise.resolve();
  }

  build() {
    const _self = this;
    const builtAll = [];
    const layoutNames = this.options.breakpoints.map(function (bp) {
      return bp.name;
    });

    this.inputPaths.forEach(function (currentPath) {
      const pathInfo = {
        base: currentPath,
        output: _self.outputPath,
      };
      const layouts = collectLayouts(currentPath, pathInfo, layoutNames);
      const built = layouts.map(_self.buildLayout.bind(_self));
      builtAll.push(Promise.all(built));
    });

    return Promise.all(builtAll);
  }
}

module.exports = LayoutCompiler;
