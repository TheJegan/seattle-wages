/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var wageModel = Backbone.Model.extend({
        defaults: {
          '_id': '',
          'job_title': '',
          'average_male_wage': '',
          'average_female_wage': '',
          'difference_in_wage': '',
        },
        idAttribute: '_id',
        initialize: function() {

        }
    });

    return wageModel;
  });


    /*
    ● Job Title
    ● Average female wage
    ● Average male wage
    ● Difference in wage (with an indication of which gender makes more)
  */