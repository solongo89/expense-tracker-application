'use strict';

describe('Component: recordComponent', function() {

  // load the controller's module
  beforeEach(module('expenseTrackingApp.record'));
  beforeEach(module('stateMock'));

  var scope;
  var recordComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/records')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    recordComponent = $componentController('record', {
      $http: $http,
      $scope: scope
    });
  }));

  it('should attach a list of records to the controller', function() {
    recordComponent.$onInit();
    $httpBackend.flush();
    recordComponent.awesomeRecords.length.should.equal(4);
  });
});
