/* jshint node:true */
var Blueprint  = require('ember-cli/lib/models/blueprint');
var Promise    = require('ember-cli/lib/ext/promise'); // jshint ignore:line
var objectAssign = require('object-assign');

module.exports = function makeLayoutAware(base, typeName) {
  var layoutBlueprint = {

    // make the layout flag available
    availableOptions: [
      {
        name: 'layout',
        type: String,
        default: 'none',
        aliases: [
          {'l': ''}
        ]
      }
    ],

    install: function(options) {
      console.log('options', options);
      return Blueprint.prototype.install.call(this, options);
      return this._process('install', options);
    },

    uninstall: function(options) {
      console.log('options', options);
      return Blueprint.prototype.uninstall.call(this, options);
      return this._process('uninstall', options);
    },

    _processBlueprint: function(type, name, options) {
      var mainBlueprint = Blueprint.lookup(name, {
        ui: this.ui,
        analytics: this.analytics,
        project: this.project
      });

      return Promise.resolve()
        .then(function() {
          return mainBlueprint[type](options);
        })
        .then(function() {
          var testBlueprint = mainBlueprint.lookupBlueprint(name + '-test', {
            ui: this.ui,
            analytics: this.analytics,
            project: this.project,
            ignoreMissing: true
          });

          if (!testBlueprint) { return; }

          if (testBlueprint.locals === Blueprint.prototype.locals) {
            testBlueprint.locals = function(options) {
              return mainBlueprint.locals(options);
            };
          }

          return testBlueprint[type](options);
        });
    },

    _process: function(type, options) {
      return this._processBlueprint(type, typeName, options);
    }

  };
  return objectAssign({}, base, layoutBlueprint);
};

