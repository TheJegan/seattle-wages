var wageSettings = function (settings) {
  var self = this;
  this.$el = settings.$el;
  this.model = settings.model;
  this.template;

  this.initialize = function () {
    self.loadTemplate().then(function () {
      self.render();
      self.bindEvent();
    });
  }

  this.bindEvent = function () {
    self.$el.find('.btn-set-page').unbind('click').click(function (e) {
      var pageLimit = self.$el.find('.pageSize').val();
      self.model.setPageLimit(pageLimit);
    });

    self.$el.find('.btn-set-min').unbind('click').click(function (e) {
      var diff = self.$el.find('.filterByMinDiff').val();
      self.model.filterByMinimumDiff(diff);
    });

    self.$el.find('.filterByMen').unbind('click').click(function () {
        //uncheck others
        self.filterByMensWages();
    });

    self.$el.find('.filterByWomen').unbind('click').click(function () {
        //uncheck others
        self.filterByWomensWages();
    });
  }

  this.loadTemplate = function () {
    var defer = $.Deferred();

    $.get("wages-table-settings/wages-table-settings.component.html", function (data, textStatus, XMLHttpRequest) {
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

  this.filterByMensWages = function () {
    self.model.filterByMenMakeMore();
  }

  this.filterByWomensWages = function () {
    self.model.filterByWomenMakeMore();
  }

  this.filterByMinDiff = function (diff) {
    self.model.filterByMinimumDiff(diff)
  }

  this.initialize();
}

