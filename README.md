# Flexi

[![npm version](https://badge.fury.io/js/flexi.svg)](http://badge.fury.io/js/flexi)
[![Ember Observer Score](http://emberobserver.com/badges/flexi.svg)](http://emberobserver.com/addons/flexi)
[![Build Status](https://travis-ci.org/runspired/flexi.svg)](https://travis-ci.org/runspired/flexi)
[![Code Climate](https://codeclimate.com/github/runspired/flexi/badges/gpa.svg)](https://codeclimate.com/github/runspired/flexi)

Flexi is a lightweight, mobile first, performance focused layout framework for Ember.  Flexi makes
building layouts that are fluid, responsive, and platform aware fun, easy and fast.

Flexi does most of it's heavy lifting at `build` time, happily adding very little
runtime code and CSS to your project.

## Learn More

- Documentation: [https://runspired.github.io/flexi/#/docs](https://runspired.github.io/flexi/#/docs)
- Blog Post: [A Tale of Two States: Modern Responsive Design illustrated with Ember & Flexi](http://blog.isleofcode.com/modern-responsive-design/)
- Talk: [Responsive and Cross Platform Design](https://www.youtube.com/watch?v=2w77wrinwsY&list=PLaKDKbFmAv-aLYGogQ63zzKeUpy_opDia&index=1)

## Installation

```cli
ember install flexi
```

Once you have installed `flexi`, you will also need to install the shim for `ember-app`.
in your `ember-cli-build.js` file. This shim makes ember-cli's template tree able to find
the templates for layouts.

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var shim = require('flexi/lib/pod-templates-shim');

shim(EmberApp);
```


## Support, Questions, Collaboration

Join the [flexi](https://embercommunity.slack.com/messages/flexi/) channel on Slack.

[![Slack Status](https://ember-community-slackin.herokuapp.com/badge.svg)](https://ember-community-slackin.herokuapp.com/)


### Layouts

With flexi, you can separate your markup into layouts, one for each breakpoint name
defined in `config/flexi.js`.

Given the following breakpoint names: `mobile`, `tablet`, `desktop`.

**Example:**
```cli
ember g layout index/<size>
```

This will add the `index/-layouts/<size>.hbs` file to your application.

Layouts are compiled into a single `template.hbs` for the route or component
which will activate the correct layout based on booleans provided by the
`device/layout` service.

Layout booleans are available for use in any layout template.
For instance, for the `mobile` breakpoint, you can include a conditional block
with so:

```
{{#if FlexiLayout.isMobile}}

{{/if}}
```

This is useful if you only need one or two layouts, but still need to make some
smaller modifications for other breakpoints.

**Example File Structure:**

This is an example route structure using `routes` as the `podModulePrefix` and `layouts`

```cli
app/
  routes/
    foo/
      -layouts/
        mobile.hbs
        desktop.hbs
      components/
        foo-bar/
          component.js
          template.hbs
```

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

### Layout Attributes

Layout attributes are converted to classes at build time, giving you the
convenience of a nice attribute syntax and the performance of class based
selectors.

```hbs
<box
  justify="start|end|center|between|around"
  align="start|end|stretch|center|baseline"
  fit
  fill
  vertical
  horizontal
  wrap
  nowrap>
```

[Read More](https://runspired.github.io/flexi/#/docs/layout-attributes)


## @container breakpoints

Flexi uses a service with an optimized window resize handler and an optimized width calculator
to efficiently add `.container-<breakpoint-prefix>` classes to `<container>` and `<grid responsive>`
components.  This results in the defined breakpoints using the width of the container instead of
the width of the viewport.

**Without rows**
```hbs
<grid responsive>
  <box xs="6" sm="4" md="3" lg="2">
</grid>
```

**With rows**
```hbs
<container>
  <vbox>  <!-- grid container -->
    <hbox>  <!-- row container -->
      <box xs="6" sm="4" md="3" lg="2"> <!-- row item -->
    </hbox>
  </vbox>
</container>
```

[Read More](https://runspired.github.io/flexi/#/docs/grids)

### Container

Container is an Ember component which sets it's class depending on it's current width and your defined
breakpoint prefixes.  There are two forms of containers, `<container>` and `<grid responsive>`.

The container class will be of the form:

```hbs
.container-<prefix>
```

You can make any component a container by extending it with the flexi container mixin.

```js
import Ember from 'ember';
import ContainerMixin from 'flexi/mixins/container';

export default Ember.Component.extend(ContainerMixin, {});
```


### Layout Elements

Layout elements give you a declarative syntax for quickly composing
common layout situations.

```hbs
<centered></centered>
<page></page>
<screen></screen>
<fill></fill>
<box></box>
<hbox></hbox>
<vbox></vbox>
<grid></grid>
```

[Read More](https://runspired.github.io/flexi/#/docs/layout-elements)

### Layout Components

Layout components allow you to use container based breakpoints
instead of @media queries.

```hbs
<container></container>
<grid responsive></grid>
```

[Read More](https://runspired.github.io/flexi/#/docs/layout-components)


### Mobile First Grid

With flexi, you can build grids with or without rows. Rows are convenient
for item height resets with flexbox. Columns respond to @media breakpoints,
but they can also respond to the container they are in.

You can choose which css, columns, column classes, gutters, and breakpoints
to include. It's [fully configurable](#config)

**Without rows**
```hbs
<grid>
  <box xs="6" sm="4" md="3" lg="2">
</grid>
```

**With rows**
```hbs
<vbox>  <!-- grid container -->
  <hbox>  <!-- row container -->
    <box xs="6" sm="4" md="3" lg="2"> <!-- row item -->
  </hbox>
</vbox>
```

**Without Columns**
```hbs
<vbox>  <!-- grid container -->
  <hbox>  <!-- row container -->
    <box fit> <!-- sizes to it's content -->
    <box fit>
    <box fit>
    <box> <!-- grows to fill the remaining space -->
  </hbox>
</vbox>
```


### Services

Flexi adds a layout service to your app.

**app/services/device/layout**

This service contains your breakpoints, as well as booleans which
indicate when a given breakpoint is active.

This service also contains two booleans that can be used for orientation
needs. `orientationIsLandscape` and `orientationIsPortrait`.


## Example Layout

Here's an example of the common "email client" layout implemented with flexi,
it shows how this pattern makes it easy to build layouts that are responsive not only
within a single route, but across routes.

[See Demo](https://runspired.github.io/flexi/#/guides)

**router.js**
```js
this.route('emails', function() {
  this.route('index', { path: '/' });
  this.route('single', { path: '/:id' });
})
```

**emails/route.js**

```js
export default Route.extend({
  model() {
    return RSVP.hash({
      emails: this.get('store').findAll('email')
    });
  }
});
```


**emails/index/route.js**
```js
export default Route.extend({
  model() {
    return this.modelFor('emails');
  }
});
```

**emails/components/email-list.hbs**

```hbs
<ul>
{{#each model.emails as |email|}}
  <li>{{#link-to 'emails.single' email}}{{email.title}}{{/link-to}}</li>
{{/each}}
</ul>
```

**emails/index/-layouts/phone.hbs**

```hbs
<screen>
  <page>
    {{sustain 'emails/components/email-list' model}}
  </page>
</screen>
```

**emails/index/-layouts/tablet.hbs**

```hbs
<centered>
  <h2>Select an email on the left to get started</h2>
</centered>
```

**emails/-layouts/phone.hbs**
```hbs
{{liquid-outlet "main"}}
```

**emails/-layouts/tablet.hbs**
```hbs
<screen>
  <page>
    <hbox>
      <vbox md="4">{{sustain 'emails/components/email-list' model}}</vbox>
    </hbox>
    <vbox md="8">
        {{liquid-outlet "main"}}
    </vbox>
  </page>
</screen>
```


### Config

The default blueprint will install `config/flexi.js` with the [default settings](./blueprints/flexi/files/config/flexi.js).

**Settings**

```js
{
  // the number of columns for the grid
  columns: 12,

  // optional, used for column classes: `${colPrefix}-${breakpointPrefix}-${columnNumber}`
  columnPrefix: 'col',

  // if false, @media css is not included
  includeMediaCSS: true,

  // if false, default element styles are not included
  includeElementCSS: true,

  // if true, will convert layout attributes on non-layout elements to classes as well
  transformAllElementLayoutAttributes: false,

  // grid and layout element gutters
  gutterPadding: '.5rem',

  // if false, no styles are included (trumps `includeMediaCSS` and `includeElementCSS`)
  includeCSS: true,

  // an array of breakpoints to use in your app (see below)
  breakpoints: []
}
```

**config.breakpoints**

Your config must have a `breakpoints` array.  A breakpoint has the structure:

```js
  { name: 'mobile', prefix: 'xs', begin: 0 }
```

`name` will be used for blueprint generation of layout names, and is made available as an `is<Name>`
boolean on the `device/layout` service.

`prefix` is a shorthand for the breakpoint name used for column attributes, classes, and responsive utilities.
With a `prefix` of `xs`.

`begin` is the pixel value at which the breakpoint becomes valid if equal to or larger than.

**Using a breakpoint's prefix**

`.col-xs-1` ... `.col-xs-n` will be valid class names (if `columnPrefix` is set to `col`).
```html
<box xs="n visible vertical">
```

Is valid shorthand for
```html
<box class="col-xs-n visible-xs vertical-xs">
```

The following responsive utilities are made available for each prefix:

```css
.hidden-xs,
.visible-xs,
.container-xs,
.vertical-xs,
.horizontal-xs,
.wrap-xs,
.nowrap-xs {}
```

[Read More](https://runspired.github.io/flexi/#/docs/settings)


## Status

[Changelog](./CHANGELOG.md)

[![Build Status](https://travis-ci.org/runspired/flexi.svg)](https://travis-ci.org/runspired/flexi)
[![Code Climate](https://codeclimate.com/github/runspired/flexi/badges/gpa.svg)](https://codeclimate.com/github/runspired/flexi)
[![Test Coverage](https://codeclimate.com/github/runspired/flexi/badges/coverage.svg)](https://codeclimate.com/github/runspired/flexi/coverage)
[![dependencies](https://david-dm.org/runspired/flexi.svg)](https://david-dm.org/runspired/flexi)
[![devDependency Status](https://david-dm.org/runspired/flexi/dev-status.svg)](https://david-dm.org/runspired/flexi#info=devDependencies)


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
