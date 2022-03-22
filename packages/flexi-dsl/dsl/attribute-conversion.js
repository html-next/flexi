'use strict';

/**
 * @public
 *
 * An HTMLBars AST transformation that converts
 * flexi attributes into CSS classes
 **/
const DSL = require('./dsl-defaults');
const MIN_COLUMN_COUNT = 1;

/**
 * @public
 *
 * htmlbars-ast-plugin that gets registered from index.js.
 *
 * AttributeConversionSupport.transform() gets called automatically at build time,
 * converting flexi attributes on flexi elements to CSS classes.
 **/
class AttributeConversionSupport {
  constructor() {
    this.dsl = {};
    Object.assign(this.dsl, DSL);

    // this.flexiConfig is added to the prototype from index.js
    this.dsl.generateAttributeClass =
      this.flexiConfig.generateAttributeClass || this.dsl.generateAttributeClass;
    this.dsl.generateGridClass =
      this.flexiConfig.generateGridClass || this.dsl.generateGridClass;
    this.dsl.generateOffsetClass =
      this.flexiConfig.generateOffsetClass || this.dsl.generateOffsetClass;
    this.dsl.generateResponderClass =
      this.flexiConfig.generateResponderClass || this.dsl.generateResponderClass;

    this.dsl.attributes = new Set(this.dsl.attributes.concat(this.flexiConfig.attributes || []));
    this.dsl.breakpoints = this.flexiConfig.breakpoints;
    this.dsl.elements = new Set(this.dsl.elements.concat(this.flexiConfig.elements || []));
    this.dsl.responders = new Set(this.dsl.responders.concat(this.flexiConfig.responders || []));
    this.dsl.transformAll = this.flexiConfig.transformAllElementLayoutAttributes || false;

    this.attributeConverters = {};
    this.complexAttributeToValidValues = {};
    this.responderConverters = {};
    this.complexResponderToValidValues = {};

    this.dsl.attributes.forEach(attribute => {
      switch (typeof(attribute)) {
        case 'object':
          this.attributeConverters[attribute.name] = this._convertComplexAttribute;
          this.complexAttributeToValidValues[attribute.name] = attribute.values;

          return;
        case 'string':
          this.attributeConverters[attribute] = this._convertAttribute;

          return;
        default:
          throw new Error(`Flexi#attribute-conversion:: Invalid attribute: ${attribute}.`
            + ` Expected string or object, given ${typeof(attribute)}`);

      }
    });

    this.dsl.breakpoints.forEach(breakpoint => {
      this.attributeConverters[breakpoint.prefix] = this._convertBreakpointAttribute;
    });

    this.dsl.responders.forEach(responder => {
      switch (typeof(responder)) {
        case 'object':
          this.responderConverters[responder.name] = this._convertComplexResponder;
          this.complexResponderToValidValues[responder.name] = responder.values;

          return;
        case 'string':
          this.responderConverters[responder] = this._convertResponder;

          return;
        default:
          throw new Error(`Flexi#attribute-conversion:: Invalid responder: ${responder}.`
            + ` Expected string or object, given ${typeof(responder)}`);

      }
    });
  }

  _toHashSet(primary, secondary) {
    let set = {};

    primary.forEach(key => {
      set[key] = true;
    });

    secondary.forEach(key => {
      set[key] = true;
    });

    return set;
  }

  _convertAttribute(attributeNode) {
    if (attributeNode.value.chars) {
      throw new Error('Flexi#attribute-conversion:: '
        + ` Attribute '${attributeNode.name}' does not expect a value,`
        + ` given '${attributeNode.value.chars}'.`);
    }

    return this.dsl.generateAttributeClass(attributeNode.name, null);
  }

  _convertComplexAttribute(attributeNode) {
    let validValues = this.complexAttributeToValidValues[attributeNode.name];
    let attributeValue = attributeNode.value.chars;

    if (validValues.indexOf(attributeValue) === -1) {
      throw new Error(`Flexi#attribute-conversion:: '${attributeValue}'`
        + ` is not a valid value for ${attributeNode.name}.`);
    }

    return this.dsl.generateAttributeClass(attributeNode.name, attributeValue);
  }

  _convertBreakpointAttribute(breakpointAttribute) {
    let classNames = [];
    let breakpointPrefix = breakpointAttribute.name;

    breakpointAttribute.value.chars.split(' ').forEach(responderAttribute => {
      // Convert column number values
      let columns = parseInt(responderAttribute, 10);
      if (!isNaN(columns)) {
        classNames.push(this._convertGridColumns(breakpointPrefix, columns));

        return;
      }

      // Convert responder values
      let splitAttribute = responderAttribute.split('=');
      let responderConverter = this.responderConverters[splitAttribute[0]];
      if (responderConverter) {
        classNames.push(responderConverter.call(this,
                                                breakpointPrefix,
                                                splitAttribute[0],
                                                splitAttribute[1]));

        return;
      }

      // Convert offset values
      if (responderAttribute.startsWith('offset-')) {
        classNames.push(this._convertOffsetColumns(breakpointPrefix, responderAttribute));

        return;
      }

      throw new Error(
        `Flexi#attribute-conversion:: '${responderAttribute}' is not a valid breakpoint attribute.`
      );
    });

    return classNames;
  }

  _convertGridColumns(breakpointPrefix, columns) {
    if (columns >= MIN_COLUMN_COUNT && columns <= this.flexiConfig.columns) {
      return this.dsl.generateGridClass(breakpointPrefix,
                                        columns,
                                        this.flexiConfig.columnPrefix,
                                        this.flexiConfig.columns);
    }

    throw new Error(`Flexi#attribute-conversion:: '${columns}'`
      + ` is not a valid column value for ${breakpointPrefix}.`);
  }

  _convertOffsetColumns(breakpointPrefix, value) {
    let offset = parseInt(value.substr(7), 10);

    if (!isNaN(offset) && offset >= 0 && offset < this.flexiConfig.columns) {
      return this.dsl.generateOffsetClass(breakpointPrefix,
                                          offset,
                                          this.flexiConfig.columnPrefix,
                                          this.flexiConfig.columns);
    }

    throw new Error(`Flexi#attribute-conversion:: '${offset}'`
      + ` is not a valid column offset for ${breakpointPrefix}.`);
  }

  _convertResponder(breakpointPrefix, responder, responderValue) {
    if (responderValue) {
      throw new Error('Flexi#attribute-conversion:: '
        + `Attribute '${responder}' does not expect a value, given '${responderValue}'.`);
    }

    return this.dsl.generateResponderClass(breakpointPrefix, responder, null);
  }

  _convertComplexResponder(breakpointPrefix, responder, responderValue) {
    let validValues = this.complexResponderToValidValues[responder];

    if (validValues.indexOf(responderValue) === -1) {
      throw new Error(`Flexi#attribute-conversion:: '${responderValue}'`
        + ` is not a valid value for ${responder}.`);
    }

    return this.dsl.generateResponderClass(breakpointPrefix, responder, responderValue);
  }

  /**
   * @public
   *
   * Walk through every node in the AST, transforming attributes to CSS
   * classes by altering the "class" AttrNode of relevant elements.
   * To see how the AST looks in Glimmer: http://astexplorer.net/
   **/
  transform(ast) {
    // Since this is an htmlbars-ast-plugin (as defined in index.js),
    // it inherits a syntax property from tildeio/htmlbars:
    // https://github.com/tildeio/htmlbars/blob/master/packages/htmlbars-syntax/lib/parser.js#L17
    let _walker = new this.syntax.Walker();

    _walker.visit(ast, elementNode => {
      if (!this._isElementWeConvertAttributesFor(elementNode)) {
        return;
      }

      // Maintain a list of all class names that will be applied to the element
      let classNames = [];
      let classNode = null;

      // Iterate over the element's attributes backwards so we can remove attributes while iterating
      for (let i = elementNode.attributes.length - 1; i >= 0; i--) {
        let attributeNode = elementNode.attributes[i];

        if (attributeNode.name === 'class') {
          classNode = attributeNode;

          continue;
        }

        // Return early if we don't have an attribute converter for this attribute
        if (!this.attributeConverters.hasOwnProperty(attributeNode.name)) {
          continue;
        }

        let generatedClasses =
          this.attributeConverters[attributeNode.name].call(this, attributeNode);

        if (typeof(generatedClasses) === 'string') {
          classNames.push(generatedClasses);
        } else {
          classNames = classNames.concat(generatedClasses);
        }

        // Remove the custom attribute from the node
        elementNode.attributes.splice(elementNode.attributes.indexOf(attributeNode), 1);
      }

      // Return early if no classes were generated for the element
      if (!classNames.length) {
        return;
      }

      if (!classNode) {
        elementNode.attributes.push({
          type: 'AttrNode',
          name: 'class',
          value: { type: 'TextNode', chars: classNames.join(' ') }
        });

        return;
      }

      // If the AttrNode for "class" contains a MustacheStatement, `{{somethingDynamic}}`,
      // it will be a ConcatStatement node. In such a case, add a TextNode with our
      // classes to the list of Nodes to be concatenated.
      if (classNode.value.type === 'ConcatStatement') {
        classNode.value.parts.push({ type: 'TextNode', chars: ` ${classNames.join(' ')}` });
      } else {
        classNode.value.chars = `${classNode.value.chars} ${classNames.join(' ')}`;
      }
    });

    return ast;
  }

  _isElementWeConvertAttributesFor(node) {
    return node.type === 'ElementNode'
      && (this.dsl.transformAll || this.dsl.elements.has(node.tag));
  }
}

module.exports = AttributeConversionSupport;
