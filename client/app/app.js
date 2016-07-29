'use strict';

angular.module('expenseTrackingApp', ['expenseTrackingApp.auth', 'expenseTrackingApp.admin',
    'expenseTrackingApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
