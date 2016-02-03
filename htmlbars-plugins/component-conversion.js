/* jshint node:true */
/**
 An HTMLBars AST transformation that converts instances of
 layout elements to their corresponding layout-component
 */
// these elements are always converted to components
var LayoutComponents = ['centered', 'container'];

// The actual components will always have this prefix
var ComponentPrefix = 'flexi-';

function ComponentConversionSupport() {
  this.syntax = null;
}

/*
 function buildBlock(path, params, hash, program, inverse, loc) {
 return {
 type: "BlockStatement",
 path: buildPath(path),
 params: params || [],
 hash: hash || buildHash([]),
 program: program || null,
 inverse: inverse || null,
 loc: buildLoc(loc)
 };
 }
 */

ComponentConversionSupport.prototype.transform = function ComponentConversionSupport_transform(ast) {
  var b = this.syntax.builders;
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();

  walker.visit(ast, function(element) {
    if (['BlockStatement'].indexOf(element.type) !==  -1) {
      console.log('\n\n\n\nOriginal Block\n');
      console.log(element.hash);
      console.log('\n\n\n\nOriginal Block\n');
      console.log(element.hash.pairs);
      console.log('\n\n\n\nOriginal Block\n');
      console.log(element.hash.pairs[0]);
    }
    if (pluginContext.validate(element)) {
      var program = b.program(element.children);
      var tag = ComponentPrefix + element.tag;
      var component = b.block(tag, null, makeHash(element.attributes), program, null, element.loc);
      console.log(component);
      replaceReference(element, component);
    }
  });

  return ast;
};

function replaceReference(a, b) {
  Object.keys(a).forEach(function(key) {
    delete a[key];
  });
  Object.keys(b).forEach(function(key) {
    a[key] = b[key];
  });
}
// [ { type: 'AttrNode', name: 'class', value: [Object] } ]
/*
 [ { loc: SourceLocation { source: undefined, start: [Object], end: [Object] },
 type: 'HashPair',
 key: 'class',
 value:
 { loc: [Object],
 type: 'StringLiteral',
 value: 'foo',
 original: 'foo' } } ]
 */
function makeHash(attrs) {
  if (!attrs || !attrs.length) {
    return {};
  }

  attrs.forEach(function(attr) {
    attr.type = 'HashPair';
    attr.value.type = 'StringLiteral';
  });

  console.log(attrs);

  return {
    pairs: attrs
  };
}

ComponentConversionSupport.prototype.validate = function ComponentConversionSupport_validate(node) {
  var isElement = node.type === 'ElementNode';
  // is dashless component
  return isElement && LayoutComponents.indexOf(node.tag) !== -1;
};

module.exports = ComponentConversionSupport;
