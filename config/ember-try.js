/*jshint node:true*/
/*
 1.12 and prior support may work, but is sadly untestable so long
 as liquid-fire is used for the docs. liquid-fire 0.19.x's
 template compiler cannot handle flexi.
 */
module.exports = {
  useVersionCompatibility: true,
  scenarios: [
    {
      name: 'ember-1.13.13',
      bower: {
        dependencies: {
          'ember': '~1.13.13'
        },
        resolutions: {
          'ember': '~1.13.13'
        }
      }
    },
    {
      name: 'ember-2.1.2',
      bower: {
        dependencies: {
          'ember': '~2.1.2'
        },
        resolutions: {
          'ember': '~2.1.2'
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      }
    },
    {
      name: 'ember-beta',
      "allowedToFail": true,
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      }
    },
    {
      name: 'ember-canary',
      "allowedToFail": true,
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      }
    }
  ]
};
