/* eslint-env node */
let inquirer = require('inquirer');

module.exports = {
  description: 'Choose which addons to install',

  normalizeEntityName() {
  },

  afterInstall(options) {
    return this._chooseAddonsToInstall()
      .then((addons) => {
        return this.addAddonsToProject({
          packages: addons,
          blueprintOptions: {
            save: options.save
          }
        });
      });
  },

  /**
   * Uses inquirer to prompt the user to select which addons to install
   * @returns {Promise} Resolves into array of selected addons
   * @private
   */
  _chooseAddonsToInstall() {
    // Ask which ember addons to install
    return this.ui.prompt({
      type: 'checkbox',
      name: 'addonsToInstall',
      message: 'Which addons would you like to install?',
      choices: [
        new inquirer.Separator('flexi-default-styles - Default flexi styles'),
        {
          checked: true,
          name: 'flexi-default-styles',
          value: { name: '@html-next/flexi-default-styles', target: '~2.0.0-rc.2' }
        },
        new inquirer.Separator('flexi-dsl - Converts attributes to classes'),
        {
          checked: true,
          name: 'flexi-dsl',
          value: { name: '@html-next/flexi-dsl', target: '~2.0.0-rc.2' }
        },
        new inquirer.Separator('flexi-layouts - Layout service and grids'),
        {
          checked: true,
          name: 'flexi-layouts',
          value: { name: '@html-next/flexi-layouts', target: '~2.0.0-rc.2' }
        },
        new inquirer.Separator('flexi-sustain - Recyclable components (Ember <= 2.9)'),
        {
          checked: false,
          message: '',
          name: 'flexi-sustain',
          value: { name: '@html-next/flexi-sustain', target: '~2.0.0-beta.12' }
        }
      ],
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one addon.';
        }
        return true;
      }
    }).then((selected) => {
      return selected.addonsToInstall;
    });
  }
};
