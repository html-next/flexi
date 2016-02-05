/* jshint node:true */
/**
 An HTMLBars AST transformation that converts instances of
 layout elements to their corresponding layout-component
 */

// The actual components will always have this prefix
var ComponentPrefix = 'flexi-';

function FeatureConversionSupport() {
  this.syntax = null;
}

FeatureConversionSupport.prototype.transform = function FeatureConversionSupport_transform(ast) {
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();

  walker.visit(ast, function(component) {
    if (pluginContext.validate(component)) {
      var tag = ComponentPrefix + 'feature';
      component.path.original = tag;
      component.path.parts[0] = tag;
    }
  });

  return ast;
};


FeatureConversionSupport.prototype.validate = function FeatureConversionSupport_validate(node) {
  return node.type === 'MustacheStatement' && node.path.original === 'feature';
};

module.exports = FeatureConversionSupport;
