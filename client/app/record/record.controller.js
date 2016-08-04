'use strict';

(function() {

    class RecordController {

        constructor($http, $state, $filter, Auth, User, toastr, NgTableParams) {
            this.$http = $http;
            this.$state = $state;
            this.$filter = $filter;
            this.Auth = Auth;
            this.NgTableParams = NgTableParams;

            this.records = [];
            this.tableParams = null;

            this.toastr = toastr;
            this.record = {};
            this.users = [];
            this.stats = [];

            if (this.Auth.isAdmin()) {
                User.query().$promise.then(function(users) {
                    for (var user of users) {
                        if (user.role === 'user') {
                            this.users.push(user);
                        }
                    }
                }.bind(this));
            }

            switch ($state.current.name) {
                case 'record_new':
                    if (!this.Auth.isAdmin()) {
                        this.record = {
                            user: this.Auth.getCurrentUser()._id
                        };
                    }
                    break;
                case 'record_edit':
                    if ($state.params.record) {
                        this.record = this.$state.params.record;
                        this.record.user = this.record.user._id;
                        var d = new Date(this.record.datetime.getTime() + 3600000);
                        this.record.datetime = $filter('date')(d, 'yyyy-MM-dd HH:mm:ss', '+0000');
                    } else {
                        this.$state.go('record');
                    }
                    break;
                case 'record_stats':
                    this.$http.get('/api/records/stats')
                        .then(response => {
                            this.stats = response.data;
                        });
                    break;
            }

        }

        $onInit() {
            $('#date').datetimepicker();

            this.$http.get('/api/records')
                .then(response => {
                    this.tableParams = new this.NgTableParams({}, { dataset: response.data });
                    this.records = response.data;

                    for (var i = 0, length = this.records.length; i < length; i++) {
                        this.records[i].datetime = this.toDateTimePicker(this.records[i].datetime);
                    }
                });
        }

        addRecord(form) {
            this.submitted = true;

            if (form.$valid) {
                this.record.datetime = this.fromDateTimePicker($('#date').val());

                this.$http.post('/api/records', this.record).then(function() {
                    this.toastr.success('Added a New Record of Expense!');
                    this.$state.go('record');
                }.bind(this), function(error) {
                    console.error('Failed to add a new record.', error);
                    this.toastr.warn('Failed to Add a New Record of Expense!');
                }.bind(this));
                return false;
            }
        }

        updateRecord(form) {
            this.submitted = true;

            if (form.$valid) {
                this.record.datetime = this.fromDateTimePicker($('#date').val());

                this.$http.put('/api/records/' + this.record._id, this.record).then(function() {
                    this.toastr.success('Updated the existing record!');
                    this.$state.go('record');
                }.bind(this), function(error) {
                    console.error('Failed to update the existing record.', error);
                    this.toastr.warn('Failed to update the existing record!');
                }.bind(this));
                return false;
            }
        }

        deleteRecord(record) {
            this.$http.delete('/api/records/' + record._id).then(function() {
                this.toastr.success('Deleted the record!');
                this.records.splice(this.records.indexOf(record), 1);
                this.tableParams = new this.NgTableParams({}, { dataset: this.records });
            }.bind(this), function(error) {
                console.error('Failed to delete the record.', error);
                this.toastr.warn('Failed to delete the record!');
            }.bind(this));
        }

        showEditRecord(record) {
            this.$state.go('record_edit', { record: record });
        }

        printStats() {
            var printContents = document.getElementById('print-me').innerHTML;
            var popupWin = window.open('', '_blank', 'width=640, height=768');
            popupWin.document.open();
            popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }

        fromDateTimePicker(date) {
            var tmpDate = new Date(date);
            return new Date(tmpDate.getTime() - tmpDate.getTimezoneOffset() * 60000);
        }

        toDateTimePicker(date) {
            var tmpDate = new Date(date);
            return new Date(tmpDate.getTime() + tmpDate.getTimezoneOffset() * 60000);
        }
    }

    angular.module('expenseTrackingApp.record')
        //.controller('RecordController', RecordController);
        .component('record', {
            templateUrl: 'app/record/record.list.html',
            controller: RecordController,
            controllerAs: 'vm'
        })
        .component('recordNew', {
            templateUrl: 'app/record/record.new.html',
            controller: RecordController,
            controllerAs: 'vm'
        })
        .component('recordEdit', {
            templateUrl: 'app/record/record.edit.html',
            controller: RecordController,
            controllerAs: 'vm'
        })
        .component('recordStats', {
            templateUrl: 'app/record/record.stats.html',
            controller: RecordController,
            controllerAs: 'vm'
        });
})();
