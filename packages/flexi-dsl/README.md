# Flexi-dsl

[![Greenkeeper badge](https://badges.greenkeeper.io/html-next/flexi-dsl.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/%40html-next%2Fflexi-dsl.svg)](https://badge.fury.io/js/%40html-next%2Fflexi-dsl)
[![Build Status](https://travis-ci.org/html-next/flexi-dsl.svg)](https://travis-ci.org/html-next/flexi-dsl)
[![Code Climate](https://codeclimate.com/github/html-next/flexi-dsl/badges/gpa.svg)](https://codeclimate.com/github/html-next/flexi-dsl)

Attribute and layout-component conversions for flexi elements.

Attributes: https://flexi.readme.io/docs/attributes

`<container>` and `<grid responsive>` layout components: https://flexi.readme.io/docs/elements

### Installation

It is recommended that you manage your flexi addons through [the main flexi addon](https://github.com/html-next/flexi):

```cli
ember install flexi
```

This will provide a prompt to install only the addons you want. Flexi will also maintain
compatibility between addons.

Alternatively install just this package:

```cli
ember instal @html-next/flexi-dsl
```

Note that no default styles will be included unless you also install [flexi-default-styles](https://github.com/html-next/flexi-default-styles).

## Support, Questions, Collaboration

Join the [Ember community on Discord](https://discord.gg/zT3asNS)

## Contributing

 - Open an Issue for discussion first if you're unsure a feature/fix is wanted.
 - Use descriptive branch names (e.g. `<type>/<short-description>`)
 - Use [Angular Style Commits](https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#commit)

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
