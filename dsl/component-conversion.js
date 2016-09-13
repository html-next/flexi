/* jshint node:true */
/**
 An HTMLBars AST transformation that converts instances of
 layout elements to their corresponding layout-component
 */
var getAttribute = require("./helpers/get-attribute");
var debug = require('debug')('flexi:component-conversion');

// these elements are always converted to components
var LayoutComponents = ["container"];

// The actual components will always have this prefix
var ComponentPrefix = "flexi-";

function isResponsiveGrid(node) {
  if (node.tag === "grid") {
    return !!getAttribute(node, "responsive");
  }
  return false;
}

function replaceReference(a, b) {
  Object.keys(a).forEach(function (key) {
    delete a[key];
  });
  Object.keys(b).forEach(function (key) {
    a[key] = b[key];
  });
}

function adjustLocation(tag, loc) {
  loc.end.column += 7;

  return loc;
}

function makeHash(attrs, loc) {
  if (!attrs || !attrs.length) {
    return null;
  }

  var declareLine = loc.start.line;

  attrs.forEach(function (attr) {
    attr.type = "HashPair";
    attr.value.type = "StringLiteral";

    if (attr.value.loc.start.line === declareLine) {
      attr.value.loc.start.column += 7;
    }
    if (attr.value.loc.end.line === declareLine) {
      attr.value.loc.end.column += 7;
    }
  });

  return {
    pairs: attrs
  };
}

function ComponentConversionSupport() {
  this.syntax = null;
}

var proto = ComponentConversionSupport.prototype;

proto.transform = function ComponentConversionSupport_transform(ast) {
  var b = this.syntax.builders;
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();

  walker.visit(ast, function (element) {
    if (pluginContext.validate(element)) {
      var program = b.program(element.children);
      var tag = ComponentPrefix + element.tag;
      debug('upgrading element ' + element.tag + ' to component ' + tag);

      var component = b.block(tag, null, makeHash(element.loc, element.attributes), program, null, adjustLocation(tag, element.loc));

      replaceReference(element, component);
    }
  });

  return ast;
};

proto.validate = function ComponentConversionSupport_validate(node) {
  var isElement = node.type === "ElementNode";

  // is dashless component
  return isElement && (LayoutComponents.indexOf(node.tag) !== -1 || isResponsiveGrid(node));
};

module.exports = ComponentConversionSupport;
