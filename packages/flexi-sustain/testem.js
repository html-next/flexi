'use strict';

// eslint-disable-next-line no-console
console.log(
  `\n\nLaunching with ${process.env.TESTEM_CI_LAUNCHER || 'Chrome'}\n\n`
);

module.exports = {
  test_page: 'tests/index.html?hidepassed&nocontainer',
  disable_watching: true,
  launch_in_ci: [process.env.TESTEM_CI_LAUNCHER || 'Chrome'],
  launch_in_dev: ['Chrome'],
  browser_start_timeout: 120,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
    Firefox: {
      ci: ['-headless', '-width 1440', '-height 900'],
    },
  },
};
