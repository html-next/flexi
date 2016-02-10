/*jshint node:true*/

// TODO replace with config
var LayoutNames = [
  'mobile', //xs
  'tablet', //sm
  'desktop', //md
  'huge' // lg
];

module.exports = {
  description: 'Generate A New Layout',

  locals: function(options) {
    return {
      SnakedPackageName: snake(options.entity.name)
    };
  },

  fileMapTokens: function() {
    return {

      __path__: function(options) {
        var parts = [];
        if (!options.pod) {
          parts.push('templates');
        }
        if (options.pod && options.podPath) {
          parts.push(options.podPath);
        }
        var nameParts = options.dasherizedModuleName.split('/');
        nameParts.pop();
        nameParts.push('layouts');
        parts.push(nameParts.join('/'));
        return parts.join('/');
      },

      __name__: function(options) {
        var nameParts = options.dasherizedModuleName.split('/');
        var name = nameParts.pop();
        if (LayoutNames.indexOf(name) === -1) {
          throw new Error("Invalid Layout name '" + name +
            "'. Valid names are '" + LayoutNames.join(', ') + "'");
        }
        return name;
      }

    };
  }

};


function snake(str) {
  var first = str.substr(0, 1);
  var rest = str.substr(1);

  return first.toUpperCase() + rest;
}
