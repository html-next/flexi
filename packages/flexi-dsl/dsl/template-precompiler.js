'use strict';
const DSL = require('./dsl-defaults');

const MIN_COLUMN_COUNT = 1;
const OFFSET_STR = 'offset-';

function capFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isResponsiveGrid(elementNode) {
  if (elementNode.tag === 'grid') {
    const { attributes } = elementNode;

    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].name === 'responsive') {
        return true;
      }
    }
  }

  return false;
}

function isFlexiLayoutComponent(node) {
  return (
    node.type === 'ElementNode' &&
    (node.tag === 'container' || isResponsiveGrid(node))
  );
}

function isElementWeConvertAttributesFor({ dsl }, node) {
  return (
    node.type === 'ElementNode' &&
    (dsl.transformAll || dsl.elements.has(node.tag))
  );
}

function _convertGridColumns({ dsl }, breakpointPrefix, columns) {
  if (columns >= MIN_COLUMN_COUNT && columns <= dsl.columns) {
    return dsl.generateGridClass(
      breakpointPrefix,
      columns,
      dsl.columnPrefix,
      dsl.columns
    );
  }

  throw new Error(
    `Flexi#attribute-conversion:: '${columns}'` +
      ` is not a valid column value for ${breakpointPrefix}.`
  );
}

function _convertOffsetColumns({ dsl }, breakpointPrefix, value) {
  const offset = Number.parseInt(value.substr(OFFSET_STR.length), 10);

  if (!Number.isNaN(offset) && offset >= 0 && offset < dsl.columns) {
    return dsl.generateOffsetClass(
      breakpointPrefix,
      offset,
      dsl.columnPrefix,
      dsl.columns
    );
  }

  throw new Error(
    `Flexi#attribute-conversion:: '${offset}'` +
      ` is not a valid column offset for ${breakpointPrefix}.`
  );
}

function _convertAttribute({ dsl }, attributeNode) {
  if (attributeNode.value.chars) {
    throw new Error(
      'Flexi#attribute-conversion:: ' +
        ` Attribute '${attributeNode.name}' does not expect a value,` +
        ` given '${attributeNode.value.chars}'.`
    );
  }

  return dsl.generateAttributeClass(attributeNode.name, null);
}

function _convertComplexAttribute({ dsl, utils }, attributeNode) {
  const validValues = utils.complexAttributeToValidValues[attributeNode.name];
  const attributeValue = attributeNode.value.chars;

  if (!validValues.includes(attributeValue)) {
    throw new Error(
      `Flexi#attribute-conversion:: '${attributeValue}'` +
        ` is not a valid value for ${attributeNode.name}.`
    );
  }

  return dsl.generateAttributeClass(attributeNode.name, attributeValue);
}

function _convertBreakpointAttribute({ dsl, utils }, breakpointAttribute) {
  const classNames = [];
  const breakpointPrefix = breakpointAttribute.name;

  breakpointAttribute.value.chars.split(' ').forEach((responderAttribute) => {
    // Convert column number values
    const columns = Number.parseInt(responderAttribute, 10);
    if (!Number.isNaN(columns)) {
      classNames.push(
        utils._convertGridColumns({ dsl, utils }, breakpointPrefix, columns)
      );

      return;
    }

    // Convert responder values
    const splitAttribute = responderAttribute.split('=');
    const responderConverter = utils.responderConverters[splitAttribute[0]];
    if (responderConverter) {
      classNames.push(
        responderConverter.call(
          this,
          { dsl, utils },
          breakpointPrefix,
          splitAttribute[0],
          splitAttribute[1]
        )
      );

      return;
    }

    // Convert offset values
    if (responderAttribute.startsWith(OFFSET_STR)) {
      classNames.push(
        utils._convertOffsetColumns(
          { dsl, utils },
          breakpointPrefix,
          responderAttribute
        )
      );

      return;
    }

    throw new Error(
      `Flexi#attribute-conversion:: '${responderAttribute}' is not a valid breakpoint attribute.`
    );
  });

  return classNames;
}

function _convertResponder(
  { dsl },
  breakpointPrefix,
  responder,
  responderValue
) {
  if (responderValue) {
    throw new Error(
      'Flexi#attribute-conversion:: ' +
        `Attribute '${responder}' does not expect a value, given '${responderValue}'.`
    );
  }

  return dsl.generateResponderClass(breakpointPrefix, responder, null);
}

function _convertComplexResponder(
  { dsl, utils },
  breakpointPrefix,
  responder,
  responderValue
) {
  const validValues = utils.complexResponderToValidValues[responder];

  if (!validValues.includes(responderValue)) {
    throw new Error(
      `Flexi#attribute-conversion:: '${responderValue}'` +
        ` is not a valid value for ${responder}.`
    );
  }

  return dsl.generateResponderClass(
    breakpointPrefix,
    responder,
    responderValue
  );
}

function setupConfig(config) {
  const dsl = Object.assign({}, DSL, config);

  dsl.attributes = new Set(dsl.attributes || []);
  dsl.elements = new Set(dsl.elements || []);
  dsl.responders = new Set(dsl.responders || []);

  const utils = {};
  utils.attributeConverters = {};
  utils.complexAttributeToValidValues = {};
  utils.responderConverters = {};
  utils.complexResponderToValidValues = {};
  utils._convertGridColumns = _convertGridColumns;
  utils._convertOffsetColumns = _convertOffsetColumns;

  dsl.attributes.forEach((attribute) => {
    switch (typeof attribute) {
      case 'object':
        utils.attributeConverters[attribute.name] = _convertComplexAttribute;
        utils.complexAttributeToValidValues[attribute.name] = attribute.values;

        return;
      case 'string':
        utils.attributeConverters[attribute] = _convertAttribute;

        return;
      default:
        throw new Error(
          `Flexi#attribute-conversion:: Invalid attribute: ${attribute}.` +
            ` Expected string or object, given ${typeof attribute}`
        );
    }
  });

  dsl.breakpoints.forEach((breakpoint) => {
    utils.attributeConverters[breakpoint.prefix] = _convertBreakpointAttribute;
  });

  dsl.responders.forEach((responder) => {
    switch (typeof responder) {
      case 'object':
        utils.responderConverters[responder.name] = _convertComplexResponder;
        utils.complexResponderToValidValues[responder.name] = responder.values;

        return;
      case 'string':
        utils.responderConverters[responder] = _convertResponder;

        return;
      default:
        throw new Error(
          `Flexi#attribute-conversion:: Invalid responder: ${responder}.` +
            ` Expected string or object, given ${typeof responder}`
        );
    }
  });

  return { dsl, utils };
}

function processAttribute(
  { dsl, utils },
  elementNode,
  attributeNode,
  classNames
) {
  if (attributeNode.name === 'class') {
    return attributeNode;
  }

  // Return early if we don't have an attribute converter for this attribute
  if (
    !Object.prototype.hasOwnProperty.call(
      utils.attributeConverters,
      attributeNode.name
    )
  ) {
    return;
  }

  const generatedClasses = utils.attributeConverters[attributeNode.name].call(
    utils,
    { dsl, utils },
    attributeNode
  );

  if (typeof generatedClasses === 'string') {
    classNames.push(generatedClasses);
  } else if (Array.isArray(generatedClasses)) {
    classNames.push(...generatedClasses);
  }

  // Remove the custom attribute from the node
  elementNode.attributes.splice(
    elementNode.attributes.indexOf(attributeNode),
    1
  );
}

function updateClassNode(builder, elementNode, classNode, classNames) {
  // Return early if no classes were generated for the element
  if (classNames.length === 0) {
    return;
  }

  if (!classNode) {
    const value = classNames.join(' ');
    const classAttr = builder.attr('class', builder.text(value));
    elementNode.attributes.push(classAttr);

    return;
  }

  // If the AttrNode for "class" contains a MustacheStatement, `{{somethingDynamic}}`,
  // it will be a ConcatStatement node. In such a case, add a TextNode with our
  // classes to the list of Nodes to be concatenated.
  if (classNode.value.type === 'ConcatStatement') {
    classNode.value.parts.push(builder.text(` ${classNames.join(' ')}`));
  } else {
    // classNode.value.chars = `${classNode.value.chars} ${classNames.join(' ')}`;
  }
}

module.exports = function (env, options) {
  const converter = setupConfig(options);
  return {
    name: 'flexi-design-framework',
    visitor: {
      ElementNode(node) {
        if (isElementWeConvertAttributesFor(converter, node)) {
          // Maintain a list of all class names that will be applied to the element
          const classNames = [];
          let classNode = null;

          // Iterate over the element's attributes backwards so we can remove attributes while iterating
          for (let i = node.attributes.length - 1; i >= 0; i--) {
            const maybeClassNode = processAttribute(
              converter,
              node,
              node.attributes[i],
              classNames
            );
            if (maybeClassNode) {
              classNode = maybeClassNode;
            }
          }

          updateClassNode(env.syntax.builders, node, classNode, classNames);
        }

        if (isFlexiLayoutComponent(node)) {
          node.tag = `Flexi${capFirstLetter(node.tag)}`;
          return;
        }
      },
    },
  };
};
