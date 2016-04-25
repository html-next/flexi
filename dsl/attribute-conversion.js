/* jshint node:true */
/**
 An HTMLBars AST transformation that converts instances of
 layout elements to their corresponding layout-component
 */

var removeAttribute = require("./helpers/remove-attribute");
var getAttribute = require("./helpers/get-attribute");
var MIN_COLUMN_COUNT = 1;
var DSL = require('./dsl-defaults');
var assign = require('object-assign');
var chalk = require('chalk');
var debug = require('debug')('flexi');

function uniqueMergeArrays() {
  var keys = [];

  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      if (keys.indexOf(arguments[i][j]) === -1) {
        keys.push(arguments[i][j]);
      }
    }
  }

  return keys;
}

function convertAttribute(node, dsl, attribute) {
  var isComplex = typeof attribute !== String;
  var name = isComplex ? attribute.name : attribute;
  var values = isComplex ? attribute.values : [];
  var attr = getAttribute(node, name);
  var value;

  if (attr) {
    value =  attr.value.chars;

    if (!isComplex && value) {
      throw new Error("Flexi#attribute-conversion:: Attribute '" + attribute +
        "' does not expect a value, given '" + value + "'.");
    }

    if (isComplex && values.indexOf(value) === -1) {
      throw new Error("Flexi#attribute-conversion:: '" + value +
        "' is not a valid value for " + name + ".");
    }

    var className = dsl.generatePropertyClass(name, value);
    debug(chalk.grey("\t\tPushing class: ") + chalk.white(className));

    removeAttribute(node, attr);

    return className;
  }
}



function AttributeConversionSupport() {
  this.syntax = null;

  /*
    DSL Configuration Support
   */
  this.dsl = {};
  assign(this.dsl, DSL);

  this.dsl.elements = uniqueMergeArrays(this.dsl.elements, this.flexiConfig.elements || []);
  this.dsl.responders = uniqueMergeArrays(this.dsl.responders, this.flexiConfig.responders || []);
  this.dsl.attributes = uniqueMergeArrays(this.dsl.attributes, this.flexiConfig.attributes || []);
  this.dsl.breakpoints = this.flexiConfig.breakpoints;
  this.dsl.transformAll = this.flexiConfig.transformAllElementLayoutAttributes || false;

}

var proto = AttributeConversionSupport.prototype;

proto.transform = function AttributeConversionSupport_transform(ast) {
  var _plugin = this;
  var _dsl = this.dsl;
  var walker = new _plugin.syntax.Walker();
  var _seen = {
    elements: {},
    responders: {},
    breakpoints: {},
    attributes: {}
  };

  walker.visit(ast, function (node) {
    if (_plugin.validate(node)) {
      debug(chalk.cyan("\tConverting Attributes for node: ") + chalk.yellow(node.tag));
      _seen.elements[node.tag] = true;

      var classNames = [];
      var classAttr = getAttribute(node, "class");

      if (classAttr && classAttr.value.chars) {
        debug(chalk.grey("\t\tPushing Original Class String: ") + chalk.white(classAttr.value.chars));

        classNames.push(classAttr.value.chars);
      }

      /*
        Convert Attributes
      */
      _dsl.attributes.forEach(function(attr) {
        var className = convertAttribute(node, _dsl, attr);

        if (className) {
          classNames.push(className);
        }
      });

      /*
       Convert Breakpoints & Responders
       */
      _dsl.breakpoints.forEach(function(breakpoint) {
        var attr = getAttribute(node, breakpoint.prefix);

        if (attr) {
          var value = attr.value.chars.split(" ");

          value.forEach(function(v) {
            var className;

            /*
             Convert Grid Columns
             */
            var int = parseInt(v, 10);
            if (!isNaN(int)) {
              if (int >= MIN_COLUMN_COUNT && int <= _plugin.flexiConfig.columns) {
                className = _dsl.generateGridClass(breakpoint, int, _plugin.flexiConfig.columnPrefix, _plugin.flexiConfig.columns);
                debug(chalk.grey("\t\tPushing Offset Class: ") + chalk.white(className));

                classNames.push(className);
                return;
              }

              throw new Error("Flexi#attribute-conversion:: '" + int +
                "' is not a valid column value for " + breakpoint.prefix + ".");
            }

            /*
              Convert Responders
             */
            if (_dsl.responders.indexOf(v) !== -1) {
              className = _dsl.generateResponderClass(breakpoint, v);
              debug(chalk.grey("\t\tPushing Responsive Class: ") + chalk.white(className));

              classNames.push(className);
              return;
            }

            /*
              Convert Offsets
             */
            if (v.indexOf('offset-') === 0) {
              int = parseInt(v.substr(7), 10);

              if (!isNaN(int)) {
                if (int >= 0 && int < _plugin.flexiConfig.columns) {
                  className = _dsl.generateOffsetClass(breakpoint, int, _plugin.flexiConfig.columnPrefix, _plugin.flexiConfig.columns);
                  debug(chalk.grey("\t\tPushing Offset Class: ") + chalk.white(className));

                  classNames.push(className);
                  return;
                }

                throw new Error("Flexi#attribute-conversion:: '" + int +
                  "' is not a valid column offset for " + breakpoint.prefix + ".");
              }
            }

            throw new Error("Flexi#attribute-conversion:: '" + v + "' is not a valid responder value for a breakpoint.");
          });

          // clean up the node
          removeAttribute(node, attr);
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
  return isElement && (this.transformAll || this.dsl.elements.indexOf(node.tag) !== -1);
};

module.exports = AttributeConversionSupport;
