/*global define */
define([
  'underscore',
  'backbone',
  'models/wage'
], function (_, Backbone, Wage) {
  'use strict';

  var wagesCollection = function () {
    var self = this;
    this.pageLimit = 25;
    this.collection = [];

    this.setPageLimit = function (limit) {
      if (limit > 1)
        this.defaultPageLimit = limit;
    }

    this.fetch = function (callback) {
      $.ajax({
        url: 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6%20qEfCAki6MoNi',
        type: 'GET',
        success: function (result) {
          self.generateCollection(result.data);
          callback(null, self.page(0, self.pageLimit));
        },
        error: function (jqXHR, textStatus, errorThrown) {
          callback(errorThrown, null);
        }
      });
    }

    this.generateCollection = function (data) {
      for (var i = 0; i < data.length; i++) {
        // for (var j = 0; j < data[i].length; j++) {
        var wage = new Wage();

        //jobtitle

        self.collection.push({
          job_title: data[i][8],
          average_male_wage: data[i][9],
          average_female_wage: data[i][12],
          difference_in_wage: data[i][2]
        });
      }
    }

    this.page = function (page) {

      var right = page * this.pageLimit;
      var left = right - this.pageLimit;

      for (var i = left; i < right; i++){

      }
    }
  }

  return new wagesCollection();
});
