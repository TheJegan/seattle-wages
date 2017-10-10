
var Wages = function () {
  var self = this;
  this.wages = new wagesService();
  this.template;
  this.$el = $('body');
  this.initialize = function () {
    self.loadTemplate().then(function () {
      self.wages.fetch();
      self.wages.on('change', self.render);

    });
  }

  this.renderTableSettings = function () {

    new wageSettings({ $el: self.$el.find('table-settings'), model: self.wages } );
  }

  this.loadTemplate = function () {
    var defer = $.Deferred();

    $.get("wages/wages.component.html", function (data, textStatus, XMLHttpRequest) {
      var template = data;
      var template = Handlebars.compile(template);
      self.template = template;
      defer.resolve();
      // console.log(markup);
    });

    return defer.promise();
  }

  this.render = function (wages) {
    self.$el.html(
      self.template({ wage: wages })
    );

    self.renderTableSettings(wages);
  }

  this.initialize();
}


