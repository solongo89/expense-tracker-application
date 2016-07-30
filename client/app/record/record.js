'use strict';

angular.module('expenseTrackingApp')
  .config(function($stateProvider) {
    $stateProvider.state('record', {
      url: '/record',
      template: '<record></record>'
    });
  });
