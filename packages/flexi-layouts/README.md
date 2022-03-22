# Flexi

[![npm version](https://badge.fury.io/js/%40html-next%2Fflexi-layouts.svg)](https://badge.fury.io/js/%40html-next%2Fflexi-layouts)

Flexi-layouts is the layouts portion of flexi.

It includes the following concepts:
* [Viewport Specific Templates](https://flexi.readme.io/docs/viewport-specific-templates)
* [Blueprints](https://flexi.readme.io/docs/blueprints) for generating viewport specific templates or moving existing templates into a layouts structure.
* [Layout Service](https://flexi.readme.io/docs/layout-service) for checking `isMobile`, `isDesktop` and other various things

### Installation

It is recommended that you manage your flexi addons through [the main flexi addon](https://github.com/html-next/flexi/tree/main/packages/flexi):

```cli
ember install flexi
```

This will provide a prompt to install only the addons you want. Flexi will also maintain
compatibility between addons.

Alternatively install just this package:

```cli
ember install @html-next/flexi-layouts
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
