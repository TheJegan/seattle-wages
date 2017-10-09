/*global define*/
define([
	'jquery',
	'backbone',
  'utils/ViewManager',
  'views/wages',
], function ($, Backbone, ViewManager, WagesView) {
	'use strict';

	var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
	    	'home': 'home'
	    },
	    home: function(){
        ViewManager.renderView(WagesView);
	    }
	});

	return AppRouter;
});
