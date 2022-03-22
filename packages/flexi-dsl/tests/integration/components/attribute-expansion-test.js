import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | attribute expansion', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(
      hbs`<box align="center" vertical sm="12 visible horizontal wrap" md="align=end align-self=center" lg="align-content=between"></box>`
    );

    let box = find('box');

    assert.equal(
      box.tagName.toLowerCase(),
      'box',
      `We rendered the <box>: ${box.outerHTML}`);
    assert.equal(
      box.className,
      'align-content-between-lg align-end-md align-self-center-md col-sm-12 visible-sm horizontal-sm wrap-sm flexi-vertical align-center',
      `We rendered the right class names: ${box.outerHTML}`);

    await render(hbs`<hbox fit class="something"></hbox>`);

    let hbox = find('hbox');

    assert.equal(
      hbox.tagName.toLowerCase(),
      'hbox',
      `We rendered the <hbox>: ${hbox.outerHTML}`);
    assert.equal(
      hbox.className,
      'something flexi-fit',
      `We rendered the right class names and didn't clobber existing classes: ${hbox.outerHTML}`);
  });
});
