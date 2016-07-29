'use strict';

angular.module('expenseTrackingApp.auth', ['expenseTrackingApp.constants',
    'expenseTrackingApp.util', 'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
