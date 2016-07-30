'use strict';

angular.module('expenseTrackingApp.user')
    .config(function($stateProvider) {
        $stateProvider.state('user', {
                url: '/user',
                templateUrl: 'app/user/user.list.html',
                controller: 'UserController',
                controllerAs: 'vm',
                authenticate: 'manager'
            })
            .state('user_new', {
                url: '/user/new',
                templateUrl: 'app/user/user.new.html',
                controller: 'UserController',
                controllerAs: 'vm',
                authenticate: 'manager'
            })
            .state('user_edit', {
                url: '/user/edit',
                params: {
                	user: null
                },
                templateUrl: 'app/user/user.edit.html',
                controller: 'UserController',
                controllerAs: 'vm',
                authenticate: 'manager'
            });
    });
