'use strict';
/* jshint node:true */
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var mkDir = require('../helpers/make-dir');

function exists(templatePath, type, verbose) {
  try {
    var stats = fs.statSync(templatePath);
  } catch (e) {
    stats = false;
  }

  if (stats && stats.isFile()) {
    if (verbose) {
      console.log(
        chalk.green('[✓] ' + type) + chalk.grey(' ' + templatePath)
      );
    }
    return templatePath;
  }

  if (verbose) {
    console.log(
      chalk.red('[x] ' + type) + chalk.grey(' ' + templatePath)
    );
  }
  return false;
}


function resolveClassic(name, options) {
  var templatePath = path.join(options.root, 'templates/' + (options.type === 'component' ? 'components/' : ''), name + '.hbs');

  if (exists(templatePath, 'classic-' + options.type , options.verbose)) {
    return {
      prefix: false,
      type: options.type,
      mode: 'classic',
      path: templatePath
    };
  }

  return false;
}

function resolvePodComponent(name, options) {
  if (options.type !== 'component') {
    return false;
  }
  var templatePath = path.join(options.root, 'components', name, 'template.hbs');

  if (exists(templatePath, 'pod-component', options.verbose)) {
    return {
      prefix: false,
      type: options.type,
      mode: 'pod',
      path: templatePath
    };
  }

  return false;
}

function resolvePod(name, options) {
  var templatePath = path.join(options.root, name, 'template.hbs');

  if (exists(templatePath, 'pod', options.verbose)) {
    return {
      prefix: false,
      type: options.type,
      mode: 'pod',
      path: templatePath
    };
  }

  return false;
}

function resolvePodPrefix(name, options) {
  var templatePath = path.join(options.root, options.prefix, name, 'template.hbs');

  if (exists(templatePath, 'prefixed-pod', options.verbose)) {
    return {
      prefix: true,
      type: options.type,
      mode: 'pod',
      path: templatePath
    };
  }

  return false;
}

function resolvePodPrefixComponent(name, options) {
  if (options.type !== 'component') {
    return false;
  }

  if (!options.prefix) {
    return false;
  }

  var templatePath = path.join(options.root, options.prefix, 'components', name, 'template.hbs');

  if (exists(templatePath, 'prefixed-pod-component', options.verbose)) {
    return {
      prefix: true,
      type: options.type,
      mode: 'pod',
      path: templatePath
    };
  }

  return false;
}


function resolve(options) {
  var name = options.name;
  var matches = [];
  [resolveClassic, resolvePod, resolvePodComponent, resolvePodPrefix, resolvePodPrefixComponent].forEach(function(resolver) {
    var found = resolver(name, options);

    if (found) {
      matches.push(found);
    }
  });

  if (!matches.length) {
    console.log(chalk.red("No " + options.type + " template was found for " + name));
    if (!options.verbose) {
      console.log(chalk.yellow("Rerun the command using -v to see additional information about the lookup and which paths were tried."));
    }
    return false;
  }

  if (matches.length > 1) {
    console.log(chalk.red("Multiple " + options.type + " templates were found for " + name + ". Flexi cannot currently rename multiple layouts at once."));
    if (!options.verbose) {
      console.log(chalk.yellow("Rerun the command using -v to see additional information about the lookup and which paths matched."));
    }
    return false;
  }

  return matches[0];
}


function constructNewPath(info, options) {
  var pathInfo = {
    filePath: null,
    dirPath: null,
    base: null,
    rest: null,
    modulePath: null
  };
  var parsed = path.parse(info.path);
  pathInfo.base = parsed.dir;

  if (info.mode === 'classic') {
    pathInfo.rest = path.join(parsed.name, '-layouts');
  } else {
    pathInfo.rest = '-layouts';
  }

  pathInfo.dirPath = path.join(parsed.dir, pathInfo.rest);
  pathInfo.filePath = path.join(pathInfo.dirPath, options.breakpoint + '.hbs');

  pathInfo.modulePath = pathInfo.filePath.substr(options.root.length + 1);

  return pathInfo;
}


module.exports = function renameTemplate(options) {
  var templateInfo = resolve(options);

  if (templateInfo) {
    var newPath = constructNewPath(templateInfo, options);
    templateInfo.modulePath = templateInfo.path.substr(options.root.length + 1);

    mkDir(newPath.base, newPath.rest);
    fs.renameSync(templateInfo.path, newPath.filePath);

    console.log(
      "\n",
      chalk.cyan('Flexi ') + chalk.yellow('move:layout ') +
      chalk.grey('converted the ') + chalk.white(options.type) + chalk.grey('::') + chalk.white(options.name) +
      chalk.grey( ' template to the layout for ') + chalk.white(options.breakpoint) + chalk.grey('.'),
      "\n",
      chalk.grey("\t Old Location: ") + chalk.white(templateInfo.modulePath),
      "\n",
      chalk.grey("\t New Location: ") + chalk.white(newPath.modulePath),
      "\n"
    );

  }
};
