var wagesService = function () {
  var self = this;
  this.events = [];
  this.fetch = function (page) {
    var defer = $.Deferred();
    $.ajax({
      url: 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6%20qEfCAki6MoNi',
      type: 'GET',
      success: function (result) {
        // self.generateCollection(result);
        // self.page(0);
        defer.resolve(result);;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
      }
    });

    return defer.promise();
  }
}