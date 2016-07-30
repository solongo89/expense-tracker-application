'use strict';

angular.module('expenseTrackingApp.record')
    .config(function($stateProvider) {
        $stateProvider.state('record', {
                url: '/record',
                template: '<record></record>',
                // templateUrl: 'app/record/record.list.html',
                // controller: 'RecordController',
                // controllerAs: 'vm',
                authenticate: 'user'
            })
            .state('record_new', {
                url: '/record/new',
                template: '<record-new></record-new>',
                // templateUrl: 'app/record/record.new.html',
                // controller: 'RecordController',
                // controllerAs: 'vm',
                authenticate: 'user'
            })
            .state('record_edit', {
                url: '/record/edit',
                params: {
                    record: null
                },
                template: '<record-edit></record-edit>',
                // templateUrl: 'app/record/record.edit.html',
                // controller: 'RecordController',
                // controllerAs: 'vm',
                authenticate: 'user'
            })
            .state('record_stats', {
                url: '/record/stats',
                params: {
                    record: null
                },
                template: '<record-stats></record-stats>',
                // templateUrl: 'app/record/record.edit.html',
                // controller: 'RecordController',
                // controllerAs: 'vm',
                authenticate: 'user'
            });
    });
