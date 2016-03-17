/*jshint node:true*/
var dcb = require('ember-cli/blueprints/component/index.js');
var makeLayoutAware = require('../../lib/blueprints/make-layout-aware');

module.exports = makeLayoutAware(dcb, 'component');
