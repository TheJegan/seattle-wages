
var WageTable = function (WageService) {
  var self = this;
  this.service = new WageService();
  this.collection = new WageCollection();
  this.template;
  this.$el = $('body');
  this.initialize = function () {
    self.collection.on('change', self.render);

    self.loadTemplate().then(function () {
      self.render({ wage: [], metadata: [] });
      self.service.fetch().then(function (data) {
        self.collection.generate(data);
      });
    });
  }

  this.bindEvents = function () {
    this.$el.find('th').unbind('click').click(function (e) {
      self.sort();
    });

    this.$el.find('.prev').unbind('click').click(function (e) {
      self.collection.pagePrev();
    });

    this.$el.find('.next').unbind('click').click(function (e) {

      self.collection.pageNext();
    });
  }

  this.renderTableSettings = function () {

    new wageSettings({ $el: self.$el.find('table-settings'), model: self.collection });
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
    self.collection.sort("average_male_wage");
  }


  this.initialize();
}


