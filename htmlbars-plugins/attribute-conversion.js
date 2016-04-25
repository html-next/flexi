/* jshint node:true */
/**
 An HTMLBars AST transformation that converts instances of
 layout elements to their corresponding layout-component
 */
var LayoutElements = [
  "box",
  "centered",
  "container",
  "fill",
  "grid",
  "grid",
  "hbox",
  "page",
  "screen",
  "vbox"
];
var JustifyValues = ["start", "end", "center", "between", "around"];
var AlignValues = ["start", "end", "stretch", "center", "baseline"];
var LayoutAttributes = ["wrap", "nowrap", "fit", "fill", "horizontal", "vertical"];
var prefixValues = ["hidden", "visible"].concat(LayoutAttributes);
var removeAttribute = require("./helpers/remove-attribute");
var getAttribute = require("./helpers/get-attribute");
var MIN_COLUMN_COUNT = 1;
var chalk = require('chalk');
var debug = require('debug')('flexi');

function convertPropToClass(node, propName, values, classNames) {
  var prop = getAttribute(node, propName);
  var value;

  if (prop) {
    value = prop.value.chars;
    if (values.indexOf(value) !== -1) {
      debug(chalk.grey("\t\tPushing class: ") + chalk.white(propName + "-" + value));

      classNames.push(propName + "-" + value);
      removeAttribute(node, prop);
    } else {
      throw new Error("Flexi#attribute-conversion:: '" + value +
        "' is not a valid value for " + propName + ".");
    }
  }
}

function AttributeConversionSupport() {
  this.syntax = null;
}

var proto = AttributeConversionSupport.prototype;

proto.transform = function AttributeConversionSupport_transform(ast) {
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();

  walker.visit(ast, function (node) {
    if (pluginContext.validate(node)) {
      debug(chalk.cyan("\tConverting Attributes for node: ") + chalk.yellow(node.tag));

      var classNames = [];
      var classAttr = getAttribute(node, "class");

      if (classAttr && classAttr.value.chars) {
        debug(chalk.grey("\t\tPushing Original Class String: ") + chalk.white(classAttr.value.chars));

        classNames.push(classAttr.value.chars);
      }

      convertPropToClass(node, "justify", JustifyValues, classNames);
      convertPropToClass(node, "align", AlignValues, classNames);

      LayoutAttributes.forEach(function (attr) {
        var prop = getAttribute(node, attr);

        if (prop) {
          debug(chalk.grey("\t\tPushing Property Class: ") + chalk.white("flexi-" + attr));

          classNames.push("flexi-" + attr);
          removeAttribute(node, prop);
        }
      });

      pluginContext.LayoutSizes.forEach(function (size) {
        var prop = getAttribute(node, size);

        if (prop) {
          var value = prop.value.chars.split(" ");

          value.forEach(function(v) {
            if (prefixValues.indexOf(v) !== -1) {
              debug(chalk.grey("\t\tPushing Responsive Class: ") + chalk.white(v + "-" + size));

              classNames.push(v + "-" + size);
            } else {
              var int = parseInt(value, 10);

              if (int >= MIN_COLUMN_COUNT && int <= pluginContext.columns) {
                debug(chalk.grey("\t\tPushing Grid Class: ") + chalk.white("col-" + size + "-" + int));

                classNames.push(
                  (pluginContext.gridColumnPrefix ? pluginContext.gridColumnPrefix + "-" : "") +
                  size + "-" + int
                );
              } else {
                throw new Error("Flexi#attribute-conversion:: '" + int +
                  "' is not a valid value for " + size + ".");
              }
            }
          });

          removeAttribute(node, prop);
        }
      });

      if (!classAttr) {
        if (!classNames.length) {
          return;
        }
        classAttr = {
          type: "AttrNode",
          name: "class",
          value: { type: "TextNode", chars: "" }
        };
        node.attributes.push(classAttr);
      }
      debug(chalk.magenta("\t\tFinal Class: ") + chalk.white(classNames.join(" ")));

      classAttr.value.chars = classNames.join(" ");
    }
  });

  return ast;
};

proto.validate = function AttributeConversionSupport_validate(node) {
  var isElement = node.type === "ElementNode";
  // is a component we convert attributes for
  return isElement && (this.transformAll || LayoutElements.indexOf(node.tag) !== -1);
};

module.exports = AttributeConversionSupport;
