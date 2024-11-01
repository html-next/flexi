'use strict';

const CHALK = require('chalk');
const SEMVER = require('semver');

module.exports = {
  name: require('./package').name,

  included(app, parentAddon) {
    const ret = this._super.included.call(this, app, parentAddon);

    this._checkDependencyCompatibility(this.project);

    return ret;
  },

  _checkDependencyCompatibility(project) {
    const packageVersionByName = {};

    for (const addon of project.addons) {
      packageVersionByName[addon.pkg.name] = addon.pkg.version;
    }

    const flexiConfigVersion = packageVersionByName['@html-next/flexi-config'];
    const flexiDefaultStylesVersion = packageVersionByName['@html-next/flexi-default-styles'];
    const flexiDslVersion = packageVersionByName['@html-next/flexi-dsl'];
    const flexiLayoutsVersion = packageVersionByName['@html-next/flexi-layouts'];

    if (flexiConfigVersion && SEMVER.lt(flexiConfigVersion, '2.0.0-rc.1')) {
      this._warnUser('flexi-config < v2.0.0-rc.1; consider upgrading to at least v2.0.0-rc.1');
    }
    if (flexiDefaultStylesVersion && SEMVER.lt(flexiDefaultStylesVersion, '2.0.0-rc.2')) {
      this._warnUser('flexi-default-styles < v2.0.0-rc.2;' + ' consider upgrading to at least v2.0.0-rc.2');
    }
    if (flexiDslVersion && SEMVER.lt(flexiDslVersion, '2.0.0-rc.2')) {
      this._warnUser('flexi-dsl < v2.0.0-rc.2; consider upgrading to at least v2.0.0-rc.2');
    }
    if (flexiLayoutsVersion && SEMVER.lt(flexiLayoutsVersion, '2.0.0-rc.2')) {
      this._warnUser('flexi-layouts < v2.0.0-rc.2; consider upgrading to at least v2.0.0-rc.2');
    }
  },

  _warnUser(string) {
    this.ui.writeLine(CHALK.yellow(`WARNING: ${string}`));
  },
};
