'use strict';

(function() {

  class MainController {

    constructor() {
    }
  }

  angular.module('expenseTrackingApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
