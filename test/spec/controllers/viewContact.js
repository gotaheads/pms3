'use strict';

describe('Controller: ViewContactCtrl', function () {

  // load the controller's module
  beforeEach(module('pms3App'));

  var ViewContactCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewContactCtrl = $controller('ViewContactCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
