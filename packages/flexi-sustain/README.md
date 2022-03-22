# Flexi

[![npm version](https://badge.fury.io/js/flexi-sustain.svg)](http://badge.fury.io/js/flexi-sustain)
[![Ember Observer Score](http://emberobserver.com/badges/flexi-sustain.svg)](http://emberobserver.com/addons/flexi-sustain)
[![Build Status](https://travis-ci.org/html-next/flexi-sustain.svg)](https://travis-ci.org/html-next/flexi-sustain)
[![Code Climate](https://codeclimate.com/github/html-next/flexi-sustain/badges/gpa.svg)](https://codeclimate.com/github/html-next/flexi-sustain)
[![Test Coverage](https://codeclimate.com/github/html-next/flexi-sustain/badges/coverage.svg)](https://codeclimate.com/github/html-next/flexi-sustain/coverage)
[![dependencies](https://david-dm.org/html-next/flexi-sustain.svg)](https://david-dm.org/html-next/flexi-sustain)
[![devDependency Status](https://david-dm.org/html-next/flexi-sustain/dev-status.svg)](https://david-dm.org/html-next/flexi-sustain#info=devDependencies)

[Changelog](./CHANGELOG.md)

## Installation

```cli
ember install flexi-sustain
```


## Support, Questions, Collaboration

Join the [Ember community on Discord](https://discord.gg/zT3asNS)

### Sustain

`Sustain` allows you to recycle a component instance across layout and route boundaries.

A sustain is essentially a "marker" for where a particular component instance is able to
be reused. It allows you to explicitly declare what features of your app can be "recycled".

Sustain improves the performance of your app by reducing the amount of work your app needs to do.
 Instead of tearing down one instance and creating an entirely new instance, sustain seamlessly
 swaps a component instance's location as layouts and routes transition from one position to the next.


```hbs
{{sustain <path-to-sustain> model}}
```

Only one instance of the sustainable is alive and rendered at a time, but if you are animating
from one location to another you can choose to leave behind a copy.

```hbs
{{sustain <path-to-sustain> model copy=true}}
```

By default, a sustain is destroyed when it has gone unused for one minute. You can alter this
expiration. A value of `0` will cause the sustain to live forever.

```hbs
{{sustain <path-to-sustain> expires=<time-in-ms>}}
```

If you would like to use the same layout for multiple sustain instances, on the same page, you can specify
a `label`. This allows unique instances of the same layout, which update from route to route or layout to layout,
but do not overwrite previous sustains in the same template.

```hbs
{{sustain my-path label='foo'}}
{{sustain my-path label='bar'}}
```


## Contributing

 - Open an Issue for discussion first if you're unsure a feature/fix is wanted.
 - Branch off of `master` (default branch)
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
for providing the time to build it.
