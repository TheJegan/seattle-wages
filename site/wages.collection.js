var WageCollection = function () {
  var self = this;
  this.pageLimit = 25;
  this.numberOfPage = 0;
  this.currPage = 0;
  this.tableHeader = []; //was trying to do a bonus of editing the columns, but ran out of time
  this.tableBody = [];
  this.filteredList = [];
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

    self.numberOfPage = self.tableBody / self.pageLimit;
    self.numberOfPage = Math.round(self.numberOfPage);
    self.currPage = 0;
    self.page(self.currPage);
  }

  this.generate = function (result) {
    self.extractMetadata(result.meta);
    self.buildTable(result.data);
    self.currPage = 0;
    self.page(self.currPage);
  }

  this.pagePrev = function () {
    if (self.currPage == 0) return;

    self.currPage--;
    self.page(self.currPage);
  }

  this.pageNext = function () {
    self.currPage++;
    self.page(self.currPage);
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
      var jobTitle = data[i][self.JOB_TITLE];
      var avgFemale = data[i][self.AVG_FEMALE];
      var avgMale = data[i][self.AVG_MALE];
      var diff = avgMale - avgFemale;

      self.tableBody.push({
        job_title: jobTitle,
        average_male_wage: parseFloat(avgMale),
        average_female_wage: parseFloat(avgFemale),
        difference_in_wage: diff
      });

    }
  }

  //assuming sort full list
  this.filterByMenMakeMore = function () {
    self.filteredList = [];

    self.filteredList = self.tableBody.filter(function (wage) {
      if (wage.difference_in_wage) {
        if (wage.difference_in_wage > 0) {
          return wage;
        }
      }
    });

    self.trigger("change");
  }

  this.filterByWomenMakeMore = function () {
    self.filteredList = [];

    self.filteredList = self.tableBody.filter(function (wage) {
      if (wage.difference_in_wage) {
        if (wage.difference_in_wage < 0) {
          return wage;
        }
      }
    });

    self.trigger("change");
  }

  this.filterByMinimumDiff = function (diff) {
    // self.filteredList = [];
    diff = parseFloat(diff);
    var test;

    self.filteredList = test = self.filteredList.filter(function (wage) {
      if (wage.difference_in_wage) {
        if (Math.abs(wage.difference_in_wage) > diff) {
          return wage;
        }
      }
    });

    self.trigger("change");
  }

  this.page = function (page) {
    page++;
    // var temp = [];
    var right = page * self.pageLimit;
    var left = right - self.pageLimit;

    self.filteredList = [];
    for (var i = left; i < right; i++) {
      self.filteredList.push(self.tableBody[i]);
    }

    //trigger event
    self.trigger("change");
    // return temp;
  },

  this.trigger = function (eventName) {
    var event = self.events[eventName];
    event({
      tableHeader: self.tableHeader,
      tableBody: self.filteredList
    });
  }

  this.sort = function (column) {

    //or use arrray.sort

    self.quickSort(self.filteredList, 0, self.filteredList.length - 1, column)
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