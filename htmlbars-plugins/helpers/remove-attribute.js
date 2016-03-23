/* jshint node:true */

module.exports = function removeElementAttribute(node, attr) {
  var index = node.attributes.indexOf(attr);

  node.attributes.splice(index, 1);
};
