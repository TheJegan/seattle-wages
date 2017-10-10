var wagesService = function () {
  var self = this;
  this.pageLimit = 25;
  this.tableHeader = []; //was trying to do a bonus of editing the columns, but ran out of time
  this.tableBody = [];
  this.paged = [];
  this.JOB_TITLE;
  this.AVG_MALE;
  this.AVG_FEMALE;
  this.events = [];

  this.on = function (eventName, callback) {
    self.events[eventName] = callback;
  }

  this.setPageLimit = function (limit) {
    if (limit > 1) {
      self.pageLimit = parseInt(limit);
    }

    self.page(0);
  }

  this.fetch = function (page) {

    $.ajax({
      url: 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6%20qEfCAki6MoNi',
      type: 'GET',
      success: function (result) {
        self.generateCollection(result);
        self.page(0);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
      }
    });
  }
  this.generateCollection = function (result) {
    this.extractMetadata(result.meta)
    this.buildTable(result.data)
  }

  this.extractMetadata = function (metadata) {
    var columns = metadata.view.columns;
    for (var i = 0; i < columns.length; i++) {
      self.tableHeader.push({ order: i, name: columns[i].fieldName, sort: 'asc' });

      switch (columns[i].fieldName) {
        case 'jobtitle':
          self.JOB_TITLE = i;
          break;
        case 'female_avg_hrly_rate':
          self.AVG_FEMALE = i;
          break;
        case 'male_avg_hrly_rate':
          self.AVG_MALE = i;
          break;
        default: break;
      }
    }
  }

  this.buildTable = function (data) {
    for (var i = 0; i < data.length; i++) {
      // for (var j = 0; j < data[i].length; j++) {
      // var wage = new Wage();

      var jobTitle = data[i][self.JOB_TITLE];
      var avgFemale = data[i][self.AVG_FEMALE];
      var avgMale = data[i][self.AVG_MALE];
      var diff = 0;

      if (avgMale > avgFemale) {

      }

      self.tableBody.push({
        job_title: jobTitle,
        average_male_wage: parseFloat(avgMale),
        average_female_wage: parseFloat(avgFemale),
        // difference_in_wage: (diff > 0) ? "Male" : "Female"
      });

    }
  }

  this.page = function (page) {
    page++;
    // var temp = [];
    var right = page * self.pageLimit;
    var left = right - self.pageLimit;

    self.paged = [];
    for (var i = left; i < right; i++) {
      self.paged.push(self.tableBody[i]);
    }

    //trigger event
    self.trigger("change");
    // return temp;
  },

    this.trigger = function (eventName) {
      var event = self.events[eventName];
      event({
        tableHeader: self.tableHeader,
        tableBody: self.paged
      });
    }

  this.sort = function (column) {
    self.quickSort(self.paged, 0, self.paged.length - 1, column)
    self.trigger("change");
  }

  this.quickSort = function (arr, left, right, column) {
    var len = arr.length,
      pivot,
      partitionIndex;


    if (left < right) {
      pivot = right;
      partitionIndex = self.partition(arr, pivot, left, right, column);

      //sort left and right
      self.quickSort(arr, left, partitionIndex - 1);
      self.quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
  }

  this.partition = function (arr, pivot, left, right, column) {
    var pivotValue = arr[pivot],
      partitionIndex = left;

    for (var i = left; i < right; i++) {
      if (arr[i][column] < pivotValue[column]) {
        self.swap(arr, i, partitionIndex);
        partitionIndex++;
      }
    }
    self.swap(arr, right, partitionIndex);
    return partitionIndex;
  }

  this.swap = function (arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}