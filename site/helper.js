app.LoadTemplate = function () {
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
