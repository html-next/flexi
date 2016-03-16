import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sustain labels');

test('Testing that multiple instances of a component can be sustained when labels are used.', function(assert) {
  visit('/tests/sustain-labels');

  andThen(function() {
    assert.equal(currentURL(), '/tests/sustain-labels');

    let text = find('h1').eq(0).text();
    let text1 = find('h1').eq(1).text();
    let text2 = find('h1').eq(2).text();

    assert.equal(text, 'Rendered!', 'We rendered without a label');
    assert.equal(text1, 'Rendered!', 'We rendered again with a label');
    assert.equal(text2, 'Rendered!', 'We rendered again with a new label');
  });

});


test('Testing that a labeled component is recycled.', function(assert) {
  visit('/tests/sustain-labels-2');

  andThen(function() {
    assert.equal(currentURL(), '/tests/sustain-labels-2');

    let text1 = find('.label-test-condition').eq(0).find('h1').text();
    let text2 = find('.label-test-condition').eq(1).find('h1').text();
    let text3 = find('.label-test-condition').eq(2).find('h1').text();
    let text4 = find('.label-test-condition').eq(3).find('h1').text();

    assert.equal(text1, '', 'We rendered nothing to the first marker (no label)');
    assert.equal(text2, '', 'We rendered nothing to the second marker (which had a label)');
    assert.equal(text3, 'Rendered!', 'We rendered to the third marker (no label)');
    assert.equal(text4, 'Rendered!', 'We rendered to the fourth marker (which had a label)');
  });

});
