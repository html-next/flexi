# Flexi

[![Greenkeeper badge](https://badges.greenkeeper.io/html-next/flexi-layouts.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/%40html-next%2Fflexi-layouts.svg)](https://badge.fury.io/js/%40html-next%2Fflexi-layouts)
[![Ember Observer Score](http://emberobserver.com/badges/flexi.svg)](http://emberobserver.com/addons/flexi)
[![Build Status](https://travis-ci.org/html-next/flexi-layouts.svg)](https://travis-ci.org/html-next/flexi-layouts)
[![Code Climate](https://codeclimate.com/github/html-next/flexi-layouts/badges/gpa.svg)](https://codeclimate.com/github/html-next/flexi-layouts)

Flexi-layouts is the layouts portion of flexi.

It includes the following concepts:
* [Viewport Specific Templates](https://flexi.readme.io/docs/viewport-specific-templates)
* [Blueprints](https://flexi.readme.io/docs/blueprints) for generating viewport specific templates or moving existing templates into a layouts structure.
* [Layout Service](https://flexi.readme.io/docs/layout-service) for checking `isMobile`, `isDesktop` and other various things

### Installation

It is recommended that you manage your flexi addons through [the main flexi addon](https://github.com/html-next/flexi):

```cli
ember install flexi
```

This will provide a prompt to install only the addons you want. Flexi will also maintain
compatibility between addons.

Alternatively install just this package:

```cli
ember instal @html-next/flexi-layouts
```

That's all that required if you're using the classic component layout. If you are using a _pod_-based structure you will also need to install the shim for `ember-app`. This is done by modifiying your  `ember-cli-build.js` file. This shim makes ember-cli's template tree able to find
the templates for layouts.

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

shim(EmberApp);
```


## Support, Questions, Collaboration

Join the [Ember community on Discord](https://discord.gg/zT3asNS)

## Contributing

 - Open an Issue for discussion first if you're unsure a feature/fix is wanted.
 - Branch off of `develop` (default branch)
 - Use descriptive branch names (e.g. `<type>/<short-description>`)
 - Use [Angular Style Commits](https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#commit)
 - PR against `develop` (default branch).

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
