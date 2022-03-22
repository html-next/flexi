# Flexi

[![npm version](https://badge.fury.io/js/flexi.svg)](http://badge.fury.io/js/flexi)
[![Ember Observer Score](http://emberobserver.com/badges/flexi.svg)](http://emberobserver.com/addons/flexi)
[![Code Climate](https://codeclimate.com/github/html-next/flexi/badges/gpa.svg)](https://codeclimate.com/github/html-next/flexi)

Flexi is a responsive-design layout framework like Bootstrap and Foundation. Flexi is focused on performance and maintainability, utilizing Ember for greater configuration and convenience than Bootstrap or Foundation can offer.

Flexi does most of it's heavy lifting at `build` time, happily adding very little runtime code and CSS to your project.

## Learn More

- Demo: [https://html-next.github.io/flexi/](https://html-next.github.io/flexi/)
- Documentation: [https://flexi.readme.io/docs](https://flexi.readme.io/docs)
- Blog Post: [Modern Responsive Design illustrated with Ember & Flexi](https://runspired.com/2016/03/18/a-tale-of-two-states/)
- Talk: [Responsive and Cross Platform Design](https://www.youtube.com/watch?v=2w77wrinwsY&list=PLaKDKbFmAv-aLYGogQ63zzKeUpy_opDia&index=1)


## Installation

```cli
ember install flexi
```

That's all that required if you're using the classic component layout. If you are using a _pod_-based structure you will also need to install the shim for `ember-app`. This is done by modifiying your  `ember-cli-build.js` file. This shim makes ember-cli's template tree able to find the templates for layouts.

```js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

shim(EmberApp);
```

## Support, Questions, Collaboration

Join the [Ember community on Discord](https://discord.gg/zT3asNS)

## Release Notes

[Changelog](./CHANGELOG.md)

## Contributing

 - Open an Issue for discussion first if you're unsure a feature/fix is wanted.
 - Branch off of `main` (default branch)
 - Use descriptive branch names (e.g. `<type>/<short-description>`)
 - PR against `main` (default branch).

## Thanks

A special thanks goes out to [@ebryn](https://github.com/ebryn) for the
inspiration to pursue a solution for explicit layouts, and [IsleofCode](https://isleofcode.com)
for providing the time to build the original implementation.
