var wageSettings = function (settings) {
  var self = this;
  this.$el = settings.$el;
  this.model = settings.model;
  this.template;

  this.initialize = function () {
    self.loadTemplate().then(function () {
      self.render();
    });
  }

  this.loadTemplate = function () {
    var defer = $.Deferred();

    $.get("wage-settings/wage-settings.component.html", function (data, textStatus, XMLHttpRequest) {
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
      self.template()
    );
  }

  this.initialize();
}

