define(['backbone','jquery', 'Handlebars', 'collections/wages'],
  function(Backbone, $, Handlebars, WagesService){

    var addVideo = Backbone.View.extend({
      el: "#body",
      template: $('#wages-table-template').html(),
      currentPage: 0,
      wages: WagesService,
      events: {
        // 'click #AddVid': 'saveVideo'
      },
      initialize: function () {
        var self = this;
        this.wages.fetch(function (err, data) {
          if (!err) {
            self.render(data);
          } else {
            alert(err);
          }

        });
      },
      render: function () {
        var template = Handlebars.compile(this.template);
        this.$el.html(
          template({ wage: this.wages.toJSON()})
        );
      },
      close: function(){
      }
    });

    return addVideo;
  });


