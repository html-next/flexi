'use strict';

/**
 * @public
 *
 * htmlbars-ast-plugin that gets registered from index.js.
 *
 * ComponentConversionSupport.transform() gets called automatically at build time,
 * converting layout elements to their corresponding layout components.
 **/
class ComponentConversionSupport {
  /**
   * @public
   *
   * An HTMLBars AST transformation that converts instances of
   * layout elements to their corresponding layout-component.
   *
   * Walk through every node in the AST, transforming layout element nodes
   * to layout components by swapping the element node with a component node.
   * To see how the AST looks in Glimmer: http://astexplorer.net/
   **/
  transform(ast) {
    // Since this is an htmlbars-ast-plugin (as defined in index.js),
    // it inherits a syntax property from tildeio/htmlbars:
    // https://github.com/tildeio/htmlbars/blob/master/packages/htmlbars-syntax/lib/parser.js#L17
    let walker = new this.syntax.Walker();

    walker.visit(ast, elementNode => {
      if (!this._isFlexiLayoutComponent(elementNode)) {
        return;
      }

      // Build a component node so we can swap it with the element node
      let componentNode =
        this.syntax.builders.block(`flexi-${elementNode.tag}`,
                                   null,
                                   this._makeHash(elementNode.attributes, elementNode.loc.start.line),
                                   this.syntax.builders.program(elementNode.children),
                                   null,
                                   this._adjustLocation(elementNode.loc));

      // Swap the element node with our component node
      this._swapNodes(elementNode, componentNode);
    });

    return ast;
  }

  _isFlexiLayoutComponent(node) {
    return node.type === 'ElementNode'
      && (node.tag === 'container' || this._isResponsiveGrid(node));
  }

  _isResponsiveGrid(elementNode) {
    if (elementNode.tag === 'grid') {
      let attributes = elementNode.attributes;

      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].name === 'responsive') {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * @private
   *
   * Converts key-value pairs in the original element into the form used in components.
   **/
  _makeHash(attrs, declareLine) {
    if (!attrs || !attrs.length) {
      return null;
    }

    attrs.forEach(attr => {
      attr.type = 'HashPair';
      attr.key = attr.name;

      switch (attr.value.type) {
        case 'TextNode':
          attr.value.original = attr.value.chars;
          attr.value.type = 'StringLiteral';
          attr.value.value = attr.value.chars;
          break;
        case 'MustacheStatement':
          attr.value = attr.value.path;
          break;
        case 'ConcatStatement':
          throw new Error("Can't convert flexi layout components that have an attribute " +
            `with a {{}} statement inside a String value. Attribute name: ${attr.name}`);
        default:
          throw new Error("Don't know how to convert flexi layout components with " +
            `attribute values of type ${attr.value.type}. Please report an issue to flexi.`);
      }

      let attrLocationNode = attr.value.loc;

      if (attrLocationNode) {
        if (attrLocationNode.start && attrLocationNode.start.line === declareLine) {
          attrLocationNode.start.column += 6;
        }

        if (attrLocationNode.end && attrLocationNode.end.line === declareLine) {
          attrLocationNode.end.column += 6;
        }
      }
    });

    return { type: 'Hash', pairs: attrs };
  }

  _adjustLocation(loc) {
    loc.end.column += 6;

    return loc;
  }

  // Swap the nodes, which are just javascript objects, by replacing all
  // the element's original properties with our component node's properties.
  _swapNodes(elementNode, componentNode) {
    // Delete all the original keys on the element node
    Object.keys(elementNode).forEach(key => {
      delete elementNode[key];
    });

    // Add the keys from our component node to the element node
    Object.keys(componentNode).forEach(key => {
      elementNode[key] = componentNode[key];
    });
  }
}

module.exports = ComponentConversionSupport;
