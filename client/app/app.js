'use strict';

angular.module('expenseTrackingApp', ['expenseTrackingApp.auth', 'expenseTrackingApp.user', 'expenseTrackingApp.record',
    'expenseTrackingApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'ui.bootstrap', 'validation.match', 'ngBootbox', 'toastr', 'ngTable', 'printMe'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
