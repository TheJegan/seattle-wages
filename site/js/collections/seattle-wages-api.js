/*global define */
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
    'use strict';

    var wagesCollection = Backbone.Collection.extend({
        url: 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6%20qEfCAki6MoNi',
        // model: videoModel
    });

    return new wagesCollection();
  });
