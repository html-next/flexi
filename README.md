# Flexi

## components

```
<centered>
<container>
```

## elements
```
<page>
<screen>
<box>
<hbox>
<vbox>
<grid>
```

## attributes
```
centered="start|end|center|between|around"
align="start|end|stretch|center|baseline"
fit
```

## grid

12 columns
container based breakpoints for
  phone, tablet, desktop, huge
which fall back to viewport based breakpoints

## services

- device
- orientation
- layout
- structures

## blog post

http://blog.isleofcode.com/p/2a16f7dd-52ab-4daa-b15d-0531fd432ede/

## Structures

```
{{structure 'foo' model}}
```

## Resolver
```
app/routes/foo/
             layouts/
                 default.hbs
                 desktop.hbs
                 tablet.hbs
                 mobile.hbs
             structures/
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

## example layouts

**tablet.hbs**
```<screen>
  <page>
    <vbox class="col-md-4">
        {{structure 'bar'}}
    </vbox>
    <vbox class="col-md-8">
        {{structure 'baz'}}
    </vbox>
  </page>
</screen>
```

**phone.hbs**
```<screen>
  <page>
    {{structure 'bar'}}
  </page>
</screen>
```

**tablet.hbs**
```<screen>
  <page>
    <vbox class="col-md-3">
        {{structure 'bar'}}
    </vbox>
    <vbox class="col-md-5">
        {{structure 'baz'}}
    </vbox>
    <vbox class="col-md-5">
        {{structure 'spam'}}
    </vbox>
  </page>
</screen>
```

## Cross Route Example

**emails/structures/index.hbs**
```<ul>
{{#each model.email as |email|}}
  <li>{{#link-to 'emails.single' email}}{{email.title}}{{/link-to}}</li>
{{/each}}
</ul>
```

**emails/layouts/phone.hbs**
```{{#liquid-outlet}}
```

**emails/layouts/tablet.hbs**
```<screen>
  <page>
    <vbox class="col-md-4">
        {{structure 'index'}}
    </vbox>
    <vbox class="col-md-8">
        {{#liquid-outlet}}
    </vbox>
  </page>
</screen>
```

**emails/index/layouts/phone.hbs**
```<screen>
  <page>
    {{structure 'emails/index'}}
  </page>
</screen>
```

**emails/index/layouts/tablet.hbs**
```
<h1>Select from sidebar</h1>
```
**emails/index/route.js**
```export default Route.extend({
  model() {
    return this.modelFor('emails');
  }
});
```
