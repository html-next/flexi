/*jshint node:true*/
module.exports = {
  useVersionCompatibility: true,
  scenarios: [
    {
      name: 'default',
      bower: {
        dependencies: { }
      }
    },
    /*
    1.12 support may work, but is sadly untestable so long
    as liquid-fire is used for the docs. liquid-fire 0.19.x's
    template compiler cannot handle flexi.
    {
      name: 'ember-1-12',
      bower: {
        dependencies: {
          'ember': '~1.12.2'
        },
        resolutions: {
          'ember': '~1.12.2'
        }
      },
      npm: {
        devDependencies: {
          'liquid-fire': 	'0.19'
        }
      }
    },
    */
    {
      name: 'ember-1-13',
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
      name: 'ember-2-1',
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
