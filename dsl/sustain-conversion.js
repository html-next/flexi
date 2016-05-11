/* jshint node:true */
/**
 An HTMLBars AST transformation that converts instances of
 layout elements to their corresponding layout-component
 */

// The actual components will always have this prefix
var ComponentPrefix = "flexi-";

function legacyPath(node) {
  return node.path || node.sexpr.path;
}

function SustainConversionSupport() {
  this.syntax = null;
}

SustainConversionSupport.prototype.transform = function SustainConversionSupport_transform(ast) {
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();

  walker.visit(ast, function (component) {
    if (pluginContext.validate(component)) {
      var tag = ComponentPrefix + "sustain";
      var pathTagIndex = 0;
      var path = legacyPath(component);

      path.original = tag;
      path.parts[pathTagIndex] = tag;
    }
  });

  return ast;
};


SustainConversionSupport.prototype.validate = function SustainConversionSupport_validate(node) {
  return node.type === "MustacheStatement" && legacyPath(node).original === "sustain";
};

module.exports = SustainConversionSupport;
