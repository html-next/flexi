# Flexi

### Layout Components

```hbs
<centered></centered>
<container></container>
<grid></grid>
```

### Layout Elements

```hbs
<page></page>
<screen></screen>
<box></box>
<hbox></hbox>
<vbox></vbox>
<grid></grid>
```

### Layout Attributes

```hbs
<box centered="start|end|center|between|around">

<box align="start|end|stretch|center|baseline">

<box fit>
```


### Mobile First Grid

12 columns with container based breakpoints which fall back to viewport based breakpoints.
Wrap your grid usage with `grid`.  If you add the `responsive` attribute to `grid` it will
be converted to a `component` allowing for container based breakpoints.

```hbs
<grid responsive>
  <box xs="6" sm="4" md="3" lg="2">
</grid>
```

The attribute syntax here is a shorthand for
```hbs
<box class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
```

### Container

Container is a component which set's its class depending on it's current width to be one of

- `.breakpoint-xs`
- `.breakpoint-sm`
- `.breakpoint-md`
- `.breakpoint-lg`

```hbs
<container></container>
```


### Services

- device
- orientation
- layout
- structures


### Blog Post

http://blog.isleofcode.com/p/2a16f7dd-52ab-4daa-b15d-0531fd432ede/


### Sustain

Sustain generates a medium-life singleton component which wraps a feature group,
and providing it stability by seamlessly swapping it's location as layouts change
from one position to the next.


```hbs
{{sustain <path-to-sustain> model}}
```

A sustain wraps use of a component or groups of components (think of it as a feature
or feature set).  Sustains are technically components (and you can create them with a `component.js`)
but it is recommended to use them as simple templates expecting to be supplied a `model`.

```
app/<pod-prefix>/foo/sustains/
                 bar.hbs
                 baz.hbs
                 spam.hbs
```


### Resolver

In your `app.js` you will need to import the custom resolver. The custom resolver
extends the default ember resolver to account for sustains.

```js
import Resolver from 'flexi';
```

```
app/routes/foo/
             layouts/
                 default.hbs
                 desktop.hbs
                 tablet.hbs
                 mobile.hbs
             sustains/
                 bar.hbs
                 baz.hbs
                 spam.hbs
             components/
                 ham/
                     component.js
                     template.hbs
                 eggs/
                     component.js
                     template.hbs
```



## Example Layouts

**tablet.hbs**
```hbs
<screen>
  <page>
    <vbox md="4">
        {{sustain 'bar' model.foo}}
    </vbox>
    <vbox md="8">
        {{sustain 'baz' model.baz}}
    </vbox>
  </page>
</screen>
```

**phone.hbs**

```hbs
<screen>
  <page>
    {{sustain 'bar' model.foo}}
  </page>
</screen>
```

**tablet.hbs**

```hbs
<screen>
  <page>
    <vbox class="col-md-3">
        {{sustain 'bar' model.foo}}
    </vbox>
    <vbox class="col-md-5">
        {{sustain 'baz' model.baz}}
    </vbox>
    <vbox class="col-md-5">
        {{sustain 'spam' model.biz}}
    </vbox>
  </page>
</screen>
```

## Cross Route Example

**emails/structures/index.hbs**

```hbs
<ul>
{{#each model.email as |email|}}
  <li>{{#link-to 'emails.single' email}}{{email.title}}{{/link-to}}</li>
{{/each}}
</ul>
```

**emails/layouts/phone.hbs**

```hbs
{{#liquid-outlet}}
```

**emails/layouts/tablet.hbs**

```hbs
<screen>
  <page>
    <vbox class="col-md-4">
        {{sustain 'emails/index' model}}
    </vbox>
    <vbox class="col-md-8">
        {{#liquid-outlet}}
    </vbox>
  </page>
</screen>
```

**emails/index/layouts/phone.hbs**

```hbs
<screen>
  <page>
    {{sustain 'emails/index' model}}
  </page>
</screen>
```

**emails/index/layouts/tablet.hbs**

```hbs
<h1>Select from sidebar</h1>
```

**emails/index/route.js**

```hbs
export default Route.extend({
  model() {
    return this.modelFor('emails');
  }
});
```
