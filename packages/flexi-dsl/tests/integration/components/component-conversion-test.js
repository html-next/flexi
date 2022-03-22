import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | component conversion', function(hooks) {
  setupRenderingTest(hooks);

  test('it converts the <container> component', async function(assert) {
    await render(hbs`<container class="low-class"></container>`);

    let container = find('container');

    // Basic sanity check to ensure the container was rendered
    assert.equal(container.tagName.toLowerCase(),
      'container',
      `We rendered the <container>: ${container.outerHTML}`);

    // Ensure the container was turned into a component
    assert.ok((typeof container.id === 'string'),
      `Container did not have a String 'id' property: ${container.outerHTML}`);

    assert.ok(container.className.indexOf('low-class') !== -1,
      `We rendered the container with the correct classes ${container.outerHTML}`);
  });

  test('it converts the <grid responsive> component', async function(assert) {
    await render(hbs`<grid responsive class="high-class"></grid>`);

    let grid = find('grid');

    // Basic sanity check to ensure the responsive grid was rendered
    assert.equal(grid.tagName.toLowerCase(),
      'grid',
      `We rendered the <grid responsive>: ${grid.outerHTML}`);

    // Ensure the responsive grid was turned into a component
    assert.ok((typeof grid.id === 'string'),
      `Responsive grid did not have a String 'id' property: ${grid.outerHTML}`);

    assert.ok(grid.className.indexOf('high-class') !== -1,
      `We rendered the grid with the correct classes ${grid.outerHTML}`);
  });

  test('it does not convert the <grid> element', async function(assert) {
    await render(hbs`<grid></grid>`);

    let grid = find('grid');

    // Basic sanity check to ensure the grid was rendered
    assert.equal(grid.tagName.toLowerCase(), 'grid');

    // Ensure the grid was NOT turned into a component.
    // Note that a component would gain an 'id' property
    assert.equal(grid.outerHTML,
      '<grid></grid>',
      `Grid was not rendered as an empty <grid></grid>, got: ${grid.outerHTML}`);
  });
});

