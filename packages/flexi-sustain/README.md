# Flexi

[![npm version](https://badge.fury.io/js/flexi-sustain.svg)](http://badge.fury.io/js/flexi-sustain)

## Release Notes

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
