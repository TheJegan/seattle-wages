
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

  this.bindEvents = function () {
    this.$el.find('th').unbind('click').click(function (e) {
      // console.log('click');
      self.sort();
    });
  }

  this.renderTableSettings = function () {

    new wageSettings({ $el: self.$el.find('table-settings'), model: self.wages } );
  }

  this.loadTemplate = function () {
    var defer = $.Deferred();

    $.get("wages-table/wages-table.component.html", function (data, textStatus, XMLHttpRequest) {
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
      self.template({ wage: wages.tableBody, metadata: wages.tableHeader })
    );

    self.bindEvents();
    self.renderTableSettings();
  }

  this.sort = function () {
    self.wages.sort("average_male_wage");
  }

  this.initialize();
}


