'use strict';

(function() {

  class RecordController {

    constructor($http) {
      this.$http = $http;
      this.awesomeRecords = [];
    }

    $onInit() {
      this.$http.get('/api/records')
        .then(response => {
          this.awesomeRecords = response.data;
        });
    }

    addRecord() {
      if (this.newRecord) {
        this.$http.post('/api/records', {
          name: this.newRecord
        });
        this.newRecord = '';
      }
    }

    deleteRecord(record) {
      this.$http.delete('/api/records/' + record._id);
    }
  }

  angular.module('expenseTrackingApp')
    .component('record', {
      templateUrl: 'app/record/record.html',
      controller: RecordController
    });
})();
