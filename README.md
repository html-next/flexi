# Flexi

[![npm version](https://badge.fury.io/js/flexi.svg)](http://badge.fury.io/js/flexi)
[![Ember Observer Score](http://emberobserver.com/badges/flexi.svg)](http://emberobserver.com/addons/flexi)
[![Code Climate](https://codeclimate.com/github/html-next/flexi/badges/gpa.svg)](https://codeclimate.com/github/html-next/flexi)

Flexi is a responsive-design layout framework like Bootstrap and Foundation. Flexi is focused on performance and maintainability, utilizing Ember for greater configuration and convenience than Bootstrap or Foundation can offer.

Flexi does most of it's heavy lifting at `build` time, happily adding very little runtime code and CSS to your project.

## Learn More

- Demo: [https://html-next.github.io/flexi/](https://html-next.github.io/flexi/)
- Documentation: [https://flexi.readme.io/docs](https://flexi.readme.io/docs)
- Blog Post: [A Tale of Two States: Modern Responsive Design illustrated with Ember & Flexi](http://blog.isleofcode.com/modern-responsive-design/)
- Talk: [Responsive and Cross Platform Design](https://www.youtube.com/watch?v=2w77wrinwsY&list=PLaKDKbFmAv-aLYGogQ63zzKeUpy_opDia&index=1)


## Installation

```cli
ember install flexi
```

That's all that required if you're using the classic component layout. If you are using a _pod_-based structure you will also need to install the shim for `ember-app`. This is done by modifiying your  `ember-cli-build.js` file. This shim makes ember-cli's template tree able to find the templates for layouts.

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

shim(EmberApp);
```

## Support, Questions, Collaboration

Join the [Ember community on Discord](https://discord.gg/zT3asNS)

## Status

[Changelog](./CHANGELOG.md)

[![Build Status](https://travis-ci.org/html-next/flexi.svg)](https://travis-ci.org/html-next/flexi)
[![Code Climate](https://codeclimate.com/github/html-next/flexi/badges/gpa.svg)](https://codeclimate.com/github/html-next/flexi)
[![Test Coverage](https://codeclimate.com/github/html-next/flexi/badges/coverage.svg)](https://codeclimate.com/github/html-next/flexi/coverage)
[![dependencies](https://david-dm.org/html-next/flexi.svg)](https://david-dm.org/html-next/flexi)
[![devDependency Status](https://david-dm.org/html-next/flexi/dev-status.svg)](https://david-dm.org/html-next/flexi#info=devDependencies)

## Contributing

 - Open an Issue for discussion first if you're unsure a feature/fix is wanted.
 - Branch off of `master` (default branch)
 - Use descriptive branch names (e.g. `<type>/<short-description>`)
 - Use [Angular Style Commits](https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#commit)
 - PR against `master` (default branch).

### Commmits

Angular Style commit messages have the full form:

 ```cli
 <type>(<scope>): <title>

 <body>

 <footer>
 ```

 But the abbreviated form (below) is acceptable and often preferred.

 ```cli
 <type>(<scope>): <title>
 ```

 Examples:

 - chore(deps): bump deps in package.json and bower.json
 - docs(component): document the `fast-action` component

## Thanks

A special thanks goes out to [@ebryn](https://github.com/ebryn) for the
inspiration to pursue a solution for explicit layouts, and [IsleofCode](https://isleofcode.com)
for providing the time to built it.
