/*jshint node:true*/
module.exports = {
  description: 'Choose which addons to install',

  normalizeEntityName: function() {
  },

  afterInstall: function(options) {
    return this._chooseAddonsToInstall()
      .then((addons) => {
        return this.addAddonsToProject({
          packages: addons
        });
      });
  },
  /**
   * Uses inquirer to prompt the user to select which addons to install
   * @returns {Promise} Resolves into array of selected addons
   * @private
   */
  _chooseAddonsToInstall: function() {
    // Ask which ember addons to install
    return this.ui.prompt({
      type: 'checkbox',
      name: 'addonsToInstall',
      message: 'Which addons would you like to install?',
      choices: [
        {
          checked: true,
          name: 'flexi-default-styles',
          value: { name: 'flexi-default-styles' }
        },
        {
          checked: true,
          name: 'flexi-dsl',
          value: { name: 'flexi-dsl' }
        },
        {
          checked: true,
          name: 'flexi-layouts',
          value: { name: 'flexi-layouts' }
        },
        {
          checked: false,
          name: 'flexi-sustain',
          value: { name: 'flexi-sustain' }
        },
      ]
    })
      .then((selected) => {
        return selected.addonsToInstall;
      });
  }
};
