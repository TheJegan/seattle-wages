/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    q: {
      exports: 'q'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    // handlebars.runtime
    "handlebars.runtime": {
      exports: "handlebars.runtime"
    },
    compiled_templates: {
      deps: [
        'Handlebars',
        'handlebars.runtime'
      ],
      exports: 'compiled_templates'
    },
    bootstrap: {
      deps: [
        'jquery'
      ],
      exports: 'bootstrap'
    }

  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    Handlebars: '../bower_components/handlebars/handlebars',
    "handlebars.runtime": '../bower_components/handlebars/handlebars.runtime',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    // text: '../node_modules/requirejs-text/text',
    hbs: 'lib/require-handlebars-plugin/hbs',
    compiled_templates: 'templates/compiled-templates',
    browserify: '../../node_modules/browserify',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    q: '../bower_components/q/q'
  },
  hbs: { // optional
    helpers: true,            // default: true
    templateExtension: 'hbs', // default: 'hbs'
    partialsUrl: ''           // default: ''
  }
});

require([
  'backbone',
  'app',
  'utils/ViewManager',
], function (Backbone, Workspace, vm) {
  /*jshint nonew:false*/

  vm.router = new Workspace();
  Backbone.history.start();
});
