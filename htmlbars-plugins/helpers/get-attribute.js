/* jshint node:true */

module.exports = function getElementAttribute(node, path) {
  var attributes = node.attributes;

  for (var i = 0, l = attributes.length; i < l; i++) {
    if (attributes[i].name === path) {
      return attributes[i];
    }
  }
  return false;
};
